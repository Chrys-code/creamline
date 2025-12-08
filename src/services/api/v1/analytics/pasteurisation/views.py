from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.milk.interfaces import MilkTimeSeriesReader
from apps.pasteurisation.use_cases.analytics.pasteurisation_interval_comparison import (
    pasteurisation_interval_comparison_data
)


class PasteurisationSummaryAnalyticsView(views.APIView):
    """
    Used for interval comparison breakdown.
    Compares Pasteurisation volume in intervals to previous intervals. 
    E.g Today compared to yesterday or this week compared to previous week.
    Returns SUM of liters pasteurised and its percentage increase compared to previous interval.
    """

    permission_classes = [IsAuthenticated]

    def get(self, _request):
        data = pasteurisation_interval_comparison_data()
        return Response(data)


class PasteurisationTimeSeriesAnalyticsView(views.APIView):
    """
    Used for Time Series (line) charts.
    Returns the Pasteurisations in selected range aggregated to selected intervals.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        reader = MilkTimeSeriesReader()

        params = {
            "start_date": request.query_params.get("start_date"),
            "end_date": request.query_params.get("end_date"),
            "interval": request.query_params.get("interval", "day"),
        }

        try:
            time_series_data = reader.get(params)
        except ValueError:
            return Response({"detail": "Invalid interval"}, status=400)
        return Response(time_series_data)
