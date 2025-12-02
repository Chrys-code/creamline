import pytest

from django.db import IntegrityError

from apps.producers.models import Producer
from apps.producers.use_cases.create import create_producer

pytestmark = pytest.mark.django_db()


def test_create_producer_saves(test_user, producer_payload):
    created = create_producer(
        name=producer_payload["name"],
        address=producer_payload["address"],
        contact_email=producer_payload["contact_email"],
        created_by=test_user,
    )
    db_instance = Producer.objects.get(uuid=created.uuid)

    assert isinstance(created, Producer)
    assert db_instance.name == producer_payload["name"]
    assert db_instance.address == producer_payload["address"]
    assert db_instance.contact_email == producer_payload["contact_email"]
    assert db_instance.created_by == test_user


def test_create_producer_missing_created_by_does_not_save(producer_payload):
    with pytest.raises(AttributeError):
        create_producer(
            name=producer_payload["name"],
            address=producer_payload["address"],
            contact_email=producer_payload["contact_email"],
            created_by=None,  # type: ignore[attr-defined]
        )


def test_create_producer_missing_name_does_not_save(test_user, producer_payload):
    with pytest.raises(IntegrityError):
        create_producer(
            name=None,  # type: ignore[attr-defined]
            address=producer_payload["address"],
            contact_email=producer_payload["contact_email"],
            created_by=test_user,
        )


def test_create_producer_missing_address_does_not_save(test_user, producer_payload):
    with pytest.raises(IntegrityError):
        create_producer(
            name=producer_payload["name"],
            address=None,  # type: ignore[attr-defined]
            contact_email=producer_payload["contact_email"],
            created_by=test_user,
        )


def test_create_producer_missing_contact_email_saves(test_user, producer_payload):
    create_producer(
        name=producer_payload["name"],
        address=producer_payload["address"],
        contact_email=None,  # type: ignore[attr-defined]
        created_by=test_user,
    )
