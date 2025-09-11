from rest_framework import serializers

from producers.models import Producer

from milk.models import Milk
from milk.use_cases.create import create_milk
from milk.use_cases.update import update_milk


class MilkSerializer(serializers.ModelSerializer):
    producer = serializers.SlugRelatedField(
        slug_field="uuid",
        queryset=Producer.objects.all()
    )
     
    class Meta:
        model = Milk
        fields = [
            "uuid", 
            "producer", 
            "volume_kg", 
            "volume_liters",
            "acid_content",
            "aflatoxin",
            "inhibitory_residue",
            "temperature",

            "created_at", 
            "updated_at", 
            "deleted_at"
        ]

    def create(self, validated_data):
        milk = create_milk(validated_data=validated_data, created_by=self.context["request"].user)
        return milk
    
    def update(self, instance, validated_data):
        milk = update_milk(instance=instance, validated_data=validated_data)
        return milk

        