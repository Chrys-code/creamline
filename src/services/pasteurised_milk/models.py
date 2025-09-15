import uuid

from django.core.validators import MinValueValidator
from django.contrib.auth import get_user_model
from django.db import models

from storages.models import Storage

User = get_user_model()

class PasteurisedMilk(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    pasteur_id = models.CharField(max_length=255)
    pasteur_name = models.CharField(max_length=255)

    # product_reference_id = models.CharField(choices=ProductReferences.ProductReferenceTypes.choices)
    # product_reference_name = models.CharField(choices=ProductReferences.ProductReferenceTypes.choices)
    # product_reference_type = models.CharField(choices=ProductReferences.ProductReferenceTypes.choices)

    source_storage_id = models.CharField(max_length=255)
    source_storage_name = models.CharField(max_length=255)
    source_storage_type = models.CharField(choices=Storage.StorageType.choices, max_length=255)

    target_storage_id = models.CharField(max_length=255)
    target_storage_name = models.CharField(max_length=255)
    target_storage_type = models.CharField(choices=Storage.StorageType.choices, max_length=255)

    volume_kg = models.FloatField(validators=[MinValueValidator(1.00)])
    volume_liters = models.FloatField(validators=[MinValueValidator(1.00)])
    temperature = models.FloatField(validators=[MinValueValidator(-273.15)])

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User,
        related_name="created_pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by =  models.ForeignKey(
        User,
        related_name="deleted_pasteurised_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )

    objects = models.Manager()

