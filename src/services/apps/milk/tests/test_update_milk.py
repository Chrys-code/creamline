import pytest

from apps.milk.models import Milk
from apps.milk.use_cases.update_milk import update_milk

pytestmark = pytest.mark.django_db()


def test_update_milk_saves(milk, create_milk_data, test_user):
    updated = update_milk(instance=milk, validated_data=create_milk_data)
    db_instance = Milk.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Milk)
    assert db_instance.producer == create_milk_data["producer"]
    assert db_instance.storage == create_milk_data["storage"]
    assert db_instance.volume_kg == create_milk_data["volume_kg"]
    assert db_instance.volume_liters == create_milk_data["volume_liters"]
    assert db_instance.acid_content == create_milk_data["acid_content"]
    assert db_instance.aflatoxin == create_milk_data["aflatoxin"]
    assert db_instance.inhibitory_residue == create_milk_data["inhibitory_residue"]
    assert db_instance.temperature == create_milk_data["temperature"]
    assert db_instance.created_by == test_user


def test_update_milk_missing_value_skips_attribute(milk, create_milk_data, test_user):
    create_milk_data["volume_kg"] = None
    create_milk_data["volume_liters"] = None
    original_volume_kg = milk.volume_kg
    original_volume_liters = milk.volume_liters

    updated = update_milk(instance=milk, validated_data=create_milk_data)
    db_instance = Milk.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Milk)
    assert db_instance.producer == create_milk_data["producer"]
    assert db_instance.storage == create_milk_data["storage"]
    assert db_instance.acid_content == create_milk_data["acid_content"]
    assert db_instance.aflatoxin == create_milk_data["aflatoxin"]
    assert db_instance.inhibitory_residue == create_milk_data["inhibitory_residue"]
    assert db_instance.temperature == create_milk_data["temperature"]

    assert db_instance.volume_kg == original_volume_kg
    assert db_instance.volume_liters == original_volume_liters
    assert db_instance.created_by == test_user
