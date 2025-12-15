import pytest

from apps.pasteurisation.models import Pasteurisation
from apps.pasteurisation.use_cases.update import update_pasteurisation

pytestmark = pytest.mark.django_db()


def test_update_pasteurisation_saves(
    pasteurisation, create_pasteurisation_data, test_user
):
    updated = update_pasteurisation(
        instance=pasteurisation, validated_data=create_pasteurisation_data
    )
    db_instance = Pasteurisation.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Pasteurisation)
    assert db_instance.pasteur == create_pasteurisation_data["pasteur"]
    assert db_instance.source_storage == create_pasteurisation_data["source_storage"]
    assert db_instance.target_storage == create_pasteurisation_data["target_storage"]
    assert db_instance.product_definition == create_pasteurisation_data["product_definition"]
    assert db_instance.volume_kg == create_pasteurisation_data["volume_kg"]
    assert db_instance.volume_liters == create_pasteurisation_data["volume_liters"]
    assert db_instance.temperature == create_pasteurisation_data["temperature"]
    assert db_instance.start_date == create_pasteurisation_data["start_date"]
    assert db_instance.end_date == create_pasteurisation_data["end_date"]
    assert db_instance.created_by == test_user


def test_update_pasteurisation_missing_value_skips_attribute(pasteurisation, create_pasteurisation_data, test_user):
    create_pasteurisation_data["volume_kg"] = None
    create_pasteurisation_data["volume_liters"] = None

    original_volume_kg = pasteurisation.volume_kg
    original_volume_liters = pasteurisation.volume_liters

    updated = update_pasteurisation(instance=pasteurisation, validated_data=create_pasteurisation_data)
    db_instance = Pasteurisation.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Pasteurisation)
    assert db_instance.pasteur == create_pasteurisation_data["pasteur"]
    assert db_instance.source_storage == create_pasteurisation_data["source_storage"]
    assert db_instance.target_storage == create_pasteurisation_data["target_storage"]
    assert db_instance.product_definition == create_pasteurisation_data["product_definition"]
    assert db_instance.volume_kg == original_volume_kg
    assert db_instance.volume_liters == original_volume_liters
    assert db_instance.temperature == create_pasteurisation_data["temperature"]
    assert db_instance.start_date == create_pasteurisation_data["start_date"]
    assert db_instance.end_date == create_pasteurisation_data["end_date"]
    assert db_instance.created_by == test_user
