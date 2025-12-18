from datetime import timedelta, datetime
from typing import Optional

from django.db.models.functions import (
    TruncDate,
    TruncWeek,
    TruncMonth,
    TruncQuarter,
    TruncYear,
)
from django.db.models import Sum
from django.utils.dateparse import parse_date

from apps.pasteurisation.models import Pasteurisation
from apps.pasteurisation.use_cases.analytics.validation import (
    validate_pasteurisation_time_series_input,
)


TRUNC_MAP = {
    "day": TruncDate("created_at"),
    "week": TruncWeek("created_at"),
    "month": TruncMonth("created_at"),
    "quarter": TruncQuarter("created_at"),
    "year": TruncYear("created_at"),
}


def pasteurisation_time_series_analytics(
    start_date: Optional[str],
    end_date: Optional[str],
    interval: str = "day",
    pasteur_uuid: str | None = None,
):
    if interval not in TRUNC_MAP:
        raise ValueError("Invalid interval")

    start_date_parsed = parse_date(start_date) if start_date else None
    end_date_parsed = parse_date(end_date) if end_date else None

    # Set a week date range from today as default
    default_end_date = datetime.now().date()
    default_start_date = default_end_date - timedelta(days=7)

    start_date_final = start_date_parsed or default_start_date
    end_date_final = end_date_parsed or default_end_date

    validate_pasteurisation_time_series_input(
        start_date=start_date_final, end_date=end_date_final
    )

    # Create indexable dates + Milk Model Meta support for performance
    start_dt = datetime.combine(start_date_final, datetime.min.time())
    end_dt = datetime.combine(end_date_final, datetime.max.time())

    # Validate start and end date
    if start_dt > end_dt:
        raise ValueError("Start cannot be bigger than end date")

    qs = Pasteurisation.objects.filter(created_at__gte=start_dt, created_at__lte=end_dt)

    # Optional producer filtering
    if pasteur_uuid and pasteur_uuid.lower() != "all":
        qs = qs.filter(pasteur__uuid=pasteur_uuid)

    data = (
        qs.annotate(period=TRUNC_MAP[interval])
        .values("period")
        .annotate(total_liters=Sum("volume_liters"))
        .order_by("period")
    )

    # Convert period to ISO string for frontend
    return [
        {
            "date": row["period"].isoformat(),
            "total_liters": round(row["total_liters"] or 0, 2),
        }
        for row in data
    ]
