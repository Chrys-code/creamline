import logging
from typing import Dict

from milk.models import Milk


logger = logging.getLogger(__name__)


def _update(
    instance: Milk
) -> Milk:
    updated_milk = instance.save()

    return updated_milk


def update_milk(
    instance: Milk,
    validated_data: Dict,
) -> Milk:
    for field, value in validated_data.items():
        setattr(instance, field, value)

    updated_milk = _update(instance=instance)

    logger.info(
        "milk-updated",
        extra={
            "uuid": updated_milk.uuid,
        },
    )

    return updated_milk
