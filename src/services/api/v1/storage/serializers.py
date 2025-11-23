from rest_framework import serializers

from apps.storages.models import Storage
from apps.storages.use_cases.create import create_storage
from apps.storages.use_cases.update import update_storage


class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ["uuid", "name", "type", "created_at", "updated_at"]

    def create(self, validated_data):
        name = validated_data["name"]
        storage_type = validated_data["type"]

        producer = create_storage(
            name=name, type=storage_type, created_by=self.context["request"].user
        )
        return producer

    def update(self, instance, validated_data):
        name= validated_data.get("name", None)
        storage_type = validated_data.get("type", None)

        profile = update_storage(instance=instance, name=name, type=storage_type)
        return profile
