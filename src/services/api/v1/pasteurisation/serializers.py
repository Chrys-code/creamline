from rest_framework import serializers

from apps.product_definitions.models import ProductDefinition
from apps.storages.models import Storage
from apps.pasteurs.models import Pasteur

from apps.pasteurisation.models import Pasteurisation
from apps.pasteurisation.use_cases.create import create_pasteurisation
from apps.pasteurisation.use_cases.update import update_pasteurisation


class PasteurisationSerializer(serializers.ModelSerializer):

    pasteur = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Pasteur.objects.all()
    )
    pasteur_uuid = serializers.CharField(required=False)
    pasteur_name = serializers.CharField(required=False)

    product_definition = serializers.SlugRelatedField(
        slug_field="uuid", queryset=ProductDefinition.objects.all()
    )
    product_definition_uuid = serializers.CharField(required=False)
    product_definition_name = serializers.CharField(required=False)

    source_storage = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Storage.objects.all()
    )
    source_storage_uuid = serializers.CharField(required=False)
    source_storage_name = serializers.CharField(required=False)
    source_storage_type = serializers.CharField(required=False)

    target_storage = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Storage.objects.all()
    )
    target_storage_uuid = serializers.CharField(required=False)
    target_storage_name = serializers.CharField(required=False)
    target_storage_type = serializers.CharField(required=False)

    class Meta:
        model = Pasteurisation
        fields = [
            "uuid",
            "pasteur",
            "pasteur_uuid",
            "pasteur_name",
            "product_definition",
            "product_definition_uuid",
            "product_definition_name",
            "source_storage",
            "source_storage_name",
            "source_storage_uuid",
            "source_storage_type",
            "target_storage",
            "target_storage_name",
            "target_storage_uuid",
            "target_storage_type",
            "volume_kg",
            "volume_liters",
            "temperature",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
            "deleted_at",
        ]

    def create(self, validated_data):
        pasteurisation = create_pasteurisation(
            validated_data=validated_data, created_by=self.context["request"].user
        )
        return pasteurisation

    def update(self, instance, validated_data):
        milk = update_pasteurisation(instance=instance, validated_data=validated_data)
        return milk
