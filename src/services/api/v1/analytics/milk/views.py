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
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")
        interval = request.query_params.get("interval", "day")
        producer_uuid = request.query_params.get("producer_uuid")

        try:
            trend_data = milk_trend_data(
                start_date=start_date,
                end_date=end_date,
                interval=interval,
                producer_uuid=producer_uuid,
            )
        except ValueError:
            return Response({"error": "Invalid interval"}, status=400)
        return Response(trend_data)
