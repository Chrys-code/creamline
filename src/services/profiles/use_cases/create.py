import logging
from typing import TypedDict, TYPE_CHECKING

from profiles.models import Profile

if TYPE_CHECKING:
    from users.models import CustomUser


logger = logging.getLogger(__name__)


class CreateProfileData(TypedDict):
    profile_image: str | None
    email: str
    first_name: str
    last_name: str


def _create(
    profile_image: str,
    email: str,
    first_name: str,
    last_name: str,
    user: "CustomUser",
    created_by: "CustomUser"
) -> Profile:
    profile = Profile.objects.create(
        email=email,
        profile_image=profile_image,
        first_name=first_name,
        last_name=last_name,
        user=user,
        created_by=created_by
    )

    return profile


def create_profile(
    validated_data: CreateProfileData,
    user: "CustomUser",
    created_by: "CustomUser"
) -> Profile:
    created_profile = _create(
        email=validated_data["email"],
        profile_image=validated_data.get("profile_image", None),
        first_name=validated_data["first_name"],
        last_name=validated_data["last_name"],
        user=user,
        created_by=created_by
    )

    logger.info(
        "profile-created",
        extra={
            "uuid": created_profile.uuid,
        },
    )

    return created_profile
