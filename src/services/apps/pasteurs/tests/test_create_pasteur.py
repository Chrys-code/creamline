import pytest

from django.db import IntegrityError

from apps.pasteurs.models import Pasteur
from apps.pasteurs.use_cases.create_pasteur import create_pasteur

pytestmark = pytest.mark.django_db()


def test_create_pasteur_saves(test_user, pasteur_payload):
    created = create_pasteur(name=pasteur_payload["name"], created_by=test_user)
    db_instance = Pasteur.objects.get(uuid=created.uuid)

    assert isinstance(created, Pasteur)
    assert db_instance.name == pasteur_payload["name"]
    assert db_instance.created_by == test_user


def test_create_pasteur_missing_created_by_does_not_save(pasteur_payload):
    with pytest.raises(AttributeError):
        create_pasteur(
            name=pasteur_payload["name"], created_by=None  # type: ignore[attr-defined]
        )


def test_create_pasteur_missing_name_does_not_save(test_user, pasteur_payload):
    with pytest.raises(IntegrityError):
        create_pasteur(name=None, created_by=test_user)  # type: ignore[attr-defined]
