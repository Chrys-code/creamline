from django.apps import AppConfig


class UserGroupsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.users.features.user_groups"

    def ready(self):
        # Register signals
        import apps.users.features.user_groups.signals  # pylint: disable=unused-import, import-outside-toplevel
