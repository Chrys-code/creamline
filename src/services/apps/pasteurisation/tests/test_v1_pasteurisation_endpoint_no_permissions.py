import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_pasteurisation_v1_list_endpoint_no_perms_returns_403(
    authenticated_client,
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteurisation-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_detail_endpoint_no_perms_returns_403(
    authenticated_client, pasteurisation
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_create_endpoint_no_perms_returns_403(
    authenticated_client, pasteurisation_payload
):
    client, _ = authenticated_client
    url = reverse(
        "api:v1:pasteurisation-list",
    )

    response = client.post(url, pasteurisation_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_update_endpoint_no_perms_returns_403(
    authenticated_client, pasteurisation, pasteurisation_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = client.post(url, pasteurisation_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_delete_endpoint_no_perms_returns_403(
    authenticated_client, pasteurisation
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
