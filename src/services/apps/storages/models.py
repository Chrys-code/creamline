import uuid

from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.db import models


class Storage(models.Model):
    class StorageTypes(models.TextChoices):
        SILO = "SILO", _("silo")
        TUB = "TUB", _("tub")
        CONTAINER = "CONTAINER", _("container")

    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=StorageTypes.choices)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_storages",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="deleted_storages",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True,
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.name} - {self.uuid}"
