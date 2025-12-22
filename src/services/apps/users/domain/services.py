from typing import TYPE_CHECKING, TypedDict, List
from uuid import UUID

from django.db import transaction

from apps.users.domain.invariants import (
    cannot_assign_equal_or_greater_permission_than_self,
    cannot_modify_user_with_equal_or_higher_permissions,
    cannot_set_permissions_to_empty_list,
)
from apps.users.features.profiles.use_cases.create_profile import create_profile
from apps.users.features.profiles.use_cases.update_profile import update_profile
from apps.users.features.user_groups.models import GroupMetadata
from apps.users.features.user_groups.use_cases.set_groups import set_user_groups
from apps.users.use_cases.create_user import create_user
from apps.users.use_cases.deactivate_user import deactivate_user
from apps.users.use_cases.update_user import update_user


if TYPE_CHECKING:
    from ..models import CustomUser


class UserData(TypedDict):
    email: str
    password: str


class ProfileData(TypedDict):
    email: str
    profile_image: str | None
    first_name: str
    last_name: str


class UserService:
    """
    Service layer responsible for orchestrating user-related operations across
    multiple subdomains of User, including account creation, profile setup, and group assignment.

    This service enforces domain invariants (e.g., RBAC rules) before delegating
    to subdomain use cases, ensuring consistent and safe workflows.

    Attributes:
        create_user_uc: Callable responsible for creating User accounts.
        create_profile_uc: Callable responsible for creating User profiles.
        assign_user_groups_uc: Callable responsible for assigning User groups/roles.

    Notes:
        - This service method is typically wrapped in a transaction to ensure atomicity.
        - Domain errors (e.g., RoleAssignmentError) are raised before any database writes
            if business rules are violated.
        - The subdomain use cases are designed to handle CRUD operations and are reused
            internally by the service.
    """

    def __init__(
        self,
        create_user_uc=None,
        update_user_uc=None,
        create_profile_uc=None,
        update_profile_uc=None,
        deactivate_user_uc=None,
        assign_user_groups_uc=None,
    ):
        self.create_user_uc = create_user_uc or create_user
        self.update_user_uc = update_user_uc or update_user
        self.create_profile_uc = create_profile_uc or create_profile
        self.update_profile_uc = update_profile_uc or update_profile
        self.deactivate_user_uc = deactivate_user_uc or deactivate_user
        self.assign_user_groups_uc = assign_user_groups_uc or set_user_groups

    @transaction.atomic
    def create_user(
        self,
        user_data: UserData,
        profile_data: ProfileData,
        user_group_uuids: List[UUID],
        created_by: "CustomUser",
    ):
        """
        Orchestrates the creation of a new user, including account, profile, and group assignment.

        This method performs the following steps:
            1. Validates that the acting user (`created_by`) is permitted to assign the requested groups.
            2. Creates the user account.
            3. Creates the associated user profile.
            4. Assigns the requested groups to the user.

        :param self: UserService
        :param user_data: Dictionary containing account details (email, password)
        :type user_data: UserData
        :param profile_data: Dictionary containing profile details
        :type profile_data: ProfileData
        :param user_group_uuids: List of UUIDs of GroupMetadata to assign to the user.
        :type user_group_uuids: List[UUID]
        :param created_by: The acting user
        :type created_by: "CustomUser"

        Returns:
            CustomUser: The newly created user instance.

        Raises:
            RoleAssignmentError: If the acting user attempts to assign roles beyond their permissions.
            ValueError: If any provided group UUIDs do not exist.
        """

        group_metadatas = GroupMetadata.objects.all()

        assigner_groups_metas = group_metadatas.filter(
            group__in=created_by.groups.all()
        )
        assigner_group_codes = [gm.code_name for gm in assigner_groups_metas]

        target_group_metas = group_metadatas.filter(uuid__in=user_group_uuids)
        target_group_codes = [gm.code_name for gm in target_group_metas]

        cannot_set_permissions_to_empty_list(target_user_groups=target_group_codes)

        cannot_assign_equal_or_greater_permission_than_self(
            assigner_user_groups=assigner_group_codes,
            target_user_groups=target_group_codes,
        )

        user = self.create_user_uc(
            email=user_data["email"], password=user_data["password"]
        )
        self.create_profile_uc(
            user=user,
            email=profile_data["email"],
            profile_image=profile_data["profile_image"],
            first_name=profile_data["first_name"],
            last_name=profile_data["last_name"],
        )
        self.assign_user_groups_uc(user=user, group_metadata_uuids=user_group_uuids)

        return user

    @transaction.atomic
    def update_user(
        self,
        user: "CustomUser",
        user_email: str,
        profile_data: ProfileData,
        user_group_uuids: List[UUID],
        updated_by: "CustomUser",
    ):
        """
        Orchestrates the update of an existing user, including account, profile, and group assignment.

          This method performs the following steps:
            1. Validates that the acting user (`updated_by`) is permitted to alter the requested user.
            1. Validates that the acting user (`updated_by`) is permitted to assign the requested groups.
            2. Updates the user account.
            3. Updates the associated user profile.
            4. Assigns the requested groups to the user.

        :param self: Description
        :param user: The requested user to update
        :type user: "CustomUser"
        :param user_email: String containing user email
        :type user_email: str
        :param profile_data: Dictionary containing profile details
        :type profile_data: ProfileData
        :param user_group_uuids: List of UUIDs of GroupMetadata to assign to the user
        :type user_group_uuids: List[UUID]
        :param updated_by: The acting user
        :type updated_by: "CustomUser"

        Returns:
            CustomUser: The newly created user instance.

        Raises:
            RoleAssignmentError: If the acting user attempts to assign roles beyond their permissions.
            ValueError: If any provided group UUIDs do not exist.
        """

        group_metadatas = GroupMetadata.objects.all()

        assigner_groups_metas = group_metadatas.filter(
            group__in=updated_by.groups.all()
        )
        assigner_group_codes = [gm.code_name for gm in assigner_groups_metas]

        target_user_group_metas = group_metadatas.filter(group__in=user.groups.all())
        target_user_group_codes = [gm.code_name for gm in target_user_group_metas]

        cannot_modify_user_with_equal_or_higher_permissions(
            acting_user_user_groups=assigner_group_codes,
            target_user_user_groups=target_user_group_codes,
        )

        target_group_metas = group_metadatas.filter(uuid__in=user_group_uuids)
        target_group_codes = [gm.code_name for gm in target_group_metas]

        cannot_set_permissions_to_empty_list(target_user_groups=target_group_codes)

        cannot_assign_equal_or_greater_permission_than_self(
            assigner_user_groups=assigner_group_codes,
            target_user_groups=target_group_codes,
        )

        updated_user = self.update_user_uc(instance=user, email=user_email)
        self.update_profile_uc(
            instance=user.profile,
            email=user_email,
            profile_image=profile_data["profile_image"],
            first_name=profile_data["first_name"],
            last_name=profile_data["last_name"],
        )
        self.assign_user_groups_uc(
            user=updated_user, group_metadata_uuids=user_group_uuids
        )

        return user

    def deactivate_user(self, user: "CustomUser", updated_by: "CustomUser") -> None:
        """
        Used to deactviate the user
        """

        group_metadatas = GroupMetadata.objects.all()

        assigner_groups_metas = group_metadatas.filter(
            group__in=updated_by.groups.all()
        )
        assigner_group_codes = [gm.code_name for gm in assigner_groups_metas]

        target_user_group_metas = group_metadatas.filter(group__in=user.groups.all())
        target_user_group_codes = [gm.code_name for gm in target_user_group_metas]

        cannot_modify_user_with_equal_or_higher_permissions(
            acting_user_user_groups=assigner_group_codes,
            target_user_user_groups=target_user_group_codes,
        )

        self.deactivate_user_uc(user)
