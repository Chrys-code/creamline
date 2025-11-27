from rest_framework import serializers

from apps.product_definitions.models import ProductDefinition


class ProductDefinitionReadSerializer(serializers.ModelSerializer):
    type_label = serializers.SerializerMethodField()

    class Meta:
        model = ProductDefinition
        fields = ["uuid", "name", "type", "type_label", "created_at", "updated_at"]

    def get_type_label(self, obj):
        return obj.get_type_display()


class ProductDefinitionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDefinition
        fields = ["uuid", "name", "type"]
