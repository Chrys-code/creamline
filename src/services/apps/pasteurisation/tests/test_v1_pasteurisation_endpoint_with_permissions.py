import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_pasteurisation_v1_list_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_pasteurisation"])
    url = reverse("api:v1:pasteurisation-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_pasteurisation_v1_detail_endpoint_with_perms_returns_200(
    auth_client_with_perm, pasteurisation
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_pasteurisation"])
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_pasteurisation_v1_create_endpoint_with_perms_returns_201(
    auth_client_with_perm, pasteurisation_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["add_pasteurisation"])
    url = reverse(
        "api:v1:pasteurisation-list",
    )

    response = client.post(url, pasteurisation_payload)
    assert response.status_code == status.HTTP_201_CREATED, response.data


def test_pasteurisation_v1_update_endpoint_with_perms_returns_200(
    auth_client_with_perm, pasteurisation, pasteurisation_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["change_pasteurisation"])
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = client.patch(url, pasteurisation_payload)
    assert response.status_code == status.HTTP_200_OK


def test_pasteurisation_v1_delete_endpoint_with_perms_returns_204(
    auth_client_with_perm, pasteurisation
):
    client, _ = auth_client_with_perm("manager@manager.com", ["delete_pasteurisation"])
    url = reverse("api:v1:pasteurisation-detail", args=[pasteurisation.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
