import uuid

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from storages.models import Storage
from pasteurs.models import Pasteur
from product_definitions.models import ProductDefinition


class PasteurisedMilk(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    pasteur = models.ForeignKey(
        Pasteur,
        related_name="pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    pasteur_uuid = models.CharField(max_length=255, editable=False)
    pasteur_name = models.CharField(max_length=255, editable=False)

    source_storage = models.ForeignKey(
        Storage,
        related_name="originated_pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    source_storage_uuid = models.CharField(max_length=255, editable=False)
    source_storage_name = models.CharField(max_length=255, editable=False)
    source_storage_type = models.CharField(choices=Storage.StorageType.choices, max_length=100, editable=False)

    target_storage = models.ForeignKey(
        Storage,
        related_name="targeted_pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    target_storage_uuid = models.CharField(max_length=255, editable=False)
    target_storage_name = models.CharField(max_length=255, editable=False)
    target_storage_type = models.CharField(choices=Storage.StorageType.choices, max_length=100, editable=False)

    product_definition = models.ForeignKey(
        ProductDefinition,
        related_name="pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    product_definition_name = models.CharField(max_length=255, editable=False)
    product_definition_type = models.CharField(choices=ProductDefinition.ProductDefinitionTypes.choices, max_length=255, editable=False)


    volume_kg = models.FloatField(validators=[MinValueValidator(1.00)])
    volume_liters = models.FloatField(validators=[MinValueValidator(1.00)])
    temperature = models.FloatField(validators=[MinValueValidator(-273.15)])

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by =  models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="deleted_pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.pasteur_name} - {self.uuid}"


