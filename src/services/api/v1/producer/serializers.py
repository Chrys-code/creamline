from rest_framework import serializers

from producers.models import Producer
from producers.use_cases.create import create_producer
from producers.use_cases.update import update_producer


class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = [
            "uuid", 
            "name", 
            "address", 
            "contact_email",

            "created_at", 
            "updated_at", 
            "deleted_at"
        ]

    def create(self, validated_data):
        producer = create_producer(validated_data=validated_data, created_by=self.context["request"].user)
        return producer
    
    def update(self, instance, validated_data):
        profile = update_producer(instance=instance, validated_data=validated_data)
        return profile

        