from rest_framework import status
from rest_framework.reverse import reverse


def test_product_definition_v1_list_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_productdefinition"])
    url = reverse("api:v1:product-definition-list")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_product_definition_v1_detail_endpoint_with_perms_returns_200(
    auth_client_with_perm, product_definition
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_productdefinition"])
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


# Create method uses Write Serializer and responds with Read Serializer
def test_product_definition_v1_create_endpoint_with_perms_returns_201(
    auth_client_with_perm, product_definition_payload
):
    client, _ = auth_client_with_perm("manager@manager.com", ["add_productdefinition"])
    url = reverse("api:v1:product-definition-list")

    response = client.post(url, product_definition_payload)
    assert response.status_code == status.HTTP_201_CREATED


# Update method uses Write Serializer and responds with Read Serializer
def test_product_definition_v1_update_endpoint_with_perms_returns_200(
    auth_client_with_perm, product_definition_payload, product_definition
):
    client, _ = auth_client_with_perm(
        "manager@manager.com", ["change_productdefinition"]
    )
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.patch(url, product_definition_payload)
    assert response.status_code == status.HTTP_200_OK


def test_product_definition_v1_delete_endpoint_with_perms_returns_204(
    auth_client_with_perm, product_definition
):
    client, _ = auth_client_with_perm(
        "manager@manager.com", ["delete_productdefinition"]
    )
    url = reverse("api:v1:product-definition-detail", args=[product_definition.uuid])

    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_product_definition_v1_all_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_productdefinition"])
    url = reverse("api:v1:product-definition-list-no-pagination")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_product_definition_v1_types_endpoint_with_perms_returns_200(
    auth_client_with_perm,
):
    client, _ = auth_client_with_perm("manager@manager.com", ["view_productdefinition"])
    url = reverse("api:v1:product-definition-list-types")

    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
