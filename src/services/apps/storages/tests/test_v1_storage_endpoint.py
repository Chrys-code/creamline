import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_storage_v1_list_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:storage-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_list_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:storage-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_storage_v1_detail_endpoint_unauthenticated_client_returns_403(
    api_client, storage
):
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_detail_endpoint_returns_200(authenticated_client, storage):
    client, _ = authenticated_client
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_storage_v1_detail_delete_endpoint_unauthenticated_client_returns_403(
    api_client, storage
):
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_detail_delete_endpoint_returns_200(authenticated_client, storage):
    client, _ = authenticated_client
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_storage_v1_all_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:storage-list-no-pagination")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_all_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:storage-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_storage_v1_types_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:storage-list-types")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_types_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:storage-list-types")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


# Create method uses Write Serializer and responds with Read Serializer
def test_storage_v1_create_endpoint_returns_with_expected_data(
    authenticated_client, storage_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:storage-list")

    response = client.post(url, storage_payload)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["uuid"] is not None
    assert response.data["name"] == storage_payload["name"]
    assert response.data["type"] == storage_payload["type"]
    assert response.data["type_label"] is not None
    assert response.data["created_at"] is not None


# Update method uses Write Serializer and responds with Read Serializer
def test_storage_v1_update_endpoint_returns_with_expected_data(
    authenticated_client, storage_payload, storage
):
    client, _ = authenticated_client
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = client.patch(url, storage_payload)

    assert response.status_code == status.HTTP_200_OK
    assert response.data["uuid"] is not None
    assert response.data["name"] == storage_payload["name"]
    assert response.data["type"] == storage_payload["type"]
    assert response.data["type_label"] is not None
    assert response.data["created_at"] is not None
