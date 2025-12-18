from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.milk.interfaces import MilkTimeSeriesReader
from apps.milk.use_cases.analytics.milk_interval_comparison import (
    milk_interval_comparison_data,
)
from apps.milk.use_cases.analytics.milk_segmented_by_producer import (
    get_milk_segmented_by_producer,
)
from apps.milk.use_cases.analytics.validation import (
    InvalidDateError,
    MilkAnalyticsException,
)
from common.has_group import HasGroup


class GetMilkSummaryAnalyticsEndpointView(views.APIView):
    """
    Used for interval comparison breakdown.
    Compares Milk collected in intervals to previous intervals.
    E.g Today compared to yesterday or this week compared to previous week.
    Returns SUM of liters collected and its percentage increase compared to previous interval.
    """

    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def get(self, _request):
        data = milk_interval_comparison_data()
        return Response(data)


class MilkTimeSeriesAnalyticsView(views.APIView):
    """
    Used for Time Series (line) charts.
    Returns the Milk collected value (SUM) in selected range aggregated to selected intervals.
    """

    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def get(self, request):
        reader = MilkTimeSeriesReader()

        params = {
            "start_date": request.query_params.get("start_date"),
            "end_date": request.query_params.get("end_date"),
            "interval": request.query_params.get("interval", "day"),
            "producer_uuid": request.query_params.get("producer_uuid"),
        }

        try:
            time_series_data = reader.get(params)

        except MilkAnalyticsException as e:
            if isinstance(e, InvalidDateError):
                return Response(
                    {"detail": e.detail}, status=status.HTTP_400_BAD_REQUEST
                )

        except ValueError:
            return Response(
                {"detail": "Invalid interval"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(time_series_data)


class MilkSegmentedByProducer(views.APIView):
    """
    Used for Pie charts.
    Returns the Milk collected (all time) segmented by producers aggregated to selected interval.
    """

    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def get(self, request):
        interval = request.query_params.get("interval", "day")

        try:
            segmented_data = get_milk_segmented_by_producer(interval=interval)
        except ValueError:
            return Response(
                {"detail": "Invalid interval"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(segmented_data)
