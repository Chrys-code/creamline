import pytest

from rest_framework.test import APIClient

from apps.users.models import CustomUser

pytest_plugins = [
    "apps.users.features.profiles.tests.fixtures",
    "apps.product_definitions.tests.fixtures",
    "apps.pasteurisation.tests.fixtures",
    "apps.storages.tests.fixtures",
    "apps.pasteurs.tests.fixtures",
    "apps.producers.tests.fixtures",
]


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def test_user(db):
    user = CustomUser.objects.create_user(  # type: ignore[attr-defined]
        email="testuser@testuser.com", password="testpass123"
    )

    return user


@pytest.fixture
def authenticated_client(test_user):
    client = APIClient()
    client.force_authenticate(user=test_user)

    return client, test_user
