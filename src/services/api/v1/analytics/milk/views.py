from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.milk.use_cases.analytics.milk_summary import milk_summary_data
from apps.milk.use_cases.analytics.milk_trend import milk_trend_data


class MilkSummaryAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, _request):
        data = milk_summary_data()
        return Response(data)

class MilkTrendAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        interval = request.query_params.get("interval", "day")
        range = request.query_params.get("range", 30)
        producer_uuid = request.query_params.get("producer_uuid")

        try:
            trend_data = milk_trend_data(
                interval=interval, range=int(range), producer_uuid=producer_uuid
            )
        except ValueError:
            return Response({"error": "Invalid interval"}, status=400)
        return Response(trend_data)
