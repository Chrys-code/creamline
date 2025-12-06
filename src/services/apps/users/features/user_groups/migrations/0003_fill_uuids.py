import uuid
from django.db import migrations


def generate_uuids(apps, schema_editor):
    GroupMetadata = apps.get_model("user_groups", "GroupMetadata")
    for gm in GroupMetadata.objects.all():
        if not gm.uuid:
            gm.uuid = uuid.uuid4()
            gm.save(update_fields=["uuid"])


class Migration(migrations.Migration):
    dependencies = [
        ("user_groups", "0002_groupmetadata_uuid"),
    ]

    operations = [
        migrations.RunPython(generate_uuids),
    ]
