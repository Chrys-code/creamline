from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.pasteurisation.interfaces import PasteurisationTimeSeriesReader
from apps.pasteurisation.use_cases.analytics.pasteurisation_interval_comparison import (
    pasteurisation_interval_comparison_data,
)
from apps.pasteurisation.use_cases.analytics.pasteurisation_segmented_by_pasteur import (
    get_pasteurisation_segmented_by_pasteur,
)
from apps.pasteurisation.use_cases.analytics.validate_pasteurisation_analytics import (
    InvalidDateError,
    PasteurisationAnalyticsException,
)
from common.has_group import HasGroup


class PasteurisationSummaryAnalyticsView(views.APIView):
    """
    Used for interval comparison breakdown.
    Compares Pasteurisation volume in intervals to previous intervals.
    E.g Today compared to yesterday or this week compared to previous week.
    Returns SUM of liters pasteurised and its percentage increase compared to previous interval.
    """

    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def get(self, _request):
        data = pasteurisation_interval_comparison_data()
        return Response(data)


class PasteurisationTimeSeriesAnalyticsView(views.APIView):
    """
    Used for Time Series (line) charts.
    Returns the Pasteurisations in selected range aggregated to selected intervals.
    """

    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def get(self, request):
        reader = PasteurisationTimeSeriesReader()

        params = {
            "start_date": request.query_params.get("start_date"),
            "end_date": request.query_params.get("end_date"),
            "interval": request.query_params.get("interval", "day"),
            "pasteur_uuid": request.query_params.get("pasteur_uuid"),
        }

        try:
            time_series_data = reader.get(params)
        except PasteurisationAnalyticsException as e:
            if isinstance(e, InvalidDateError):
                return Response(
                    {"detail": e.detail}, status=status.HTTP_400_BAD_REQUEST
                )

        except ValueError:
            return Response(
                {"detail": "Invalid interval"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(time_series_data)


class PasteurisationSegmentedByPasteur(views.APIView):
    """
    Used for Pie charts.
    Returns the volume of liters pasteurised segmented by pasteur in selected interval preceeding current date.
    """

    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def get(self, request):
        interval = request.query_params.get("interval", "day")

        try:
            segmented_data = get_pasteurisation_segmented_by_pasteur(interval=interval)
        except ValueError:
            return Response(
                {"detail": "Invalid interval"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(segmented_data)
