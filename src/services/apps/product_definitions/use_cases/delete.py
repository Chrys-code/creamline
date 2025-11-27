import logging
from typing import TYPE_CHECKING

from django.utils import timezone

from apps.product_definitions.models import ProductDefinition

if TYPE_CHECKING:
    from apps.users.models import CustomUser


logger = logging.getLogger(__name__)


def _delete(instance: ProductDefinition):
    instance.save()


def delete_product_definition(instance: ProductDefinition, deleted_by: "CustomUser"):
    instance.deleted_at = timezone.now()
    instance.deleted_by = deleted_by

    _delete(instance=instance)

    logger.info(
        "product_definition-deleted",
        extra={"uuid": instance.uuid, "deleted_by": deleted_by.uuid},
    )
