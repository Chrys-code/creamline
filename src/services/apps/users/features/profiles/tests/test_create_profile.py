import pytest

from apps.users.features.profiles.models import Profile
from apps.users.features.profiles.use_cases.create_profile import create_profile

pytestmark = pytest.mark.django_db()


def test_create_profile_saves(test_user, profile_payload):
    created = create_profile(
        profile_image=None,
        email=test_user.email,
        first_name=profile_payload["first_name"],
        last_name=profile_payload["last_name"],
        user=test_user,
    )
    db_instance = Profile.objects.get(uuid=created.uuid)

    assert isinstance(created, Profile)
    assert db_instance.profile_image == None
    assert db_instance.email == test_user.email
    assert db_instance.first_name == profile_payload["first_name"]
    assert db_instance.last_name == profile_payload["last_name"]
    assert db_instance.user == test_user


def test_create_profile_missing_profile_image_saves(test_user, profile_payload):
    created = create_profile(
        profile_image=None,
        email=test_user.email,
        first_name=profile_payload["first_name"],
        last_name=profile_payload["last_name"],
        user=test_user,
    )
    db_instance = Profile.objects.get(uuid=created.uuid)

    assert isinstance(created, Profile)
    assert db_instance.profile_image == None
    assert db_instance.email == test_user.email
    assert db_instance.first_name == profile_payload["first_name"]
    assert db_instance.last_name == profile_payload["last_name"]
    assert db_instance.user == test_user
