from rest_framework import status
from rest_framework.reverse import reverse


def test_product_definition_v1_list_endpoint_unauthenticated_returns_403(
    api_client,
):
    url = reverse("api:v1:product-definition-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_detail_endpoint_unauthenticated_returns_403(
    api_client, product_definition
):
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_create_endpoint_unauthenticated_returns_403(
    api_client, producer_payload
):
    url = reverse("api:v1:product-definition-list")

    response = api_client.post(url, producer_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_update_endpoint_unauthenticated_returns_403(
    api_client, product_definition, product_definition_payload
):
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = api_client.patch(url, product_definition_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_delete_endpoint_unauthenticated_returns_403(
    api_client, product_definition
):
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_all_endpoint_unauthenticated_returns_403(
    api_client,
):
    url = reverse("api:v1:product-definition-list-no-pagination")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_product_definition_v1_types_endpoint_unauthenticated_returns_403(
    api_client,
):
    url = reverse("api:v1:product-definition-list-types")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
