from datetime import datetime, timedelta
from django.db.models import Sum

from rest_framework.response import Response
from rest_framework import status

from apps.pasteurisation.models import Pasteurisation


def get_pasteurisation_segmented_by_pasteur(interval: str = "day"):
    """
    Returns the total volume of liters pasteurised in each pasteur for
    selected interval.

    :param interval: time period back from current day
    :type interval: str, "day" | "week" | "month" or "year"
    """

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

    # Query Pasteurisation grouped by pasteur
    results = (
        Pasteurisation.objects.filter(created_at__range=(start, now))
        .values("pasteur__name")
        .annotate(total=Sum("volume_liters"))
        .order_by("pasteur__name")
    )

    # Format for Recharts
    chart_data = [
        {"name": r["pasteur__name"], "value": r["total"] or 0} for r in results
    ]

    return chart_data
