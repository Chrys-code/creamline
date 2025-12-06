import pytest

from django.contrib.auth.models import Group

from apps.users.features.user_groups.models import GroupMetadata


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
