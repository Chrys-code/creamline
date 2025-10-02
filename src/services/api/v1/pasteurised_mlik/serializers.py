from rest_framework import serializers

from pasteurised_milk.models import PasteurisedMilk

class ProductDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasteurisedMilk
        fields = [
            "uuid",
            "name",
            "pasteur",
            "product_definition",
            "source_storage",
            "target_storage",
            "volume_kg",
            "volume_liters",
            "temperature",
            "start_date",
            "end_date",

            "created_at", 
            "updated_at", 
            "deleted_at"
        ]


# DEF CREATE !