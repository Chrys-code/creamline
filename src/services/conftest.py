import pytest

from django.contrib.auth.models import Permission

from rest_framework.test import APIClient

from apps.users.models import CustomUser

pytest_plugins = [
    "apps.users.tests.fixtures",
    "apps.users.features.profiles.tests.fixtures",
    "apps.users.features.user_groups.tests.fixtures",
    "apps.product_definitions.tests.fixtures",
    "apps.storages.tests.fixtures",
    "apps.pasteurs.tests.fixtures",
    "apps.producers.tests.fixtures",
    "apps.milk.tests.fixtures",
    "apps.pasteurisation.tests.fixtures",
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
def auth_client_with_perm(db):
    def _factory(email, codenames):
        user = CustomUser.objects.create_user(  # type: ignore[attr-defined]
            email=email,
            password="password123",
        )

        permissions = Permission.objects.filter(codename__in=codenames)
        user.user_permissions.add(*permissions)

        client = APIClient()
        client.force_authenticate(user=user)
        return client, user

    return _factory


@pytest.fixture
def authenticated_client(test_user, api_client):
    client = api_client
    api_client.force_authenticate(user=test_user)

    return client, test_user
