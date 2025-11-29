from datetime import timedelta, datetime

from django.db.models.functions import TruncDate, TruncWeek, TruncMonth, TruncQuarter, TruncYear
from django.db.models import Sum
from django.utils.dateparse import parse_date

from apps.milk.models import Milk

TRUNC_MAP = {
    "day": TruncDate("created_at"),
    "week": TruncWeek("created_at"),
    "month": TruncMonth("created_at"),
    "quarter": TruncQuarter("created_at"),
    "year": TruncYear("created_at"),
}

def milk_trend_data(
    start_date: str,
    end_date: str,
    interval: str = "day",
    producer_uuid: str | None = None,
):
    if interval not in TRUNC_MAP:
        raise ValueError("Invalid interval")

    # Set a week date range from today as default
    default_end_date = datetime.now().date()
    default_start_date = default_end_date - timedelta(days=7)

    start_date_parsed = parse_date(start_date) if start_date else default_start_date
    end_date_parsed = parse_date(end_date) if end_date else default_end_date

    if not start_date_parsed:
        raise ValueError("Start date missing")
    if not end_date_parsed:
        raise ValueError("End date missing")

    # Validate start and end date
    if start_date_parsed > end_date_parsed:
        raise ValueError("Start cannot be bigger than end date")

    qs = Milk.objects.filter(
        created_at__date__gte=start_date_parsed, created_at__date__lte=end_date_parsed
    )

    # Optional producer filtering
    if producer_uuid and producer_uuid.lower() != "all":
        qs = qs.filter(producer__uuid=producer_uuid)

    qs = qs.annotate(period=TRUNC_MAP[interval])

    data = (
        qs.values("period")
        .annotate(total_liters=Sum("volume_liters"))
        .order_by("period")
    )

    # Convert period to ISO string for frontend
    trend_data = [
        {"date": row["period"].isoformat(), "total_liters": row["total_liters"] or 0}
        for row in data
    ]

    return trend_data
