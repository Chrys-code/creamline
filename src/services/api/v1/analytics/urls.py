from django.urls import path

from api.v1.analytics.milk.views import (
    MilkSummaryAnalyticsView,
    MilkTimeSeriesAnalyticsView,
    MilkSegmentedByProducer,
)
from api.v1.analytics.pasteurisation.views import (
    PasteurisationSegmentedByPasteur,
    PasteurisationSummaryAnalyticsView,
    PasteurisationTimeSeriesAnalyticsView
)

milkRoutes = [
    path("milk/summary/", MilkSummaryAnalyticsView.as_view()),
    path("milk/trend/", MilkTimeSeriesAnalyticsView.as_view()),
    path("milk/by-producers/", MilkSegmentedByProducer.as_view()),
]

pasteurisationRoutes = [
    path("pasteurisation/summary/", PasteurisationSummaryAnalyticsView.as_view()),
    path(
        "pasteurisation/time-series/", PasteurisationTimeSeriesAnalyticsView.as_view()
    ),
    path("pasteurisation/by-pasteurs/", PasteurisationSegmentedByPasteur.as_view()),
]

urlpatterns = [*milkRoutes, *pasteurisationRoutes]
