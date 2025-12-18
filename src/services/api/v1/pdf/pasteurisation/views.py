from rest_framework import views
from rest_framework.permissions import IsAuthenticated

from api.v1.pdf.throttles import PDFGenerationRateThrottle
from apps.pdf_exports.use_cases.generate_pasteurisation_time_series_pdf import (
    GeneratePasteurisationTimeSeriesPdf,
)
from common.has_group import HasGroup


class GeneratePasteurisationPDFView(views.APIView):
    throttle_classes = [PDFGenerationRateThrottle]
    permission_classes = [IsAuthenticated, HasGroup.Manager]

    def post(self, request):
        uc = GeneratePasteurisationTimeSeriesPdf()
        pdf_response = uc.execute(request.data)
        return pdf_response
