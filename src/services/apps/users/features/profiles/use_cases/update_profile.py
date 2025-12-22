import logging

from apps.users.features.profiles.models import Profile


logger = logging.getLogger(__name__)


def _update(instance: Profile) -> Profile:
    instance.save()
    return instance


def update_profile(
    instance: Profile,
    profile_image: str | None,
    email: str | None,
    first_name: str | None,
    last_name: str | None,
) -> Profile:
    if email is not None:
        instance.email = email
    if first_name is not None:
        instance.first_name = first_name
    if last_name is not None:
        instance.last_name = last_name
    if profile_image is not None:
        instance.profile_image = profile_image

    updated_profile = _update(instance=instance)

    logger.info(
        "profile-updated",
        extra={
            "uuid": updated_profile.uuid,
        },
    )

    return updated_profile
