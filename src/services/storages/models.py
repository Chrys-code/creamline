import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


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
        User,
        related_name="created_storages",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by =  models.ForeignKey(
        User,
        related_name="deleted_storages",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )

    objects = models.Manager()

