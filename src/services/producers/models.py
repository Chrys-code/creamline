import uuid

from django.conf import settings
from django.db import models


class Producer(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=100)
    contact_email = models.EmailField(max_length=256, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by =  models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_producers",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by =  models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="deleted_producers",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.name} - {self.uuid}"

