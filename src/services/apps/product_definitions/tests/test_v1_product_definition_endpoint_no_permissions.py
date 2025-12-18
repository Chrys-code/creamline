from rest_framework import status
from rest_framework.reverse import reverse


def test_product_definition_v1_list_endpoint_no_perms_returns_403(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_detail_endpoint_no_perms_returns_403(
    authenticated_client, product_definition
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


# Create method uses Write Serializer and responds with Read Serializer
def test_product_definition_v1_create_endpoint_no_perms_returns_403(
    authenticated_client, product_definition_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list")

    response = client.post(url, product_definition_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


# Update method uses Write Serializer and responds with Read Serializer
def test_product_definition_v1_update_endpoint_no_perms_returns_403(
    authenticated_client, product_definition_payload, product_definition
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.patch(url, product_definition_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_delete_endpoint_no_perms_returns_403(
    authenticated_client, product_definition
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_all_endpoint_no_perms_returns_403(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_types_endpoint_no_perms_returns_403(
    authenticated_client,
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list-types")

    response = client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
