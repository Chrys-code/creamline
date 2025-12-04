from django.urls import path

from api.v1.analytics.milk.views import (
    MilkSummaryAnalyticsView,
    MilkTimeSeriesAnalyticsView,
    MilkSegmentedByProducer,
)

milkRoutes = [
    path("milk/summary/", MilkSummaryAnalyticsView.as_view()),
    path("milk/trend/", MilkTimeSeriesAnalyticsView.as_view()),
    path("milk/by-producers/", MilkSegmentedByProducer.as_view()),
]

urlpatterns = [*milkRoutes]
