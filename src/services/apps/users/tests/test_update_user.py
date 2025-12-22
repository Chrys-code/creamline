import pytest

from apps.users.use_cases.update import update_user

pytestmark = pytest.mark.django_db()


def test_update_user_missing_email_ignores(test_user):
    updated_user = update_user(instance=test_user, email=None)

    assert updated_user.email == test_user.email


def test_update_user(test_user):
    email = "testuser@edited.com"
    updated_user = update_user(instance=test_user, email=email)

    assert updated_user.email == email
