import pytest

from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_v1_user_list_endpoint_unauthenticated_returns_403(api_client):
    url = reverse("api:v1:users-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_detail_endpoint_unauthenticated_returns_403(api_client, test_user):
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_create_endpoint_unauthenticated_returns_403(
    api_client, create_user_payload
):
    url = reverse("api:v1:users-list")

    response = api_client.post(url, create_user_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_update_endpoint_unauthenticated_returns_403(
    api_client, test_user, update_user_payload
):
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = api_client.patch(url, update_user_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_delete_endpoint_unauthenticated_returns_403(api_client, test_user):
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
