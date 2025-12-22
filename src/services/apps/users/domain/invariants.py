from typing import List
from django.utils.translation import gettext_lazy

from apps.users.domain.errors import MissingRolesError, RoleAssignmentError
from apps.users.features.user_groups.constants import PERMISSION_LEVELS


def cannot_set_permissions_to_empty_list(target_user_groups: List[str]) -> None:
    """
    Used to prevent user creation or update without assigning roles to them.

    :param target_user_groups: Target user group code names
    :type target_user_groups: List[str]

    Returns:
        None or Throws
    """
    if not target_user_groups:
        raise MissingRolesError(gettext_lazy("Users must have permissions"))


def cannot_assign_equal_or_greater_permission_than_self(
    assigner_user_groups: List[str], target_user_groups: List[str]
) -> None:
    """
    Used to prevent users from assigning roles with higher level that their own.

    :param assigner_user_groups: Assigner user group code names
    :type assigner_user_groups: List[str]
    :param target_user_groups: Target user group code names
    :type target_user_groups: List[str]

    Returns:
        None or Throws
    """
    if not target_user_groups:
        return

    assigner_levels = [PERMISSION_LEVELS.get(g, 0) for g in assigner_user_groups]
    target_levels = [PERMISSION_LEVELS.get(g, 0) for g in target_user_groups]

    if not assigner_levels:
        assigner_levels = [0]

    if not target_levels:
        target_levels = [0]

    if max(target_levels) == max(assigner_levels):
        raise RoleAssignmentError(
            gettext_lazy("Cannot assign a role equal to your highest permission")
        )

    if max(target_levels) > max(assigner_levels):
        raise RoleAssignmentError(
            gettext_lazy("Cannot assign a role greater to your highest permission")
        )


def cannot_modify_user_with_equal_or_higher_permissions(
    acting_user_user_groups: List[str], target_user_user_groups: List[str]
):
    """
    Used to prevent users from changing users on higher level that their own.

    :param assigner_user_groups: Assigner user group code names
    :type assigner_user_groups: List[str]
    :param target_user_groups: Target user group code names
    :type target_user_groups: List[str]

    Returns:
        None or Throws
    """
    acting_user_levels = [PERMISSION_LEVELS.get(g, 0) for g in acting_user_user_groups]
    target_user_levels = [PERMISSION_LEVELS.get(g, 0) for g in target_user_user_groups]

    if not acting_user_levels:
        acting_user_levels = [0]

    if not target_user_levels:
        target_user_levels = [0]

    if max(target_user_levels) >= max(acting_user_levels):
        raise RoleAssignmentError(gettext_lazy("Cannot modify user with higher role"))
