import uuid

from django.conf import settings
from django.db import models


class ProductDefinition(models.Model):
    class ProductDefinitionTypes(models.TextChoices):
        CREAM = "CREAM", "cream"
        WHOLEMILK = "WHOLE MILK", "whole milk"
        SKIMMEDMILK = "SKIMMED MILK", "skimmed milk"

    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )
    name = models.CharField(max_length=255)
    type = models.CharField(choices=ProductDefinitionTypes.choices, max_length=255)

    # List every value measured on the merged fields of all products
    # Populate DB with types and their target values

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_product_definitions",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="deleted_product_definitions",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True,
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.name} - {self.uuid}"


class CreamProductDefinition(ProductDefinition):
    class Meta:
        proxy = True
        verbose_name = "Cream product definition"
        verbose_name_plural = "Cream product definitions"

    objects = models.Manager()


class SkimmedMilkProductDefinition(ProductDefinition):
    class Meta:
        proxy = True
        verbose_name = "Skimmed milk product definition"
        verbose_name_plural = "Skimmed milk product definitions"

    objects = models.Manager()


class WholeMilkMilkProductDefinition(ProductDefinition):
    class Meta:
        proxy = True
        verbose_name = "While milk product definition"
        verbose_name_plural = "While milk product definitions"

    objects = models.Manager()
