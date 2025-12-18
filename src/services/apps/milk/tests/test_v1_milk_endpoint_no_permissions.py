import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_milk_v1_list_endpoint_no_perms_returns_403(
    authenticated_client,
):
    client, _ = authenticated_client
    url = reverse("api:v1:milk-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_detail_endpoint_no_perms_returns_403(authenticated_client, milk):
    client, _ = authenticated_client
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_create_endpoint_no_perms_returns_403(
    authenticated_client, milk_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:milk-list")

    response = client.post(url, milk_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_update_endpoint_no_perms_returns_403(
    authenticated_client, milk, milk_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = client.patch(url, milk_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_delete_endpoint_no_perms_returns_403(authenticated_client, milk):
    client, _ = authenticated_client
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
