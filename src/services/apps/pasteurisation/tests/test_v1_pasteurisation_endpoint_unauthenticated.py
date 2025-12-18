import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_pasteurisation_v1_list_endpoint_unauthenticated_returns_403(
    api_client,
):
    url = reverse("api:v1:pasteurisation-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_detail_endpoint_unauthenticated_returns_403(
    api_client, pasteurisation
):
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_create_endpoint_unauthenticated_returns_403(
    api_client, pasteurisation_payload
):
    url = reverse(
        "api:v1:pasteurisation-list",
    )

    response = api_client.post(url, pasteurisation_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_update_endpoint_unauthenticated_returns_403(
    api_client, pasteurisation, pasteurisation_payload
):
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = api_client.post(url, pasteurisation_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_delete_endpoint_unauthenticated_returns_403(
    api_client, pasteurisation
):
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
