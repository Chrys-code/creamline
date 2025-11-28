from django.urls import path

from api.v1.analytics.milk.views import MilkSummaryAnalyticsView, MilkTrendAnalyticsView

app_name = "analytics"

milkRoutes = [
    path("milk/summary/", MilkSummaryAnalyticsView.as_view()),
    path("milk/trend/", MilkTrendAnalyticsView.as_view()),
]

urlpatterns = [*milkRoutes]
