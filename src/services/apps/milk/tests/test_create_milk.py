import pytest
from django.db.utils import IntegrityError

from apps.milk.models import Milk
from apps.milk.use_cases.create import create_milk

pytestmark = pytest.mark.django_db()


def test_create_milk_saves(test_user, milk_payload):
    created = create_milk(validated_data=milk_payload, created_by=test_user)

    db_instance = Milk.objects.get(uuid=created.uuid)

    assert isinstance(created, Milk)
    assert db_instance.producer == milk_payload["producer"]
    assert db_instance.storage == milk_payload["storage"]
    assert db_instance.volume_kg == milk_payload["volume_kg"]
    assert db_instance.volume_liters == milk_payload["volume_liters"]
    assert db_instance.acid_content == milk_payload["acid_content"]
    assert db_instance.aflatoxin == milk_payload["aflatoxin"]
    assert db_instance.inhibitory_residue == milk_payload["inhibitory_residue"]
    assert db_instance.temperature == milk_payload["temperature"]
    assert db_instance.created_by == test_user


def test_create_milk_missing_producer_fails(test_user, milk_payload):
    milk_payload["producer"] = None

    with pytest.raises(IntegrityError):
        create_milk(validated_data=milk_payload, created_by=test_user)


def test_create_milk_missing_storage_fails(test_user, milk_payload):
    milk_payload["storage"] = None

    with pytest.raises(IntegrityError):
        create_milk(validated_data=milk_payload, created_by=test_user)
