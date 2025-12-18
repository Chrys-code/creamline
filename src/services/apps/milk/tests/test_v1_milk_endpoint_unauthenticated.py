import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_milk_v1_list_endpoint_unauthenticated_returns_403(
    api_client,
):
    url = reverse("api:v1:milk-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_detail_endpoint_unauthenticated_returns_403(api_client, milk):
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_create_endpoint_unauthenticated_returns_403(api_client, milk_payload):
    url = reverse("api:v1:milk-list")

    response = api_client.post(url, milk_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_update_endpoint_unauthenticated_returns_403(
    api_client, milk, milk_payload
):
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = api_client.patch(url, milk_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_milk_v1_delete_endpoint_unauthenticated_returns_403(api_client, milk):
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
