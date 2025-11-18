from rest_framework import serializers

from apps.product_definitions.models import ProductDefinition


class ProductDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDefinition
        fields = ["uuid", "name", "type", "created_at", "updated_at", "deleted_at"]
