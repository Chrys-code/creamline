import logging
from typing import Dict

from pasteurised_milk.models import PasteurisedMilk


logger = logging.getLogger(__name__)


def _update(
    instance: PasteurisedMilk
) -> PasteurisedMilk:
    updated_pasteurised_milk = instance.save()

    return updated_pasteurised_milk


def update_pasteurised_milk(
    instance: PasteurisedMilk,
    validated_data: Dict,
) -> PasteurisedMilk:
    for field, value in validated_data.items():
        setattr(instance, field, value)

    updated_pasteurised_milk = _update(instance=instance)

    logger.info(
        "pasteurised_milk-updated",
        extra={
            "uuid": updated_pasteurised_milk.uuid,
        },
    )

    return updated_pasteurised_milk
