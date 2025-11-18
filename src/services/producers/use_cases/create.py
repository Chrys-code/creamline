import logging
from typing import TypedDict, TYPE_CHECKING

from producers.models import Producer

if TYPE_CHECKING:
    from users.models import CustomUser

logger = logging.getLogger(__name__)


class CreateProducerData(TypedDict):
    name: str
    address: str
    contact_email: str | None
    created_by: "CustomUser"


def _create(
    name: str, address: str, contact_email: str | None, created_by: "CustomUser"
) -> Producer:
    producer = Producer.objects.create(
        name=name, address=address, contact_email=contact_email, created_by=created_by
    )

    return producer


def create_producer(
    validated_data: CreateProducerData, created_by: "CustomUser"
) -> Producer:
    created_producer = _create(
        name=validated_data["name"],
        address=validated_data["address"],
        contact_email=validated_data.get("contact_email", None),
        created_by=created_by,
    )

    logger.info(
        "producer-created",
        extra={"uuid": created_producer.uuid, "created_by": created_by.uuid},
    )

    return created_producer
