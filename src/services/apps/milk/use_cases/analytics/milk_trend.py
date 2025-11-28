from datetime import timedelta, datetime
from dateutil.relativedelta import relativedelta

from django.db.models.functions import TruncDate, TruncWeek, TruncMonth, TruncQuarter, TruncYear
from django.db.models import Sum

from apps.milk.models import Milk

INTERVAL_LIMITS = {
    "day": 90,  # max 90 days
    "week": 52,  # max 52 weeks
    "month": 24,  # max 24 months
    "quarter": 12,  # max 12 quarters (3 years)
    "year": 5,  # max 5 years
}

TRUNC_MAP = {
    "day": TruncDate("created_at"),
    "week": TruncWeek("created_at"),
    "month": TruncMonth("created_at"),
    "quarter": TruncQuarter("created_at"),
    "year": TruncYear("created_at"),
}

def _get_start_date(interval, range, today):
    # Get start date based on range
    if interval == "day":
        return today - timedelta(days=range)
    elif interval == "week":
        return today - timedelta(weeks=range)
    elif interval == "month":
        return today - relativedelta(months=range)
    elif interval == "quarter":
        return today - relativedelta(months=3 * range)
    elif interval == "year":
        return today - relativedelta(years=range)
    return today


def milk_trend_data(
    interval: str = "day",
    range: int = 30,
    producer_uuid: str | None = None,
):
    if interval not in INTERVAL_LIMITS:
        raise ValueError("Invalid interval")
    if interval not in TRUNC_MAP:
        raise ValueError("Invalid interval")

    # Enforcing range
    max_range = INTERVAL_LIMITS[interval]
    range = min(range, max_range)

    today = datetime.now().date()

    # Get start date based on range
    start_date = _get_start_date(interval=interval, range=range, today=today)

    qs = Milk.objects.filter(created_at__date__gte=start_date)

    # Optional producer filtering
    if producer_uuid:
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
