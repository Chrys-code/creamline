from datetime import timedelta, datetime

from django.db.models.functions import TruncDate, TruncWeek, TruncMonth, TruncQuarter, TruncYear
from django.db.models import Sum

from apps.milk.models import Milk


def milk_trend_data(interval: str = "day", days: int = 30):
    today = datetime.now().date()
    start_date = today - timedelta(days=days)

    qs = Milk.objects.filter(created_at__date__gte=start_date)

    # Choose truncation function
    if interval == "day":
        qs = qs.annotate(period=TruncDate("created_at"))
    elif interval == "week":
        qs = qs.annotate(period=TruncWeek("created_at"))
    elif interval == "month":
        qs = qs.annotate(period=TruncMonth("created_at"))
    elif interval == "quarter":
        qs = qs.annotate(period=TruncQuarter("created_at"))
    elif interval == "year":
        qs = qs.annotate(period=TruncYear("created_at"))
    else:
        raise ValueError("Invalid interval. Must be 'day', 'week', 'month', 'quarter' or 'year'.")

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
