import logging
from typing import Dict

from apps.pasteurisation.models import Pasteurisation
from apps.pasteurisation.use_cases.validation import validate_update_pasteurisation

logger = logging.getLogger(__name__)


def _update(instance: Pasteurisation) -> Pasteurisation:
    instance.save()

    return instance


def update_pasteurisation(
    instance: Pasteurisation,
    validated_data: Dict,
) -> Pasteurisation:
    for field, value in validated_data.items():
        if value is not None:
            setattr(instance, field, value)

    validate_update_pasteurisation(instance=instance, logger=logger)

    updated_pasteurisation = _update(instance=instance)

    logger.info(
        "pasteurisation-updated",
        extra={
            "uuid": updated_pasteurisation.uuid,
        },
    )

    return updated_pasteurisation
