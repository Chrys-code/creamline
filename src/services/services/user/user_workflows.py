from apps.profiles.use_cases.create import create_profile
from apps.profiles.use_cases.update import update_profile
from apps.users.features.user_groups.use_cases.set_groups import set_user_groups
from apps.users.use_cases.create import create_user
from apps.users.use_cases.update import update_user
from apps.users.models import CustomUser


def create_user_workflow(
    email: str,
    password: str,
    profile_image: str | None,
    first_name: str,
    last_name: str,
    group_ids: list[str],
):
    """
    Service layer orchestrating a business workflow to
    create user, assign groups and create profile
    """
    user = create_user(email=email, password=password)
    create_profile(
        profile_image=profile_image,
        email=email,
        first_name=first_name,
        last_name=last_name,
        user=user,
    )
    set_user_groups(user=user, group_ids=group_ids)

    return user


def update_user_workflow(
    user: "CustomUser",
    email: str | None,
    first_name: str | None,
    last_name: str | None,
    group_ids: list[str],
):
    """
    Service layer orchestrating a business workflow to
    update user, assign groups and update profile
    """
    updated_user = update_user(instance=user, email=email)
    update_profile(
        instance=user.profile, email=email, first_name=first_name, last_name=last_name
    )
    set_user_groups(user=updated_user, group_ids=group_ids)
