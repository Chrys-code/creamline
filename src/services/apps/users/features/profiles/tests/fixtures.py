import pytest

from apps.users.features.profiles.models import Profile


@pytest.fixture
def profile(test_user):
    created = Profile.objects.create(
        user=test_user,
        email=test_user.email,
        profile_image=None,
        first_name="Test",
        last_name="User",
        created_by=test_user,
    )

    return created


@pytest.fixture
def profile_payload():
    return {
        "profile_image": None,
        "first_name": "Test_Payload",
        "last_name": "User_Payload",
    }
