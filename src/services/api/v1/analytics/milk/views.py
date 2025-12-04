from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.analytics.interfaces import MilkTimeSeriesReader
from apps.milk.use_cases.analytics.milk_summary import milk_summary_data
from apps.milk.use_cases.analytics.milk_segmented_by_producer import (
    get_milk_segmented_by_producer,
)


class MilkSummaryAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, _request):
        data = milk_summary_data()
        return Response(data)


class MilkTimeSeriesAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reader = MilkTimeSeriesReader()

        params = {
            "start_date":request.query_params.get("start_date"),
            "end_date":request.query_params.get("end_date"),
            "interval":request.query_params.get("interval", "day"),
            "producer_uuid":request.query_params.get("producer_uuid")
        }

        try:
            time_series_data = reader.get(params)
        except ValueError:
            return Response({"error": "Invalid interval"}, status=400)
        return Response(time_series_data)


class MilkSegmentedByProducer(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        interval = request.query_params.get("interval", "day")

        try:
            segmented_data = get_milk_segmented_by_producer(interval=interval)
        except ValueError:
            return Response({"error": "Invalid interval"}, status=400)
        return Response(segmented_data)