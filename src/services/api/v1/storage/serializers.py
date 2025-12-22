from rest_framework import serializers

from apps.storages.models import Storage
from apps.storages.use_cases.create_storage import create_storage
from apps.storages.use_cases.update_storage import update_storage


class StorageReadSerializer(serializers.ModelSerializer):
    type_label = serializers.SerializerMethodField()

    class Meta:
        model = Storage
        fields = ["uuid", "name", "type", "type_label", "created_at", "updated_at"]

    def get_type_label(self, obj):
        return obj.get_type_display()


class StorageWriteSerializer(serializers.ModelSerializer):
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
