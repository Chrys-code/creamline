from django.urls import path

from api.v1.pdf.milk.views import GenerateMilkPDFView


milkRoutes = [
    path("milk/generate-milk-time-series-pdf", GenerateMilkPDFView.as_view()),
]

urlpatterns = [*milkRoutes]
