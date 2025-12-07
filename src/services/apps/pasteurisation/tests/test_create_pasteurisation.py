import pytest

from apps.pasteurisation.models import Pasteurisation
from apps.pasteurisation.use_cases.create import create_pasteurisation

pytestmark = pytest.mark.django_db()


def test_create_pasteuriation_saves(test_user, pasteurisation_payload):
    created = create_pasteurisation(
        validated_data=pasteurisation_payload, created_by=test_user
    )

    db_instance = Pasteurisation.objects.get(uuid=created.uuid)

    assert isinstance(created, Pasteurisation)
    assert db_instance != None
    assert db_instance.uuid != None
