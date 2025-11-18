from rest_framework import serializers

from apps.storages.models import Storage
from apps.producers.models import Producer

from apps.milk.models import Milk
from apps.milk.use_cases.create import create_milk
from apps.milk.use_cases.update import update_milk


class MilkSerializer(serializers.ModelSerializer):
    producer = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Producer.objects.all()
    )
    producer_uuid = serializers.CharField(required=False)
    producer_name = serializers.CharField(required=False)

    storage = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Storage.objects.all()
    )
    storage_uuid = serializers.CharField(required=False)
    storage_name = serializers.CharField(required=False)
    storage_type = serializers.CharField(required=False)

    class Meta:
        model = Milk
        fields = [
            "uuid",
            "producer",
            "producer_uuid",
            "producer_name",
            "storage",
            "storage_uuid",
            "storage_name",
            "storage_type",
            "volume_kg",
            "volume_liters",
            "acid_content",
            "aflatoxin",
            "inhibitory_residue",
            "temperature",
            "created_at",
            "updated_at",
            "deleted_at",
        ]

    def create(self, validated_data):
        milk = create_milk(
            validated_data=validated_data, created_by=self.context["request"].user
        )
        return milk

    def update(self, instance, validated_data):
        milk = update_milk(instance=instance, validated_data=validated_data)
        return milk
