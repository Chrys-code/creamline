from datetime import datetime

from django.template.loader import render_to_string
from django.http import HttpResponse

from weasyprint import HTML

from apps.pasteurisation.interfaces import PasteurisationTimeSeriesReader
from apps.pasteurisation.models import Pasteurisation


class GeneratePasteurisationTimeSeriesPdf:

    def execute(self, params: dict) -> HttpResponse:
        # 1. Fetch analytics data
        reader = PasteurisationTimeSeriesReader()
        time_series_data = reader.get(params)

        qs = Pasteurisation.objects.filter(
            created_at__date__gte=params["start_date"],
            created_at__date__lte=params["end_date"],
        ).select_related("source_storage", "target_storage")

        if params["pasteur_uuid"] and params["pasteur_uuid"].lower() != "all":
            qs = qs.filter(prasteur__uuid=params["pasteur_uuid"])

        instances = list(
            qs.values(
                "pasteur__name",
                "source_storage__name",
                "target_storage__name",
                "volume_liters",
                "temperature",
                "start_date",
                "end_date",
                "created_at",
            ).order_by("created_at")
        )

        # 2. Render HTML template
        html_string = render_to_string(
            "../templates/pasteurisation_time_series.html",
            {
                "data": {
                    "time_series_data": time_series_data,
                    "instances": instances,
                },
                "params": params,
            },
        )

        # 3. Generate PDF in memory
        pdf_file = HTML(string=html_string).write_pdf()

        # 4. Prepare response for download
        filename = f"milk_time_series_{datetime.utcnow().timestamp()}.pdf"
        response = HttpResponse(pdf_file, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response
