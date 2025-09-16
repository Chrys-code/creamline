import logging
from typing import Dict

from storages.models import Storage


logger = logging.getLogger(__name__)


def _update(
    instance: Storage
) -> Storage:
    updated_storage = instance.save()

    return updated_storage


def update_storage(
    instance: Storage,
    validated_data: Dict,
) -> Storage:
    for field, value in validated_data.items():
        setattr(instance, field, value)

    updated_storage = _update(instance=instance)

    logger.info(
        "storage-updated",
        extra={
            "uuid": updated_storage.uuid,
        },
    )

    return updated_storage
