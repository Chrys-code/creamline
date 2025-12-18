import pytest

from apps.milk.models import Milk


@pytest.fixture
def milk(test_user, producer, storage):
    created_milk = Milk.objects.create(
        producer=producer,
        storage=storage,
        volume_kg=1000.00,
        volume_liters=1000.00,
        acid_content=5.1,
        aflatoxin=False,
        inhibitory_residue=False,
        temperature=11,
        created_by=test_user,
    )

    return created_milk


@pytest.fixture
def milk_payload(test_user, producer, storage):
    return {
        "producer": producer.uuid,
        "storage": storage.uuid,
        "volume_kg": 900.00,
        "volume_liters": 900.00,
        "acid_content": 5.5,
        "aflatoxin": False,
        "inhibitory_residue": False,
        "temperature": 10,
        "created_by": test_user,
    }


@pytest.fixture
def create_milk_data(test_user, producer, storage):
    return {
        "producer": producer,
        "storage": storage,
        "volume_kg": 900.00,
        "volume_liters": 900.00,
        "acid_content": 5.5,
        "aflatoxin": False,
        "inhibitory_residue": False,
        "temperature": 10,
        "created_by": test_user,
    }
