from rest_framework import views
from rest_framework.permissions import IsAuthenticated

from apps.pdf_exports.use_cases.generate_milk_time_series_pdf import (
    GenerateMilkTimeSeriesPdf,
)
from common.has_group import HasGroup


class GenerateMilkPDFView(views.APIView):
    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def post(self, request):
        uc = GenerateMilkTimeSeriesPdf()
        pdf_response = uc.execute(request.data)
        return pdf_response
