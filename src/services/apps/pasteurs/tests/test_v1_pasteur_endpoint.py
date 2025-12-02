import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_pasteur_v1_list_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:pasteur-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_list_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_pasteur_v1_detail_endpoint_unauthenticated_client_returns_403(
    api_client, pasteur
):
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_detail_endpoint_returns_200(authenticated_client, pasteur):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_pasteur_v1_detail_delete_endpoint_unauthenticated_client_returns_403(
    api_client, pasteur
):
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_detail_delete_endpoint_returns_200(authenticated_client, pasteur):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_pasteur_v1_all_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:pasteur-list-no-pagination")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteur_v1_all_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteur-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
