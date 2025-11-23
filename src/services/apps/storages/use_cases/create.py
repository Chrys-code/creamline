import logging
from typing import TypedDict, TYPE_CHECKING

from apps.storages.models import Storage

if TYPE_CHECKING:
    from apps.users.models import CustomUser

logger = logging.getLogger(__name__)


class CreateStorageData(TypedDict):
    name: str
    type: Storage.StorageType
    created_by: "CustomUser"


def _create(name: str, type: Storage.StorageType, created_by: "CustomUser") -> Storage:
    storage = Storage.objects.create(name=name, type=type, created_by=created_by)

    return storage


def create_storage(
    name: str,
    type: Storage.StorageType,
    created_by: "CustomUser"
) -> Storage:
    created_storage = _create(
        name=name, type=type, created_by=created_by
    )

    logger.info(
        "storage-created",
        extra={"uuid": created_storage.uuid, "created_by": created_by.uuid},
    )

    return created_storage
