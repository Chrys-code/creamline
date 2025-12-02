import pytest

from apps.users.features.user_groups.use_cases.set_groups import set_user_groups


pytestmark = pytest.mark.django_db()


def test_set_user_group(test_user, user_groups):
    g1, g2, _ = user_groups

    # Call the method under test
    updated_user = set_user_groups(user=test_user, group_ids=[g1.id, g2.id])

    # Refresh from database
    updated_user.refresh_from_db()

    # Assertions
    assert updated_user.groups.count() == 2
    assert set(updated_user.groups.all()) == {g1, g2}


def test_set_user_groups_overwrites_existing(test_user, user_groups):
    g1, g2, g3 = user_groups

    # User initially has g1 and g2
    test_user.groups.set([g1, g2])

    # Call the function to overwrite with only g3
    set_user_groups(test_user, [g3.id])

    test_user.refresh_from_db()
    assert list(test_user.groups.all()) == [g3]
