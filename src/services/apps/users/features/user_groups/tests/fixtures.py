import pytest

from django.contrib.auth.models import Group, Permission

from apps.users.models import CustomUser
from apps.users.features.user_groups.constants import GROUPS_AND_PERMISSIONS
from apps.users.features.user_groups.models import GroupMetadata


@pytest.fixture
def setup_groups(db):
    for (code_name, name), permission_codenames in GROUPS_AND_PERMISSIONS.items():
        group, _ = Group.objects.get_or_create(name=name)
        GroupMetadata.objects.get_or_create(
            group=group, code_name=code_name, display_name=name
        )

        perms = Permission.objects.filter(codename__in=permission_codenames)
        group.permissions.set(perms)


@pytest.fixture
def create_group_user(setup_groups, db):
    """
    Factory fixture to create a user and assign a group.
    Usage:
        user = create_group_user('Manager', email='manager@test.com')
    """

    def _create(group_name, email, password="testpass123"):
        group = Group.objects.get(name=group_name)
        user = CustomUser.objects.create_user(email=email, password=password)  # type: ignore[attr-defined]
        user.groups.add(group)
        user.save()
        return user

    return _create


@pytest.fixture
def user_groups(db):
    # Create groups
    g1 = Group.objects.create(name="Group A")
    g2 = Group.objects.create(name="Group B")
    g3 = Group.objects.create(name="Group C")

    # Assing group metadata
    gm1 = GroupMetadata.objects.create(
        group=g1, display_name="Group A", code_name="Group A"
    )
    gm2 = GroupMetadata.objects.create(
        group=g2, display_name="Group B", code_name="Group B"
    )
    gm3 = GroupMetadata.objects.create(
        group=g3, display_name="Group C", code_name="Group C"
    )

    return g1, g2, g3, gm1, gm2, gm3


@pytest.fixture
def manager_group(db):
    mg = Group.objects.create(name="Manager")

    mgmeta = GroupMetadata.objects.create(
        group=mg, display_name="Manager", code_name="manager"
    )

    return mg, mgmeta


@pytest.fixture
def owner_group(db):
    og = Group.objects.create(name="Owner")

    ogMeta = GroupMetadata.objects.create(
        group=og, display_name="Owner", code_name="owner"
    )

    return og, ogMeta
