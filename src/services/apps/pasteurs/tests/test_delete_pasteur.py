import pytest

from apps.pasteurs.models import Pasteur
from apps.pasteurs.use_cases.delete import delete_pasteur

pytestmark = pytest.mark.django_db()


def test_delete_pasteur_updates(pasteur, test_user):
    delete_pasteur(instance=pasteur, deleted_by=test_user)
    db_instance = Pasteur.objects.get(uuid=pasteur.uuid)

    assert isinstance(db_instance, Pasteur)
    assert db_instance.deleted_at != None
    assert db_instance.deleted_by == test_user


def test_delete_pasteur_missing_delete_by_does_not_update(
    pasteur,
):
    with pytest.raises(AttributeError):
        delete_pasteur(instance=pasteur, deleted_by=None)  # type: ignore[attr-defined]


def test_delete_pasteur_missing_instance_does_not_update(
    test_user,
):
    with pytest.raises(AttributeError):
        delete_pasteur(
            instance=None, deleted_by=test_user  # type: ignore[attr-defined]
        )
