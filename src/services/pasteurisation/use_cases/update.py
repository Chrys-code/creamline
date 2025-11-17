import logging
from typing import Dict

from pasteurisation.models import Pasteurisation


logger = logging.getLogger(__name__)


def _update(
    instance: Pasteurisation
) -> Pasteurisation:
    updated_pasteurisation = instance.save()

    return updated_pasteurisation


def update_pasteurisation(
    instance: Pasteurisation,
    validated_data: Dict,
) -> Pasteurisation:
    for field, value in validated_data.items():
        setattr(instance, field, value)

    updated_pasteurisation = _update(instance=instance)

    logger.info(
        "pasteurisation-updated",
        extra={
            "uuid": updated_pasteurisation.uuid,
        },
    )

    return updated_pasteurisation
