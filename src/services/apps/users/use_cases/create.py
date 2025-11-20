import logging
from typing import cast

from django.contrib.auth import get_user_model

from apps.users.features.profiles.use_cases.create import create_profile
from apps.users.features.user_groups.use_cases.set_groups import set_user_groups
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


def _create_user(email: str, password: str) -> "CustomUser":
    created_user = _create(email=email, password=password)

    logger.info(
        "user-created",
        extra={"uuid": created_user.uuid},
    )

    return created_user



def create_user_workflow(
    email: str,
    password: str,
    profile_image: str | None,
    first_name: str,
    last_name: str,
    group_ids: list[str],
):
    user = _create_user(email=email, password=password)
    create_profile(
        profile_image=profile_image,
        email=email,
        first_name=first_name,
        last_name=last_name,
        user=user,
    )
    set_user_groups(user=user, group_ids=group_ids)

    return user
