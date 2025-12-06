import pytest

from apps.users.features.user_groups.use_cases.set_groups import set_user_groups


pytestmark = pytest.mark.django_db()


def test_set_user_group(test_user, user_groups):
    g1, g2, _, gm1, gm2, _ = user_groups

    updated_user = set_user_groups(
        user=test_user, group_metadata_uuids=[gm1.uuid, gm2.uuid]
    )

    updated_user.refresh_from_db()

    assert updated_user.groups.count() == 2
    assert set(updated_user.groups.all()) == {g1, g2}


def test_set_user_groups_overrides_existing(test_user, user_groups):
    g1, g2, g3, _, _, gm3 = user_groups

    # User initially has group1 and group2
    test_user.groups.set([g1, g2])

    # Overwrite with only group metadata 3
    set_user_groups(user=test_user, group_metadata_uuids=[gm3.uuid])

    test_user.refresh_from_db()
    assert list(test_user.groups.all()) == [g3]
