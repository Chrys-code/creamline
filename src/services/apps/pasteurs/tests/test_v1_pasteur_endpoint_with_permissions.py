import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_pasteur_v1_list_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_pasteur"])
    url = reverse("api:v1:pasteur-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_pasteur_v1_detail_endpoint_with_perms_returns_200(
    auth_client_with_perm, pasteur
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_pasteur"])
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_pasteur_v1_create_endpoint_with_perms_returns_201(
    auth_client_with_perm, pasteur_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["add_pasteur"])
    url = reverse("api:v1:pasteur-list")

    response = client.post(url, pasteur_payload)

    assert response.status_code == status.HTTP_201_CREATED


def test_pasteur_v1_update_endpoint_with_perms_returns_200(
    auth_client_with_perm, pasteur_payload, pasteur
):
    client, _ = auth_client_with_perm("manager@manager.com", ["change_pasteur"])
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = client.patch(url, pasteur_payload)

    assert response.status_code == status.HTTP_200_OK


def test_pasteur_v1_detail_delete_endpoint_with_perms_returns_204(
    auth_client_with_perm, pasteur
):
    client, _ = auth_client_with_perm("manager@manager.com", ["delete_pasteur"])
    url = reverse("api:v1:pasteur-detail", args=[pasteur.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_pasteur_v1_all_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_pasteur"])
    url = reverse("api:v1:pasteur-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
