import pytest

from apps.storages.models import Storage
from apps.storages.use_cases.delete import delete_storage

pytestmark = pytest.mark.django_db()


def test_delete_storage_updates_instance(storage, test_user):
    delete_storage(instance=storage, deleted_by=test_user)
    updated_db_instance = Storage.objects.get(uuid=storage.uuid)

    assert isinstance(updated_db_instance, Storage)
    assert updated_db_instance.deleted_at != None
    assert updated_db_instance.deleted_by == test_user


def test_delete_storage_missing_delete_by_does_not_update_instance(
    storage,
):
    with pytest.raises(AttributeError):
        delete_storage(
            instance=storage, deleted_by=None  # type: ignore[attr-defined]
        )


def test_delete_storage_missing_instance_does_not_update_instance(
    test_user,
):
    with pytest.raises(AttributeError):
        delete_storage(
            instance=None, deleted_by=test_user  # type: ignore[attr-defined]
        )
