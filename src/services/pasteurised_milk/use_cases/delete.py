import logging
from typing import TYPE_CHECKING

from django.utils import timezone

from pasteurised_milk.models import PasteurisedMilk

if TYPE_CHECKING:
    from users.models import CustomUser


logger = logging.getLogger(__name__)


def _delete(instance: PasteurisedMilk):
    instance.save()


def delete_pasteurised_milk(instance: PasteurisedMilk, deleted_by: "CustomUser"):
    instance.deleted_at=timezone.now()
    instance.deleted_by=deleted_by

    _delete(instance=instance)

    logger.info(
        "pasteurised_milk-deleted",
        extra={
            "uuid": instance.uuid,
            "deleted_by": deleted_by.uuid
        },
    )
