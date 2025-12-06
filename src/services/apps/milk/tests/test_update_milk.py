import pytest

from apps.milk.models import Milk
from apps.milk.use_cases.update import update_milk

pytestmark = pytest.mark.django_db()


def test_update_milk_saves(milk, milk_payload, test_user):
    updated = update_milk(instance=milk, validated_data=milk_payload)
    db_instance = Milk.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Milk)
    assert db_instance.volume_kg == milk_payload["volume_kg"]
    assert db_instance.volume_liters == milk_payload["volume_liters"]
    assert db_instance.acid_content == milk_payload["acid_content"]
    assert db_instance.temperature == milk_payload["temperature"]
    assert db_instance.created_by == test_user


def test_update_milk_missing_value_skips_attribute(milk, milk_payload, test_user):
    milk_payload["volume_kg"] = None
    milk_payload["volume_liters"] = None
    original_volume_kg = milk.volume_kg
    original_volume_liters = milk.volume_liters

    updated = update_milk(instance=milk, validated_data=milk_payload)
    db_instance = Milk.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Milk)
    assert db_instance.volume_kg == original_volume_kg
    assert db_instance.volume_liters == original_volume_liters
    assert db_instance.created_by == test_user
