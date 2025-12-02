import logging

from django.contrib.auth import get_user_model

from apps.users.features.profiles.use_cases.update import update_profile
from apps.users.features.user_groups.use_cases.set_groups import set_user_groups
from apps.users.models import CustomUser

User = get_user_model()

logger = logging.getLogger(__name__)


def _update(instance: "CustomUser") -> "CustomUser":
    instance.save()
    return instance


def _update_user(instance: "CustomUser", email: str | None) -> "CustomUser":
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


def update_user_workflow(
    user: "CustomUser",
    email: str | None,
    first_name: str | None,
    last_name: str | None,
    group_ids: list[str],
):
    updated_user = _update_user(instance=user, email=email)
    update_profile(
        instance=user.profile, email=email, first_name=first_name, last_name=last_name
    )
    set_user_groups(user=updated_user, group_ids=group_ids)

    return user
