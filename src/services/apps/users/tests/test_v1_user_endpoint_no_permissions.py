import pytest

from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_v1_user_list_endpoint_no_perms_returns_403(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:users-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_detail_endpoint_no_perms_returns_403(authenticated_client, test_user):
    client, _ = authenticated_client
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_create_endpoint_no_perms_returns_403(
    authenticated_client, create_user_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:users-list")

    response = client.post(url, create_user_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_update_endpoint_no_perms_returns_403(
    authenticated_client, test_user, update_user_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = client.patch(url, update_user_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_v1_user_delete_endpoint_no_perms_returns_403(authenticated_client, test_user):
    client, _ = authenticated_client
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
