import uuid

from django.conf import settings
from django.db import models


class Storage(models.Model):
    class StorageType(models.TextChoices):
        SILO = "SILO", "silo"
        TUB = "TUB", "tub"
        CONTAINER = "CONTAINER", "container"

    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    name = models.CharField(max_length=255)
    type = models.CharField(choices=StorageType.choices, max_length=100)

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


class SiloStorage(Storage):
    class Meta:
        proxy = True
        verbose_name = "Silo"
        verbose_name_plural = "Silos"

    objects = models.Manager()  # default manager


class ContainerStorage(Storage):
    class Meta:
        proxy = True
        verbose_name = "Container"
        verbose_name_plural = "Containers"

    objects = models.Manager()  # default manager


class TubStorage(Storage):
    class Meta:
        proxy = True
        verbose_name = "Tub"
        verbose_name_plural = "Tubs"

    objects = models.Manager()  # default manager
