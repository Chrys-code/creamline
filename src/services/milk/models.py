import uuid

from django.core.validators import MinValueValidator
from django.contrib.auth import get_user_model
from django.db import models

from producers.models import Producer
User = get_user_model()

class Milk(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    producer = models.ForeignKey(
        Producer,
        related_name="produced_milk",
        on_delete=models.PROTECT,
        editable=False,
        null=False
    )
    volume_kg = models.FloatField(validators=[MinValueValidator(1.00)])
    volume_liters = models.FloatField(validators=[MinValueValidator(1.00)])

    acid_content = models.FloatField(validators=[MinValueValidator(0.00)])
    aflatoxin = models.BooleanField()
    inhibitory_residue = models.BooleanField()
    temperature = models.FloatField(validators=[MinValueValidator(-273.15)])

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User,
        related_name="created_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by =  models.ForeignKey(
        User,
        related_name="deleted_milk",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )

    objects = models.Manager()

