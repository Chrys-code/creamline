from rest_framework import serializers

from apps.storages.features.storage_types.common.translation_keys import (
    TRANSLATION_KEYS,
)
from apps.storages.features.storage_types.models import StorageType
from apps.storages.models import Storage
from apps.storages.use_cases.create import create_storage
from apps.storages.use_cases.update import update_storage


class StorageReadSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    type_uuid = serializers.SerializerMethodField()

    class Meta:
        model = Storage
        fields = ["uuid", "name", "type", "type_uuid", "created_at", "updated_at"]

    def get_type_uuid(self, obj):
        if obj.type:
            return obj.type.uuid
        return None

    def get_type(self, obj):
        if obj.type:
            return TRANSLATION_KEYS[obj.type.code_name]
        return None


class StorageWriteSerializer(serializers.ModelSerializer):
    type = serializers.SlugRelatedField(
        slug_field="uuid", queryset=StorageType.objects.all(), write_only=True
    )

    class Meta:
        model = Storage
        fields = ["name", "type"]

    def create(self, validated_data):
        name = validated_data["name"]
        type = validated_data["type"]

        producer = create_storage(
            name=name, type=type, created_by=self.context["request"].user
        )
        return producer

    def update(self, instance, validated_data):
        name = validated_data.get("name", None)
        type = validated_data.get("type", None)

        profile = update_storage(instance=instance, name=name, type=type)
        return profile
