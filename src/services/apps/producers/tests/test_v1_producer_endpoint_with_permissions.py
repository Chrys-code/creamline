import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_producer_v1_list_endpoint_with_perms_returns_200(auth_client_with_perm):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_producer"])
    url = reverse("api:v1:producer-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_producer_v1_detail_endpoint_with_perms__returns_200(
    auth_client_with_perm, producer
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_producer"])
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_producer_v1_create_endpoint_with_perms_returns_201(
    auth_client_with_perm, producer_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["add_producer"])
    url = reverse("api:v1:producer-list")

    response = client.post(url, producer_payload)
    assert response.status_code == status.HTTP_201_CREATED


def test_producer_v1_update_endpoint_with_perms_returns_200(
    auth_client_with_perm, producer_payload, producer
):
    client, _ = auth_client_with_perm("manager@manager.com", ["change_producer"])
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.patch(url, producer_payload)
    assert response.status_code == status.HTTP_200_OK, response.data


def test_producer_v1_delete_endpoint__with_perms_returns_204(
    auth_client_with_perm, producer
):
    client, _ = auth_client_with_perm("manager@manager.com", ["delete_producer"])
    url = reverse("api:v1:producer-detail", args=[producer.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_producer_v1_all_endpoint__with_perms_returns_200(auth_client_with_perm):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_producer"])
    url = reverse("api:v1:producer-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
