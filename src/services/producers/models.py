import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Producer(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=False
    )

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=100)
    contact_email = models.EmailField(max_length=256, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by =  models.ForeignKey(
        User,
        related_name="created_producers",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    deleted_by =  models.ForeignKey(
        User,
        related_name="deleted_producers",
        on_delete=models.SET_NULL,
        editable=False,
        null=True,
        blank=True
    )

    objects = models.Manager()

