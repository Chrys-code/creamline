import logging
from typing import TYPE_CHECKING

from apps.users.features.profiles.models import Profile

if TYPE_CHECKING:
    from apps.users.models import CustomUser


logger = logging.getLogger(__name__)


def _create(
    profile_image: str | None,
    email: str,
    first_name: str,
    last_name: str,
    user: "CustomUser",
) -> Profile:
    profile = Profile.objects.create(
        email=email,
        profile_image=profile_image,
        first_name=first_name,
        last_name=last_name,
        user=user,
    )

    return profile


def create_profile(
    profile_image: str | None,
    email: str,
    first_name: str,
    last_name: str,
    user: "CustomUser",
) -> Profile:
    created_profile = _create(
        email=email,
        profile_image=profile_image,
        first_name=first_name,
        last_name=last_name,
        user=user,
    )

    logger.info(
        "profile-created",
        extra={
            "uuid": created_profile.uuid,
        },
    )

    return created_profile
