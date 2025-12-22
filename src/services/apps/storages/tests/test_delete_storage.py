import pytest

from apps.storages.models import Storage
from apps.storages.use_cases.delete_storage import delete_storage

pytestmark = pytest.mark.django_db()


def test_delete_storage_updates(storage, test_user):
    delete_storage(instance=storage, deleted_by=test_user)
    instance = Storage.objects.get(uuid=storage.uuid)

    assert isinstance(instance, Storage)
    assert instance.deleted_at != None
    assert instance.deleted_by == test_user


def test_delete_storage_missing_delete_by_does_not_update(
    storage,
):
    with pytest.raises(AttributeError):
        delete_storage(instance=storage, deleted_by=None)  # type: ignore[attr-defined]


def test_delete_storage_missing_instance_does_not_update(
    test_user,
):
    with pytest.raises(AttributeError):
        delete_storage(
            instance=None, deleted_by=test_user  # type: ignore[attr-defined]
        )
