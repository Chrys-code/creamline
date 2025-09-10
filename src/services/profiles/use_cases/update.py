import logging
from typing import Dict

from profiles.models import Profile


logger = logging.getLogger(__name__)


def _update(
    profile: Profile
) -> Profile:
    profile.save()
    return profile

def update_profile(
        profile: Profile,
        validated_data: Dict
) -> Profile:
    for field, value in validated_data.item():
        setattr(profile, field, value)

    updated_profile = _update(profile=profile)

    logger.info(
        "profile-updated",
        extra={
            "uuid": updated_profile.uuid,
        },
    )

    return updated_profile
