# user_groups/migrations/0002_group_metadata.py
from django.db import migrations


def create_group_metadata(apps, _schema_editor):
    Group = apps.get_model("auth", "Group")
    GroupMetadata = apps.get_model("user_groups", "GroupMetadata")

    from apps.users.features.user_groups.common.constants import USER_GROUP_CHOICES

    for code_name, name in USER_GROUP_CHOICES:
        group, _ = Group.objects.get_or_create(name=name)
        GroupMetadata.objects.get_or_create(
            group=group, code_name=code_name, display_name=name
        )


class Migration(migrations.Migration):
    dependencies = [
        ("user_groups", "0001_initial"),
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.RunPython(create_group_metadata),
    ]
