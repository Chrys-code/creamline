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


def test_storage_v1_detail_endpoint_unauthenticated_client_returns_403(
    api_client, storage
):
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_create_endpoint_returns_403(api_client, storage_payload):
    url = reverse("api:v1:storage-list")

    response = api_client.post(url, storage_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_update_endpoint_returns_403(api_client, storage_payload, storage):
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = api_client.patch(url, storage_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_delete_endpoint_unauthenticated_client_returns_403(
    api_client, storage
):
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_all_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:storage-list-no-pagination")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_storage_v1_types_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:storage-list-types")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
