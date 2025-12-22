import logging
from typing import TYPE_CHECKING

from django.utils import timezone

from apps.users.features.profiles.models import Profile


if TYPE_CHECKING:
    from apps.users.models import CustomUser


logger = logging.getLogger(__name__)


def _delete(instance: Profile):
    instance.save()


def delete_profile(instance: Profile, deleted_by: "CustomUser"):
    instance.deleted_at = timezone.now()
    instance.deleted_by = deleted_by

    _delete(instance=instance)

    logger.info(
        "profile-deleted",
        extra={"uuid": instance.uuid, "deleted_by": deleted_by.uuid},
    )
