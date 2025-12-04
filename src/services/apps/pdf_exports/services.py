import os
from django.conf import settings

from django.template.loader import render_to_string
from weasyprint import HTML


class PdfFileWriter:
    BASE_PATH = "pdf_exports/"

    def path_for(self, filename: str) -> str:
        return os.path.join(settings.MEDIA_ROOT, self.BASE_PATH, filename)

    def ensure_dir(self):
        os.makedirs(os.path.join(settings.MEDIA_ROOT, self.BASE_PATH), exist_ok=True)


class WeasyPrintPdfGenerator:
    def generate(self, output_path: str, template_name: str, context: dict):
        html_string = render_to_string(template_name, context)
        HTML(string=html_string).write_pdf(target=output_path)
        return output_path
