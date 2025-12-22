import pytest
from django.db.utils import IntegrityError

from apps.milk.models import Milk
from apps.milk.use_cases.create_milk import create_milk

pytestmark = pytest.mark.django_db()


def test_create_milk_saves(test_user, create_milk_data):
    created = create_milk(validated_data=create_milk_data, created_by=test_user)

    db_instance = Milk.objects.get(uuid=created.uuid)

    assert isinstance(created, Milk)
    assert db_instance.producer == create_milk_data["producer"]
    assert db_instance.storage == create_milk_data["storage"]
    assert db_instance.volume_kg == create_milk_data["volume_kg"]
    assert db_instance.volume_liters == create_milk_data["volume_liters"]
    assert db_instance.acid_content == create_milk_data["acid_content"]
    assert db_instance.aflatoxin == create_milk_data["aflatoxin"]
    assert db_instance.inhibitory_residue == create_milk_data["inhibitory_residue"]
    assert db_instance.temperature == create_milk_data["temperature"]
    assert db_instance.created_by == test_user


def test_create_milk_missing_producer_fails(test_user, create_milk_data):
    create_milk_data["producer"] = None

    with pytest.raises(IntegrityError):
        create_milk(validated_data=create_milk_data, created_by=test_user)


def test_create_milk_missing_storage_fails(test_user, create_milk_data):
    create_milk_data["storage"] = None

    with pytest.raises(IntegrityError):
        create_milk(validated_data=create_milk_data, created_by=test_user)
