from datetime import timedelta

from django.db.models import Sum
from django.utils.timezone import now

from rest_framework.response import Response
from rest_framework import status

from apps.milk.models import Milk


def get_milk_segmented_by_producer(interval: str = "day"):
    """
    Returns the total liters of milk collected from each producer in
    selected interval.

    :param interval: time period back from current day
    :type interval: str, "day" | "week" | "month" or "year"
    """

    today = now()

    if interval == "day":
        start = today.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(
            days=1
        )
    elif interval == "week":
        start = today.replace(
            day=today.day, hour=0, minute=0, second=0, microsecond=0
        ) - timedelta(days=today.weekday())
    elif interval == "month":
        start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    elif interval == "year":
        start = today.replace(
            year=today.year, month=1, day=1, hour=0, minute=0, second=0, microsecond=0
        )
    else:
        return Response(
            {"error": "Invalid interval. Use day, week, month, or year."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Query milk grouped by producer
    results = (
        Milk.objects.filter(created_at__range=(start, today))
        .values("producer__name")
        .annotate(total=Sum("volume_liters"))
        .order_by("producer__name")
    )

    # Format for Recharts
    chart_data = [
        {"name": r["producer__name"], "value": r["total"] or 0} for r in results
    ]

    return chart_data
