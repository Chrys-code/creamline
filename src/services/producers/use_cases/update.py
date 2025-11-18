import logging
from typing import Dict

from producers.models import Producer


logger = logging.getLogger(__name__)


def _update(instance: Producer) -> Producer:
    updated_producer = instance.save()

    return updated_producer


def update_producer(
    instance: Producer,
    validated_data: Dict,
) -> Producer:
    for field, value in validated_data.items():
        setattr(instance, field, value)

    updated_producer = _update(instance=instance)

    logger.info(
        "producer-updated",
        extra={
            "uuid": updated_producer.uuid,
        },
    )

    return updated_producer
