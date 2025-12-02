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


def test_producer_v1_list_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_producer_v1_detail_endpoint_unauthenticated_client_returns_403(
    api_client, producer
):
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_detail_endpoint_returns_200(authenticated_client, producer):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_producer_v1_detail_delete_endpoint_unauthenticated_client_returns_403(
    api_client, producer
):
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_detail_delete_endpoint_returns_200(authenticated_client, producer):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_producer_v1_all_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:producer-list-no-pagination")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_all_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
