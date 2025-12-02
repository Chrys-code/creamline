import pytest

from apps.users.models import CustomUser
from apps.users.use_cases.create import create_user_workflow
from apps.users.use_cases.update import update_user_workflow

pytestmark = pytest.mark.django_db()


def test_update_user_workflow_saves(user_groups):
    g1, g2, g3 = user_groups

    user = create_user_workflow(
        email="test@user.com",
        password="password",
        profile_image=None,
        first_name="test",
        last_name="user",
        group_ids=[g1.id, g2.id],
    )

    updated_user = update_user_workflow(
        user=user,
        email="test_edited@user.com",
        first_name="test_edited",
        last_name="user_edited",
        group_ids=[g3.id],
    )

    assert isinstance(updated_user, CustomUser)
    assert updated_user.email == "test_edited@user.com"
    assert updated_user.profile.profile_image == None
    assert updated_user.profile.first_name == "test_edited"
    assert updated_user.profile.last_name == "user_edited"
    assert updated_user.groups.contains(g1) == False
    assert updated_user.groups.contains(g2) == False
    assert updated_user.groups.contains(g3) == True
