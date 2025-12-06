import pytest

from django.contrib.auth.models import Group

from rest_framework.test import APIClient

from apps.users.models import CustomUser

pytest_plugins = [
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
def authenticated_client(test_user, api_client):
    client = api_client
    api_client.force_authenticate(user=test_user)

    return client, test_user


@pytest.fixture
def create_group_user(db):
    """
    Factory fixture to create a user and assign a group.
    Usage:
        user = create_group_user('Manager', email='manager@test.com')
    """

    def _create(group_name, email, password="testpass123"):
        group = Group.objects.get(name=group_name)
        user = CustomUser.objects.create_user(email=email, password=password)  # type: ignore[attr-defined]
        user.groups.add(group)
        user.save()
        return user

    return _create


@pytest.fixture
def group_client(api_client, create_group_user):
    """
    Factory fixture to create an authenticated client for any group user.
    Usage:
        client, user = group_client(group_name='Manager', email='manager@test.com')
    """

    def _client(group_name, email, password="testpass123"):
        user = create_group_user(group_name, email, password)
        api_client.force_authenticate(user)
        return api_client, user

    return _client
