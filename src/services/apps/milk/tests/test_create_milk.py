import pytest
from django.db.utils import IntegrityError

from apps.milk.models import Milk
from apps.milk.use_cases.create import create_milk

pytestmark = pytest.mark.django_db()


def test_create_milk_saves(test_user, milk_payload):
    created = create_milk(validated_data=milk_payload, created_by=test_user)

    db_instance = Milk.objects.get(uuid=created.uuid)

    assert isinstance(created, Milk)
    assert db_instance != None
    assert db_instance.uuid != None


def test_create_milk_missing_producer_fails(test_user, milk_payload):
    milk_payload["producer"] = None

    with pytest.raises(IntegrityError):
        create_milk(validated_data=milk_payload, created_by=test_user)


def test_create_milk_missing_storage_fails(test_user, milk_payload):
    milk_payload["storage"] = None

    with pytest.raises(IntegrityError):
        create_milk(validated_data=milk_payload, created_by=test_user)
