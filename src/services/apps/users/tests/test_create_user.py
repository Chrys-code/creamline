import pytest

from apps.users.models import CustomUser
from apps.users.use_cases.create_user import create_user


pytestmark = pytest.mark.django_db()


def test_create_user(create_user_payload):
    create_user(
        email=create_user_payload["email"], password=create_user_payload["password"]
    )

    assert CustomUser.objects.filter().exists()
