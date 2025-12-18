from rest_framework import serializers

from apps.pasteurisation.use_cases.validation import (
    InvalidDatesError,
    PasteurisationException,
)
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

    product_definition = serializers.SlugRelatedField(
        slug_field="uuid", queryset=ProductDefinition.objects.all()
    )

    source_storage = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Storage.objects.all()
    )

    target_storage = serializers.SlugRelatedField(
        slug_field="uuid", queryset=Storage.objects.all()
    )

    pasteur_name = serializers.CharField(source="pasteur.name", read_only=True)
    product_definition_name = serializers.CharField(
        source="product_definition.name", read_only=True
    )
    source_storage_name = serializers.CharField(
        source="source_storage.name", read_only=True
    )
    target_storage_name = serializers.CharField(
        source="target_storage.name", read_only=True
    )
    created_by = serializers.CharField(source="created_by.uuid", read_only=True)

    class Meta:
        model = Pasteurisation
        fields = [
            "uuid",
            "pasteur",
            "product_definition",
            "source_storage",
            "target_storage",
            "pasteur_name",
            "product_definition_name",
            "source_storage_name",
            "target_storage_name",
            "volume_kg",
            "volume_liters",
            "temperature",
            "start_date",
            "end_date",
            "created_by",
            "created_at",
            "updated_at",
            "deleted_at",
        ]

    def create(self, validated_data):
        try:
            pasteurisation = create_pasteurisation(
                validated_data=validated_data, created_by=self.context["request"].user
            )

            return pasteurisation

        except PasteurisationException as e:
            if isinstance(e, InvalidDatesError):
                raise e

        except Exception as e:
            raise e

    def update(self, instance, validated_data):
        try:
            milk = update_pasteurisation(
                instance=instance, validated_data=validated_data
            )
            return milk

        except PasteurisationException as e:
            if isinstance(e, InvalidDatesError):
                raise e
