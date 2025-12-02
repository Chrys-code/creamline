import pytest

from apps.pasteurs.models import Pasteur
from apps.pasteurs.use_cases.update import update_pasteur

pytestmark = pytest.mark.django_db()


def test_update_pasteur_saves(pasteur, pasteur_payload, test_user):
    original_name = pasteur.name

    updated = update_pasteur(instance=pasteur, name=pasteur_payload["name"])
    db_instance = Pasteur.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Pasteur)
    assert db_instance.name != original_name
    assert db_instance.name == pasteur_payload["name"]
    assert db_instance.created_by == test_user


def test_update_pasteur_missing_name_skips_attribute(pasteur, test_user):
    original_name = pasteur.name

    updated = update_pasteur(instance=pasteur, name=None)  # type: ignore[attr-defined]
    db_instance = Pasteur.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Pasteur)
    assert db_instance.name == original_name
    assert db_instance.created_by == test_user
