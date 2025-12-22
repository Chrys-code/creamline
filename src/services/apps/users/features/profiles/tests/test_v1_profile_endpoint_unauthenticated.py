import pytest

from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_get_profile_authenticated_returns_403(api_client):
    url = reverse("api:v1:profile-detail")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_update_profile_authenticated_returns_403(api_client, profile_payload):
    url = reverse("api:v1:profile-detail")

    response = api_client.patch(url, profile_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN
