import pytest

from apps.pasteurisation.models import Pasteurisation
from apps.pasteurisation.use_cases.update import update_pasteurisation

pytestmark = pytest.mark.django_db()


def test_update_pasteurisation_saves(pasteurisation, pasteurisation_payload, test_user):
    updated = update_pasteurisation(instance=pasteurisation, validated_data=pasteurisation_payload)
    db_instance = Pasteurisation.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Pasteurisation)
    assert db_instance.pasteur == pasteurisation_payload["pasteur"]
    assert db_instance.source_storage == pasteurisation_payload["source_storage"]
    assert db_instance.target_storage == pasteurisation_payload["target_storage"]
    assert db_instance.product_definition == pasteurisation_payload["product_definition"]
    assert db_instance.volume_kg == pasteurisation_payload["volume_kg"]
    assert db_instance.volume_liters == pasteurisation_payload["volume_liters"]
    assert db_instance.temperature == pasteurisation_payload["temperature"]
    assert db_instance.start_date == pasteurisation_payload["start_date"]
    assert db_instance.end_date == pasteurisation_payload["end_date"]
    assert db_instance.created_by == test_user


def test_update_pasteurisation_missing_value_skips_attribute(pasteurisation, pasteurisation_payload, test_user):
    pasteurisation_payload["volume_kg"] = None
    pasteurisation_payload["volume_liters"] = None

    original_volume_kg = pasteurisation.volume_kg
    original_volume_liters = pasteurisation.volume_liters

    updated = update_pasteurisation(instance=pasteurisation, validated_data=pasteurisation_payload)
    db_instance = Pasteurisation.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Pasteurisation)
    assert db_instance.pasteur == pasteurisation_payload["pasteur"]
    assert db_instance.source_storage == pasteurisation_payload["source_storage"]
    assert db_instance.target_storage == pasteurisation_payload["target_storage"]
    assert db_instance.product_definition == pasteurisation_payload["product_definition"]
    assert db_instance.volume_kg == original_volume_kg
    assert db_instance.volume_liters == original_volume_liters
    assert db_instance.temperature == pasteurisation_payload["temperature"]
    assert db_instance.start_date == pasteurisation_payload["start_date"]
    assert db_instance.end_date == pasteurisation_payload["end_date"]
    assert db_instance.created_by == test_user
