from rest_framework import serializers

from storages.models import Storage
from storages.use_cases.create import create_storage
from storages.use_cases.update import update_storage


class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ["uuid", "name", "type", "created_at", "updated_at", "deleted_at"]

    def create(self, validated_data):
        producer = create_storage(
            validated_data=validated_data, created_by=self.context["request"].user
        )
        return producer

    def update(self, instance, validated_data):
        profile = update_storage(instance=instance, validated_data=validated_data)
        return profile
