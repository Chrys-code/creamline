import logging
from typing import Dict

from profiles.models import Profile


logger = logging.getLogger(__name__)


def _update(
    instance: Profile
) -> Profile:
    instance.save()
    return instance

def update_profile(
        instance: Profile,
        validated_data: Dict
) -> Profile:
    for field, value in validated_data.items():
        setattr(instance, field, value)

    updated_profile = _update(instance=instance)

    logger.info(
        "profile-updated",
        extra={
            "uuid": updated_profile.uuid,
        },
    )

    return updated_profile
