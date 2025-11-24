from rest_framework import serializers

from apps.storages.features.storage_types.common.translation_keys import (
    TRANSLATION_KEYS,
)
from apps.storages.features.storage_types.models import StorageType


class StorageTypeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = StorageType
        fields = ["uuid", "code_name", "name"]

    def get_name(self, obj):
        return TRANSLATION_KEYS.get(obj.code_name, obj.code_name)
