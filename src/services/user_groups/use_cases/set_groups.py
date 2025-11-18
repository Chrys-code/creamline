from typing import TYPE_CHECKING
from django.contrib.auth.models import Group

if TYPE_CHECKING:
    from users.models import CustomUser


def set_user_groups(user: "CustomUser", group_ids: list[str]):
    """
    Overwrite user's group membership.
    """
    groups = Group.objects.filter(id__in=group_ids)
    user.groups.set(groups)
    user.save()
    
    return user
