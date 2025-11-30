from rest_framework import status
from rest_framework.reverse import reverse


def test_product_definition_v1_list_endpoint_unauthenticated_client_returns_403(api_client):
    url = reverse("api:v1:product-definition-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_list_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_product_definition_v1_detail_endpoint_unauthenticated_client_returns_403(api_client, product_definition):
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_detail_endpoint_returns_200(
    authenticated_client, product_definition
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_product_definition_v1_detail_delete_endpoint_unauthenticated_client_returns_403(api_client, product_definition):
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_detail_delete_endpoint_returns_200(
    authenticated_client, product_definition
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_product_definition_v1_all_endpoint_unauthenticated_client_returns_403(api_client):
    url = reverse("api:v1:product-definition-list-no-pagination")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_all_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_product_definition_v1_types_endpoint_unauthenticated_client_returns_403(api_client):
    url = reverse("api:v1:product-definition-list-types")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_types_endpoint_returns_200(authenticated_client):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list-types")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


# Create method uses Write Serializer and responds with Read Serializer
def test_product_definition_v1_create_endpoint_returns_with_expected_data(
    authenticated_client, product_definition_payload
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-list")

    response = client.post(url, product_definition_payload)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["uuid"] is not None
    assert response.data["name"] == product_definition_payload["name"]
    assert response.data["type"] == product_definition_payload["type"]
    assert response.data["type_label"] is not None
    assert response.data["created_at"] is not None


# Update method uses Write Serializer and responds with Read Serializer
def test_product_definition_v1_update_endpoint_returns_with_expected_data(
    authenticated_client, product_definition_payload, product_definition
):
    client, _ = authenticated_client
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.patch(url, product_definition_payload)

    assert response.status_code == status.HTTP_200_OK
    assert response.data["uuid"] is not None
    assert response.data["name"] == product_definition_payload["name"]
    assert response.data["type"] == product_definition_payload["type"]
    assert response.data["type_label"] is not None
    assert response.data["created_at"] is not None
