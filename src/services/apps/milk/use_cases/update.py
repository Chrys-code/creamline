import logging
from typing import Dict

from apps.milk.models import Milk
from apps.milk.use_cases.validation import validate_update_milk


logger = logging.getLogger(__name__)


def _update(instance: Milk) -> Milk:
    instance.save()

    return instance


def update_milk(
    instance: Milk,
    validated_data: Dict,
) -> Milk:
    if validated_data["producer"] is not None:
        setattr(instance, "producer", validated_data["producer"])

    if validated_data["storage"] is not None:
        setattr(instance, "storage", validated_data["storage"])

    if validated_data["volume_kg"] is not None:
        setattr(instance, "volume_kg", validated_data["volume_kg"])

    if validated_data["volume_liters"] is not None:
        setattr(instance, "volume_liters", validated_data["volume_liters"])

    if validated_data["acid_content"] is not None:
        setattr(instance, "acid_content", validated_data["acid_content"])

    if validated_data["aflatoxin"] is not None:
        setattr(instance, "aflatoxin", validated_data["aflatoxin"])

    if validated_data["inhibitory_residue"] is not None:
        setattr(instance, "inhibitory_residue", validated_data["inhibitory_residue"])

    if validated_data["temperature"] is not None:
        setattr(instance, "temperature", validated_data["temperature"])

    validate_update_milk(instance=instance, logger=logger)

    updated_milk = _update(instance=instance)

    logger.info(
        "milk-updated",
        extra={
            "uuid": updated_milk.uuid,
        },
    )

    return updated_milk
