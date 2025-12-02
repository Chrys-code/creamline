import pytest

from apps.storages.models import Storage
from apps.storages.use_cases.update import update_storage

pytestmark = pytest.mark.django_db()


def test_update_storage_saves_instance(storage, storage_payload, test_user):
    original_name = storage.name
    original_type = storage.type

    updated = update_storage(
        instance=storage, name=storage_payload["name"], type=storage_payload["type"]
    )
    db_instance = Storage.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Storage)
    assert db_instance.name != original_name
    assert db_instance.name == storage_payload["name"]
    assert db_instance.type != original_type
    assert db_instance.type == storage_payload["type"]
    assert db_instance.created_by == test_user


def test_update_storage_missing_name_skips_attribute(storage, test_user):
    original_name = storage.name
    original_type = storage.type

    type_payload = Storage.StorageTypes.TUB

    updated = update_storage(
        instance=storage, name=None, type=type_payload  # type: ignore[attr-defined]
    )
    db_instance = Storage.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Storage)
    assert db_instance.name == original_name
    assert db_instance.type != original_type
    assert db_instance.type == type_payload
    assert db_instance.created_by == test_user
