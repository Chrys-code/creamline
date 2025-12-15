import pytest

from django.utils.translation import override

from rest_framework import status
from rest_framework.reverse import reverse

pytestmark = pytest.mark.django_db()

def test_login_no_account_returns_message(api_client):
    credentials = {
        "email": "manager@manager.com",
        "password": "testpass123"
    }
    url = reverse("api:login")

    with override("hu"):
        response = api_client.post(url, credentials)
        
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.data == {"message": "Érvénytelen hitelesítő adatok"}


def test_login_success(api_client, test_user):
    credentials = {"email": "testuser@testuser.com", "password": "testpass123"}
    url = reverse("api:login")

    with override("hu"):
        response = api_client.post(url, credentials)

    assert response.status_code == status.HTTP_200_OK

    # User now is authenticated
    url = reverse("api:session")
    response = api_client.get(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_logout(api_client, test_user):
    api_client.force_login(test_user)
    url = reverse("api:logout")

    response = api_client.post(url)
    assert response.status_code == status.HTTP_200_OK

    # User is now logged out
    url = reverse("api:session")
    response = api_client.get(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN