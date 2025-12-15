import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_producer_v1_list_endpoint_no_prems_returns_403(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_detail_endpoint_no_prems__returns_403(
    authenticated_client, producer
):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_create_endpoint_no_prems_returns_403(
    authenticated_client, producer_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-list")

    response = client.post(url, producer_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_update_endpoint_no_prems_returns_403(
    authenticated_client, producer_payload, producer
):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.patch(url, producer_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_delete_endpoint__no_prems_returns_403(
    authenticated_client, producer
):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_producer_v1_all_endpoint__no_prems_returns_403(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:producer-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
