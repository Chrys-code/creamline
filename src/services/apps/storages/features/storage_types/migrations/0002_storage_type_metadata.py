# storage_types/migrations/0002_storage_type_metadata.py
from django.db import migrations


def create_storage_type_metadata(apps, _schema_editor):
    from apps.storages.features.storage_types.common.constants import (
        STORAGE_TYPE_CHOICES,
    )

    StorageType = apps.get_model("storage_types", "StorageType")

    for code_name, display_name in STORAGE_TYPE_CHOICES:
        StorageType.objects.update_or_create(
            code_name=code_name, defaults={"display_name": display_name}
        )


class Migration(migrations.Migration):
    dependencies = [
        ("storage_types", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_storage_type_metadata),
    ]
