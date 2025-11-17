from django.contrib.auth.models import Group
from django.db import models

class GroupMetadata(models.Model):
    """
    Extend built-in django group with metadata
    Adding code_name for continuity and display_name for translations
    """
    group = models.OneToOneField(Group, on_delete=models.CASCADE, related_name="metadata")
    code_name = models.CharField(max_length=50, unique=True)
    display_name = models.CharField(max_length=150, blank=True)

    objects = models.Manager()

    def __str__(self):
        return self.display_name or self.group.name
