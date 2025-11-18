import logging
from typing import cast

from django.contrib.auth import get_user_model
from apps.users.models import CustomUser

User = get_user_model()


logger = logging.getLogger(__name__)


def _create(
    email: str,
    password: str,
) -> "CustomUser":
    user = cast(
        CustomUser,
        User(
            email=email,
            password=password,
            is_staff=False,
            is_active=True,
        ),
    )

    user.save()

    return user


def create_user(email: str, password: str) -> "CustomUser":
    created_user = _create(email=email, password=password)

    logger.info(
        "user-created",
        extra={"uuid": created_user.uuid},
    )

    return created_user
