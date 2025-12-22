import logging

from apps.product_definitions.models import ProductDefinition


logger = logging.getLogger(__name__)


def _update(instance: ProductDefinition) -> ProductDefinition:
    instance.save()

    return instance


def update_product_definition(
    instance: ProductDefinition,
    name: str,
) -> ProductDefinition:
    if name is not None:
        setattr(instance, "name", name)

    updated_product_definition = _update(instance=instance)

    logger.info(
        "product_definition-updated",
        extra={
            "uuid": updated_product_definition.uuid,
        },
    )

    return updated_product_definition
