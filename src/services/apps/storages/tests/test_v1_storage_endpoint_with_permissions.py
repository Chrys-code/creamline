import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_storage_v1_list_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_storage"])
    url = reverse("api:v1:storage-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_storage_v1_get_endpoint_with_perms_returns_200(auth_client_with_perm, storage):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_storage"])
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_storage_v1_create_endpoint_with_perms_returns_201(
    auth_client_with_perm, storage_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["add_storage"])
    url = reverse("api:v1:storage-list")

    response = client.post(url, storage_payload)
    assert response.status_code == status.HTTP_201_CREATED


def test_storage_v1_update_endpoint_with_perms_returns_200(
    auth_client_with_perm, storage_payload, storage
):
    client, _ = auth_client_with_perm("manager@manager.com", ["change_storage"])
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = client.patch(url, storage_payload)
    assert response.status_code == status.HTTP_200_OK


def test_storage_v1_delete_endpoint_with_perms_returns_204(
    auth_client_with_perm, storage
):
    client, _ = auth_client_with_perm("manager@manager.com", ["delete_storage"])
    url = reverse("api:v1:storage-detail", args=[storage.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_storage_v1_all_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_storage"])
    url = reverse("api:v1:storage-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_storage_v1_types_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_storage"])
    url = reverse("api:v1:storage-list-types")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
