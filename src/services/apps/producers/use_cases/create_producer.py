import logging
from typing import TYPE_CHECKING

from apps.producers.models import Producer

if TYPE_CHECKING:
    from apps.users.models import CustomUser

logger = logging.getLogger(__name__)


def _create(
    name: str, address: str, contact_email: str | None, created_by: "CustomUser"
) -> Producer:
    producer = Producer.objects.create(
        name=name, address=address, contact_email=contact_email, created_by=created_by
    )

    return producer


def create_producer(
    name: str, address: str, contact_email: str | None, created_by: "CustomUser"
) -> Producer:
    created_producer = _create(
        name=name,
        address=address,
        contact_email=contact_email,
        created_by=created_by,
    )

    logger.info(
        "producer-created",
        extra={"uuid": created_producer.uuid, "created_by": created_by.uuid},
    )

    return created_producer
