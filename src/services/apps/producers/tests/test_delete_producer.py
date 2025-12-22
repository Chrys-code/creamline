import pytest

from apps.producers.models import Producer
from apps.producers.use_cases.delete_producer import delete_producer

pytestmark = pytest.mark.django_db()


def test_delete_producer_updates(producer, test_user):
    delete_producer(instance=producer, deleted_by=test_user)
    db_instance = Producer.objects.get(uuid=producer.uuid)

    assert isinstance(db_instance, Producer)
    assert db_instance.deleted_at != None
    assert db_instance.deleted_by == test_user


def test_delete_producer_missing_delete_by_does_not_update(
    producer,
):
    with pytest.raises(AttributeError):
        delete_producer(instance=producer, deleted_by=None)  # type: ignore[attr-defined]


def test_delete_producer_missing_instance_does_not_update(
    test_user,
):
    with pytest.raises(AttributeError):
        delete_producer(
            instance=None, deleted_by=test_user  # type: ignore[attr-defined]
        )
