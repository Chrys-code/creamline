import logging
from typing import TYPE_CHECKING

from django.utils import timezone

from milk.models import Milk

if TYPE_CHECKING:
    from users.models import CustomUser


logger = logging.getLogger(__name__)


def _delete(instance: Milk):
    instance.save()


def delete_profile(instance: Milk, deleted_by: "CustomUser"):
    instance.deleted_at=timezone.now()
    instance.deleted_by=deleted_by

    _delete(instance=instance)

    logger.info(
        "milk-deleted",
        extra={
            "uuid": instance.uuid,
            "deleted_by": deleted_by.uuid
        },
    )
