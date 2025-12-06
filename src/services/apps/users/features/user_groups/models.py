import uuid

from django.contrib.auth.models import Group
from django.db import models
from django.utils.translation import gettext_lazy as _


class GroupMetadata(models.Model):
    """
    Extend built-in django group with metadata
    Adding code_name for continuity and display_name for translations
    """

    class GroupTypes(models.TextChoices):
        MANAGER = "MANAGER", _("manager")
        MILK_COLLECTOR = "MILK COLLECTOR", _("milk collector")
        PASTEURISER = "PASTEURISER", _("pasteuriser")

    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=False
    )

    group = models.OneToOneField(
        Group, on_delete=models.CASCADE, related_name="metadata"
    )
    code_name = models.CharField(max_length=50, unique=True)
    display_name = models.CharField(max_length=150, blank=True)

    objects = models.Manager()

    def __str__(self):
        return self.display_name or self.group.name
