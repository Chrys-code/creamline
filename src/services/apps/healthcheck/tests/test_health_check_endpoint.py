from rest_framework import status
from rest_framework.reverse import reverse


def test_health_check_endpoint_returns_200(api_client):
    url = reverse("api:health-check")
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
