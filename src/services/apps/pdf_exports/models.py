import uuid
from django.db import models


class PdfExport(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)

    type = models.CharField(max_length=50)
    file_path = models.FileField(upload_to="pdf_exports/")
    params = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()

    def __str__(self):
        return f"{self.type} ({self.created_at})"
