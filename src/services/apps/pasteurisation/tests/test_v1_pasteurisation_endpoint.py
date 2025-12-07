import pytest
from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()


def test_pasteurisation_v1_list_endpoint_unauthenticated_client_returns_403(
    api_client,
):
    url = reverse("api:v1:pasteurisation-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_list_endpoint_no_permissions_returns_403(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:pasteurisation-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_list_endpoint_pasteurisation_collector_group_returns_403(group_client):
    client, _ = group_client("Milk Collector", "milkcollector@milkcollector.com")
    url = reverse("api:v1:pasteurisation-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_pasteurisation_v1_list_endpoint_manager_group_returns_200(group_client):
    client, _ = group_client("Manager", "manager@manager.com")
    url = reverse("api:v1:pasteurisation-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_pasteurisation_v1_list_endpoint_pasteuriser_group_returns_200(group_client):
    client, _ = group_client("Pasteuriser", "pasteuriser@pasteuriser.com")
    url = reverse("api:v1:pasteurisation-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
