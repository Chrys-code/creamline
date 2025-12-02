import pytest

from apps.pasteurs.models import Pasteur

@pytest.fixture
def pasteur(test_user):
    created = Pasteur.objects.create(
        name="test_pasteur",
        created_by=test_user
    )

    return created

@pytest.fixture
def pasteur_payload():
    return {"name": "test_pasteur_payload"}
