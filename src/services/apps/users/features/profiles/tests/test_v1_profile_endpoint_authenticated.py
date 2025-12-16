import pytest

from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_getProfile_authenticated_returns_the_users_own_profile(authenticated_client, profile):
    client, user = authenticated_client
    url = reverse("api:v1:profile-detail")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert str(user.profile.uuid) == response.data["uuid"]


def test_updateProfile_authenticated_returns_200(authenticated_client, profile_payload, profile):
    client, _ = authenticated_client
    url = reverse("api:v1:profile-detail")

    response = client.patch(url, profile_payload)
    assert response.status_code == status.HTTP_200_OK
