import pytest

from apps.producers.models import Producer

@pytest.fixture
def producer(test_user):
    created = Producer.objects.create(
        name="test_producer",
        address="test_producer_address",
        contact_email="test_producer_contact_email",
        created_by=test_user
    )

    return created

@pytest.fixture
def producer_payload():
    return {
        "name": "test_producer_payload",
        "address": "test_producer_address_payload",
        "contact_email": "test_producer_contact_email_payload",
    }
