import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_milk_v1_list_endpoint_eith_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_milk"])
    url = reverse("api:v1:milk-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_milk_v1_detail_endpoint_eith_perms_returns_200(auth_client_with_perm, milk):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_milk"])
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_milk_v1_create_endpoint_eith_perms_returns_201(
    auth_client_with_perm, milk_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["add_milk"])
    url = reverse("api:v1:milk-list")

    response = client.post(url, milk_payload)
    assert response.status_code == status.HTTP_201_CREATED


def test_milk_v1_update_endpoint_eith_perms_returns_200(
    auth_client_with_perm, milk, milk_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["change_milk"])
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = client.patch(url, milk_payload)
    assert response.status_code == status.HTTP_200_OK


def test_milk_v1_delete_endpoint_eith_perms_returns_200(auth_client_with_perm, milk):
    client, _ = auth_client_with_perm("manager@manager.com", ["delete_milk"])
    url = reverse("api:v1:milk-detail", args=[milk.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
