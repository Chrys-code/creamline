from django.apps import AppConfig
from django.db.models.signals import post_migrate


class UserGroupsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.users.features.user_groups"

    def ready(self):
        from apps.users.features.user_groups.signals import (
            create_groups_and_assign_permissions,
        )  # pylint: disable=import-outside-toplevel

        post_migrate.connect(create_groups_and_assign_permissions, sender=self)
