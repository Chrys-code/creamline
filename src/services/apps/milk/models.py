import uuid

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from apps.storages.models import Storage
from apps.producers.models import Producer


class Milk(models.Model):
    class Meta:
        """
        Meta indexes for analytics performance
        """
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["producer", "created_at"])
        ]

    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    producer = models.ForeignKey(
        Producer,
        related_name="produced_milk",
        on_delete=models.PROTECT,
        editable=False,
        null=False,
    )
    producer_uuid = models.CharField(max_length=255, editable=False)
    producer_name = models.CharField(max_length=255, editable=False)

    volume_kg = models.FloatField(validators=[MinValueValidator(1.00)])
    volume_liters = models.FloatField(validators=[MinValueValidator(1.00)])

    storage = models.ForeignKey(
        Storage,
        related_name="stored_milk",
        on_delete=models.PROTECT,
        editable=False,
        null=False,
    )
    storage_uuid = models.CharField(max_length=255, editable=False)
    storage_name = models.CharField(max_length=255, editable=False)

    acid_content = models.FloatField(validators=[MinValueValidator(0.00)], blank=True)
    aflatoxin = models.BooleanField(blank=True)
    inhibitory_residue = models.BooleanField(blank=True)
    temperature = models.FloatField(validators=[MinValueValidator(-273.15)], blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="deleted_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True,
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.producer.name} - {self.uuid}"
