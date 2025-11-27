import logging
from typing import TYPE_CHECKING

from apps.product_definitions.models import ProductDefinition


if TYPE_CHECKING:
    from apps.users.models import CustomUser

logger = logging.getLogger(__name__)


def _create(
    name: str,
    created_by: "CustomUser",
) -> ProductDefinition:
    product_definition = ProductDefinition.objects.create(
        name=name,
        created_by=created_by,
    )

    return product_definition


def create_product_definition(name: str, created_by: "CustomUser") -> ProductDefinition:
    created_product_definition = _create(
        name=name,
        created_by=created_by,
    )

    logger.info(
        "product_definition-created",
        extra={"uuid": created_product_definition.uuid, "created_by": created_by.uuid},
    )

    return created_product_definition
