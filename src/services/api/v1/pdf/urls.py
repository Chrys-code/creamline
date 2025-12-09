from django.urls import path

from api.v1.pdf.milk.views import GenerateMilkPDFView
from api.v1.pdf.pasteurisation.views import GeneratePasteurisationPDFView


milkRoutes = [
    path("milk/generate-milk-time-series-pdf", GenerateMilkPDFView.as_view()),
    path(
        "pasteurisation/generate-pasteurisation-time-series-pdf",
        GeneratePasteurisationPDFView.as_view(),
    ),
]

urlpatterns = [*milkRoutes]
