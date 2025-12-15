import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_producer_v1_list_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:producer-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_detail_endpoint_unauthenticated_client_returns_403(
    api_client, producer
):
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_create_endpoint_unauthenticated_client_returns_403(
    api_client, producer_payload
):
    url = reverse("api:v1:producer-list")

    response = api_client.post(url, producer_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_update_endpoint_unauthenticated_client_returns_403(
    api_client, producer_payload, producer
):
    url = reverse("api:v1:producer-detail",  args=[producer.uuid])

    response = api_client.patch(url, producer_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_delete_endpoint_unauthenticated_client_returns_403(
    api_client, producer
):
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_all_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:producer-list-no-pagination")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_all_endpoint_returns_403(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
