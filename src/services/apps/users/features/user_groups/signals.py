from django.db.models.signals import post_migrate
from django.contrib.auth.models import Group, Permission
from apps.users.features.user_groups.constants import GROUPS_AND_PERMISSIONS
from apps.users.features.user_groups.models import GroupMetadata


def create_groups_and_assign_permissions(sender, **kwargs):
    for (code_name, name), permission_codenames in GROUPS_AND_PERMISSIONS.items():
        group, _ = Group.objects.get_or_create(name=name)
        GroupMetadata.objects.get_or_create(
            group=group, code_name=code_name, display_name=name
        )

        perms = Permission.objects.filter(codename__in=permission_codenames)
        group.permissions.set(perms)


post_migrate.connect(create_groups_and_assign_permissions)
