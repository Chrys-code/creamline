import logging
from typing import TYPE_CHECKING

from django.utils import timezone

from apps.pasteurisation.models import Pasteurisation

if TYPE_CHECKING:
    from apps.users.models import CustomUser


logger = logging.getLogger(__name__)


def _delete(instance: Pasteurisation):
    instance.save()


def delete_pasteurisation(instance: Pasteurisation, deleted_by: "CustomUser"):
    instance.deleted_at = timezone.now()
    instance.deleted_by = deleted_by

    _delete(instance=instance)

    logger.info(
        "pasteurisation-deleted",
        extra={"uuid": instance.uuid, "deleted_by": deleted_by.uuid},
    )
