from rest_framework import serializers

from apps.milk.use_cases.validate_milk import InvalidVolumePairError, MilkException
from apps.storages.models import Storage
from apps.producers.models import Producer

from apps.milk.models import Milk
from apps.milk.use_cases.create_milk import create_milk
from apps.milk.use_cases.update_milk import update_milk


class MilkSerializer(serializers.ModelSerializer):
    producer = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Producer.objects.all()
    )
    producer_name = serializers.CharField(source="producer.name", required=False)

    storage = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Storage.objects.all()
    )
    storage_name = serializers.CharField(source="storage.name", required=False)

    created_by = serializers.CharField(source="created_by.uuid", read_only=True)

    class Meta:
        model = Milk
        fields = [
            "uuid",
            "producer",
            "producer_name",
            "storage",
            "storage_name",
            "volume_kg",
            "volume_liters",
            "acid_content",
            "aflatoxin",
            "inhibitory_residue",
            "temperature",
            "created_by",
            "created_at",
            "updated_at",
            "deleted_at",
        ]

    def create(self, validated_data):
        try:
            milk = create_milk(
                validated_data=validated_data, created_by=self.context["request"].user
            )
            return milk
        except MilkException as e:
            if isinstance(e, InvalidVolumePairError):
                raise serializers.ValidationError({"detail": e.default_detail})


    def update(self, instance, validated_data):
        try:
            milk = update_milk(instance=instance, validated_data=validated_data)
            return milk

        except MilkException as e:
            if isinstance(e, InvalidVolumePairError):
                raise serializers.ValidationError({"detail": e.default_detail})
