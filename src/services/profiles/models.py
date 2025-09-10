import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Profile(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )
    account_id = models.ForeignKey(
        User,
        related_name="profile",
        on_delete=models.SET_NULL,
        null=True,
    )

    email = models.EmailField(max_length=255, blank=True, null=True)
    profile_image = models.CharField(max_length=256, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_by =  models.ForeignKey(
        User,
        related_name="deleted_profiles",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    objects = models.Manager()

