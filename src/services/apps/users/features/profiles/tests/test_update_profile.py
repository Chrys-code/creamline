import pytest

from apps.users.features.profiles.models import Profile
from apps.users.features.profiles.use_cases.update_profile import update_profile

pytestmark = pytest.mark.django_db()


def test_update_profile_saves(profile, profile_payload, test_user):
    original_first_name = profile.first_name
    original_last_name = profile.last_name

    updated = update_profile(
        instance=profile,
        email=test_user.email,
        profile_image=None,
        first_name=profile_payload["first_name"],
        last_name=profile_payload["last_name"],
    )
    db_instance = Profile.objects.get(uuid=updated.uuid)

    assert isinstance(updated, Profile)
    assert db_instance.first_name != original_first_name
    assert db_instance.last_name != original_last_name
    assert db_instance.first_name == profile_payload["first_name"]
    assert db_instance.last_name == profile_payload["last_name"]
