import logging
from typing import TypedDict

from profiles.models import Profile

logger = logging.getLogger(__name__)


class CreateProfileData(TypedDict):
    profile_image: str | None
    first_name: str
    last_name: str


def _create(
    profile_image: str,
    first_name: str,
    last_name: str
):
    profile = Profile.objects.create(
        profile_image = profile_image,
        first_name = first_name,
        last_name = last_name
    )

    return profile


def create_profile(
    validated_data: CreateProfileData
):
    created_profile = _create(
        profile_image=validated_data.get("profile_image", None),
        first_name=validated_data["first_name"],
        last_name=validated_data["last_name"],
    )

    logger.info(
        "profile-created",
        extra={
            "uuid": created_profile.uuid,
        },
    )

    return created_profile
