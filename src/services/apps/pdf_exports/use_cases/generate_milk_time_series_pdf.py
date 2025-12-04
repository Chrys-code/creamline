from datetime import datetime

from django.template.loader import render_to_string
from django.http import HttpResponse

from weasyprint import HTML
from apps.analytics.interfaces import MilkTimeSeriesReader


class GenerateMilkTimeSeriesPdf:

    def execute(self, params: dict) -> HttpResponse:
        # 1. Fetch analytics data
        reader = MilkTimeSeriesReader()
        data = reader.get(params)

        # 2. Render HTML template
        html_string = render_to_string(
            "../templates/milk_time_series.html",
            {"data": data, "params": params},
        )

        # 3. Generate PDF in memory
        pdf_file = HTML(string=html_string).write_pdf()

        # 4. Prepare response for download
        filename = f"milk_time_series_{datetime.utcnow().timestamp()}.pdf"
        response = HttpResponse(pdf_file, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response
