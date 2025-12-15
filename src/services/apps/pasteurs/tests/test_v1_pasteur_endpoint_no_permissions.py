import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_pasteur_v1_list_endpoint_no_permissions_returns_403(
    authenticated_client,
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_detail_endpoint_no_permissions_returns_403(
    authenticated_client, pasteur
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_create_endpoint_no_permissions_returns_403(
    authenticated_client, storage_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-list")

    response = client.post(url, storage_payload)

    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_update_endpoint_no_permissions_returns_403(
    authenticated_client, storage_payload, storage
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-detail", args=[storage.uuid])

    response = client.patch(url, storage_payload)

    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_delete_endpoint_no_permissions_returns_403(
    authenticated_client, pasteur
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_all_endpoint_no_permissions_returns_403(
    authenticated_client,
):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
