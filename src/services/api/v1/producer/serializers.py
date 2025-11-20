from rest_framework import serializers

from apps.producers.models import Producer
from apps.producers.use_cases.create import create_producer
from apps.producers.use_cases.update import update_producer


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
            "deleted_at",
        ]

    def create(self, validated_data):
        name=validated_data["name"]
        address=validated_data["address"]
        contact_email=validated_data.get("contact_email", None)

        producer = create_producer(
            name=name,
            address=address,
            contact_email=contact_email,
            created_by=self.context["request"].user,
        )
        return producer

    def update(self, instance, validated_data):
        name=validated_data.get("name", None)
        address=validated_data.get("address", None)
        contact_email=validated_data.get("contact_email", None)

        profile = update_producer(
            instance=instance,
            name=name,
            address=address,
            contact_email=contact_email,
        )

        return profile
