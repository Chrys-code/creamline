import pytest

from apps.producers.models import Producer
from apps.producers.use_cases.update_producer import update_producer

pytestmark = pytest.mark.django_db()


def test_update_producer_saves(producer, producer_payload, test_user):
    updated = update_producer(
        instance=producer,
        name=producer_payload["name"],
        address=producer_payload["address"],
        contact_email=producer_payload["contact_email"],
    )
    db_instance = Producer.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Producer)
    assert db_instance.name == producer_payload["name"]
    assert db_instance.address == producer_payload["address"]
    assert db_instance.contact_email == producer_payload["contact_email"]
    assert db_instance.created_by == test_user


def test_update_producer_missing_name_skips_attribute(
    producer, producer_payload, test_user
):
    original_name = producer.name

    updated = update_producer(
        instance=producer,
        name=None,
        address=producer_payload["address"],
        contact_email=producer_payload["contact_email"],
    )
    db_instance = Producer.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Producer)
    assert db_instance.name == original_name
    assert db_instance.address == producer_payload["address"]
    assert db_instance.contact_email == producer_payload["contact_email"]

    assert db_instance.created_by == test_user


def test_update_producer_missing_address_skips_attribute(
    producer, producer_payload, test_user
):
    original_address = producer.address

    updated = update_producer(
        instance=producer,
        name=producer_payload["name"],
        address=None,
        contact_email=producer_payload["contact_email"],
    )
    db_instance = Producer.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Producer)
    assert db_instance.name == producer_payload["name"]
    assert db_instance.address == original_address
    assert db_instance.contact_email == producer_payload["contact_email"]

    assert db_instance.created_by == test_user


def test_update_producer_missing_contact_email_skips_attribute(
    producer, producer_payload, test_user
):
    original_contact_email = producer.contact_email

    updated = update_producer(
        instance=producer,
        name=producer_payload["name"],
        address=producer_payload["address"],
        contact_email=None,
    )
    db_instance = Producer.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Producer)
    assert db_instance.name == producer_payload["name"]
    assert db_instance.address == producer_payload["address"]
    assert db_instance.contact_email == original_contact_email

    assert db_instance.created_by == test_user
