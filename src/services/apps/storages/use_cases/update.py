import logging

from apps.storages.models import Storage


logger = logging.getLogger(__name__)


def _update(instance: Storage) -> Storage:
    instance.save()

    return instance


def update_storage(
    instance: Storage,
    name: str,
    type: Storage.StorageType
) -> Storage:
    
    if name is not None:
        setattr(instance, "name", name)
    if type is not None:
        setattr(instance, "type", type)

    updated_storage = _update(instance=instance)

    logger.info(
        "storage-updated",
        extra={
            "uuid": updated_storage.uuid,
        },
    )

    return updated_storage
