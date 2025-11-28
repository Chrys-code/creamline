from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.milk.use_cases.analytics.milk_summary import milk_summary_data
from apps.milk.use_cases.analytics.milk_trend import milk_trend_data


class MilkSummaryAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = milk_summary_data()
        return Response(data)

class MilkTrendAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        interval = request.query_params.get("interval", "day")
        
        try:
            trend_data = milk_trend_data(interval=interval, days=30)
        except ValueError:
            return Response({"error": "Invalid interval"}, status=400)
        return Response(trend_data)