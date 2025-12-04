from datetime import datetime

from django.template.loader import render_to_string
from django.http import HttpResponse

from weasyprint import HTML
from apps.analytics.interfaces import MilkTimeSeriesReader
from apps.milk.models import Milk


class GenerateMilkTimeSeriesPdf:

    def execute(self, params: dict) -> HttpResponse:
        # 1. Fetch analytics data
        reader = MilkTimeSeriesReader()
        summary_data = reader.get(params)

        qs = Milk.objects.filter(
            created_at__date__gte=params["start_date"],
            created_at__date__lte=params["end_date"],
        ).select_related("storage")

        if params["producer_uuid"] and params["producer_uuid"].lower() != "all":
            qs = qs.filter(producer__uuid=params["producer_uuid"])

        instances = list(
            qs.values(
                "created_at",
                "producer__name",
                "volume_liters",
                "storage__name",
            ).order_by("created_at")
        )

        # 2. Render HTML template
        html_string = render_to_string(
            "../templates/milk_time_series.html",
            {
                "data": {
                    "summary": summary_data,
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
