import pytest

from rest_framework import status
from rest_framework.reverse import reverse


pytestmark = pytest.mark.django_db()


def test_v1_user_list_endpoint_with_perms_returns_200(auth_client_with_perm):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_customuser"])
    url = reverse("api:v1:users-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_v1_user_detail_endpoint_with_perms_returns_role_assignment_error(
    auth_client_with_perm, test_user
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_customuser"])
    url = reverse("api:v1:users-detail", args=[test_user.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_v1_user_create_endpoint_with_perms_returns_201(
    auth_client_with_perm, create_user_payload, owner_group, manager_group
):
    url = reverse("api:v1:users-list")
    # Get authenticated client with object permission
    client, user = auth_client_with_perm("owner@owner.com", ["add_customuser"])
    # Assign Owner group to user
    og, _ = owner_group
    user.groups.set([og])

    # Get group to assign to target user
    _, mgMeta = manager_group
    create_user_payload["groups"] = [mgMeta.uuid]

    response = client.post(url, create_user_payload)

    assert response.status_code == status.HTTP_201_CREATED


def test_v1_user_update_endpoint_with_perms_returns_200(
    auth_client_with_perm,
    test_user,
    profile,
    update_user_payload,
    owner_group,
    manager_group,
):
    url = reverse("api:v1:users-detail", args=[test_user.uuid])
    # Get authenticated client with object permission
    client, user = auth_client_with_perm("owner@owner.com", ["change_customuser"])
    # Assign Owner group to user
    og, _ = owner_group
    user.groups.set([og])

    # Get group to assign to target user
    _, mgMeta = manager_group
    update_user_payload["groups"] = [mgMeta.uuid]

    response = client.patch(url, update_user_payload)
    assert response.status_code == status.HTTP_200_OK


def test_v1_user_delete_endpoint_with_perms_returns_204(
    auth_client_with_perm, test_user, owner_group
):
    url = reverse("api:v1:users-detail", args=[test_user.uuid])
    # Get authenticated client with object permission
    client, user = auth_client_with_perm("owner@owner.com", ["delete_customuser"])
    # Assign Owner group to user
    og, _ = owner_group
    user.groups.set([og])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
