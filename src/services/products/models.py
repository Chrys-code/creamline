import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class ProductDefinitions(models.Model):
    class ProductTypes(models.TextChoices):
        INTERMEDIATE = "INTERMEDIATE", "intermediate"
        FINAL = "FINAL", "final"

    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )
    name = models.CharField(max_length=255)
    type = models.CharField(choices=ProductTypes.choices, max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User,
        related_name="created_product_definitions",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by =  models.ForeignKey(
        User,
        related_name="deleted_product_definitions",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.name} - {self.uuid}"


class IntermediateProduct(Product):
    class Meta:
        proxy = True
        verbose_name = "Intermediate product"
        verbose_name_plural = "Intermediates products"

    objects = models.Manager()  # default manager


class FinalProduct(Product):
    class Meta:
        proxy = True
        verbose_name = "Final product"
        verbose_name_plural = "Final products"

    objects = models.Manager()  # default manager
