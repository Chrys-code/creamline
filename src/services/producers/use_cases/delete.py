import logging
from typing import TYPE_CHECKING

from django.utils import timezone

from producers.models import Producer

if TYPE_CHECKING:
    from users.models import CustomUser


logger = logging.getLogger(__name__)


def _delete(instance: Producer):
    instance.save()


def delete_profile(instance: Producer, deleted_by: "CustomUser"):
    instance.deleted_at=timezone.now()
    instance.deleted_by=deleted_by

    _delete(instance=instance)

    logger.info(
        "producer-deleted",
        extra={
            "uuid": instance.uuid,
            "deleted_by": deleted_by.uuid
        },
    )
