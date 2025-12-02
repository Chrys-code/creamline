import pytest

from django.contrib.auth.models import Group


@pytest.fixture
def user_groups():
    g1 = Group.objects.create(name="Group A")
    g2 = Group.objects.create(name="Group B")
    g3 = Group.objects.create(name="Group C")

    return g1, g2, g3
