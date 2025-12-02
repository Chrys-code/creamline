import pytest

from apps.storages.models import Storage


@pytest.fixture
def storage(test_user):
    created = Storage.objects.create(
        name="test_storage",
        type=Storage.StorageTypes.SILO,
        created_by=test_user
    )

    return created


@pytest.fixture
def storage_2(test_user):
    created = Storage.objects.create(
        name="test_storage_2",
        type=Storage.StorageTypes.TUB,
        created_by=test_user
    )

    return created


@pytest.fixture
def storage_payload():
    return {"name": "test_storage_payload", "type": Storage.StorageTypes.CONTAINER}
