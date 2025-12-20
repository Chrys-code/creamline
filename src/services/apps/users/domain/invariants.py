from typing import List
from django.utils.translation import gettext_lazy

from apps.users.domain.errors import RoleAssignmentError
from apps.users.features.user_groups.constants import PERMISSION_LEVELS


def cannot_assign_equal_or_greater_permission_than_self(
    assigner_user_groups: List[str], target_user_groups: List[str]
):
    """
    Used to prevent users from assigning roles with higher level that their own.

    :param assigner_user_groups: Assigner user group code names
    :type assigner_user_groups: List[str]
    :param target_user_groups: Target user group code names
    :type target_user_groups: List[str]

    Returns:
        Void or throws
    """
    if not target_user_groups:
        return

    assigner_levels = [PERMISSION_LEVELS.get(g, 0) for g in assigner_user_groups]
    target_levels = [PERMISSION_LEVELS.get(g, 0) for g in target_user_groups]

    if max(target_levels) == max(assigner_levels):
        raise RoleAssignmentError(
            gettext_lazy("Cannot assign a role equal to your highest permission")
        )

    if max(target_levels) > max(assigner_levels):
        raise RoleAssignmentError(
            gettext_lazy("Cannot assign a role greater to your highest permission")
        )


def cannot_alter_permissions_of_user_with_equal_or_higher_permissions_than_self(
    assigner_user_groups: List[str],
    target_user_groups: List[str],
):
    assigner_levels = [PERMISSION_LEVELS.get(g, 0) for g in assigner_user_groups]
    target_user_levels = [PERMISSION_LEVELS.get(g, 0) for g in target_user_groups]

    if max(target_user_levels) >= max(assigner_levels):
        raise RoleAssignmentError(
            gettext_lazy("Cannot alter role of a user with equal or higher permissions")
        )
