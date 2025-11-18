import logging

from django.contrib.auth import get_user_model
from apps.users.models import CustomUser

User = get_user_model()

logger = logging.getLogger(__name__)


def _update(instance: "CustomUser") -> "CustomUser":
    instance.save()
    return instance


def update_user(instance: "CustomUser", email: str | None) -> "CustomUser":
    if email is not None:
        instance.email = email

    updated_user = _update(instance=instance)

    logger.info(
        "user-updated",
        extra={
            "uuid": updated_user.uuid,
        },
    )

    return updated_user
