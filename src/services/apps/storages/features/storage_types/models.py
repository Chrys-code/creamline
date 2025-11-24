import uuid

from django.db import models


class StorageType(models.Model):
    """
    Translatable StorageType model for Storage types
    """

    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    code_name = models.CharField(max_length=50, unique=True)
    display_name = models.CharField(max_length=150, blank=True)

    objects = models.Manager()

    def __str__(self):
        return self.display_name or self.code_name
