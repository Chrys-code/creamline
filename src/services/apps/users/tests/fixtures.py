import pytest


@pytest.fixture
def create_user_payload():
    return {
        "profile.first_name": "Test",
        "profile.last_name": "User",
        "email": "test@user.com",
        "password": "testpass123",
        "groups": [],
    }


@pytest.fixture
def update_user_payload():
    return {
        "profile.first_name": "Test Edited",
        "profile.last_name": "User Edited",
        "email": "test@user.com",
        "groups": [],
    }
