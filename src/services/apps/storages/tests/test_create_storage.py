import pytest

from django.db import IntegrityError

from apps.storages.models import Storage
from apps.storages.use_cases.create import create_storage

pytestmark = pytest.mark.django_db()


def test_create_storage_saves_instance(test_user, storage_payload):

    created = create_storage(
        name=storage_payload["name"], type=storage_payload["type"], created_by=test_user
    )
    db_instance = Storage.objects.get(uuid=created.uuid)

    assert isinstance(created, Storage)
    assert db_instance.name == storage_payload["name"]
    assert db_instance.created_by == test_user


def test_create_storage_missing_created_by_does_not_save(storage_payload):
    with pytest.raises(AttributeError):
        create_storage(
            name=storage_payload["name"], type=storage_payload["type"], created_by=None  # type: ignore[attr-defined]
        )


def test_create_storage_missing_name_does_not_save(test_user, storage_payload):
    with pytest.raises(IntegrityError):
        create_storage(name=None, type=storage_payload["type"], created_by=test_user)  # type: ignore[attr-defined]


def test_create_storage_missing_type_does_not_save(test_user, storage_payload):
    with pytest.raises(IntegrityError):
        create_storage(name=storage_payload["name"], type=None, created_by=test_user)  # type: ignore[attr-defined]
