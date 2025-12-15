import pytest

from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_v1_user_list_endpoint_with_perms_returns_200(auth_client_with_perm):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_customuser"])
    url = reverse("api:v1:users-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_v1_user_detail_endpoint_with_perms_returns_200(
    auth_client_with_perm, test_user
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_customuser"])
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_v1_user_create_endpoint_with_perms_returns_201(
    auth_client_with_perm, create_user_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["add_customuser"])
    url = reverse("api:v1:users-list")

    response = client.post(url, create_user_payload)
    assert response.status_code == status.HTTP_201_CREATED


def test_v1_user_update_endpoint_with_perms_returns_200(
    auth_client_with_perm, test_user, profile, update_user_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["change_customuser"])
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = client.patch(url, update_user_payload)
    assert response.status_code == status.HTTP_200_OK


def test_v1_user_delete_endpoint_with_perms_returns_204(
    auth_client_with_perm, test_user
):
    client, _ = auth_client_with_perm("manager@manager.com", ["delete_customuser"])
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
