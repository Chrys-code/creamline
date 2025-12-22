import logging
from typing import TYPE_CHECKING

from django.utils import timezone

from apps.storages.models import Storage

if TYPE_CHECKING:
    from apps.users.models import CustomUser


logger = logging.getLogger(__name__)


def _delete(instance: Storage):
    instance.save()


def delete_storage(instance: Storage, deleted_by: "CustomUser"):
    instance.deleted_at = timezone.now()
    instance.deleted_by = deleted_by

    _delete(instance=instance)

    logger.info(
        "storage-deleted",
        extra={"uuid": instance.uuid, "deleted_by": deleted_by.uuid},
    )
