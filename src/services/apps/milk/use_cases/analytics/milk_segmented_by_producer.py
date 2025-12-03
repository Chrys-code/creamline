from datetime import datetime, timedelta
from django.db.models import Sum

from rest_framework.response import Response
from rest_framework import status

from apps.milk.models import Milk


def get_milk_segmented_by_producer(interval: str = "day"):

    now = datetime.now()

    if interval == "day":
        start = now - timedelta(days=1)
    elif interval == "week":
        start = now - timedelta(weeks=1)
    elif interval == "month":
        start = now - timedelta(days=30)
    elif interval == "year":
        start = now - timedelta(days=365)
    else:
        return Response(
            {"error": "Invalid interval. Use day, week, month, or year."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Query milk grouped by producer
    results = (
        Milk.objects.filter(created_at__range=(start, now))
        .values("producer__name")
        .annotate(total=Sum("volume_liters"))
        .order_by("producer__name")
    )

    # Format for Recharts
    chart_data = [
        {"name": r["producer__name"], "value": r["total"] or 0} for r in results
    ]

    return chart_data
