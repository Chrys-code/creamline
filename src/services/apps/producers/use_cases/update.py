import logging

from apps.producers.models import Producer


logger = logging.getLogger(__name__)


def _update(instance: Producer) -> Producer:
    updated_producer = instance.save()

    return updated_producer


def update_producer(
    instance: Producer,
    name: str | None,
    address: str | None,
    contact_email: str | None,
) -> Producer:
    if name is not None:
        setattr(instance, "name", name)
    if address is not None:
        setattr(instance, "address", address)
    if contact_email is not None:
        setattr(instance, "contact_email", contact_email)

    updated_producer = _update(instance=instance)

    logger.info(
        "producer-updated",
        extra={
            "uuid": updated_producer.uuid,
        },
    )

    return updated_producer
