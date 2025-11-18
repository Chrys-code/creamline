from rest_framework import serializers

from pasteurs.models import Pasteur
from pasteurs.use_cases.create import create_pasteur
from pasteurs.use_cases.update import update_pasteur


class PasteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pasteur
        fields = ["uuid", "name", "created_at", "updated_at"]

    def create(self, validated_data):
        pasteur = create_pasteur(
            validated_data=validated_data, created_by=self.context["request"].user
        )
        return pasteur

    def update(self, instance, validated_data):
        pasteur = update_pasteur(instance=instance, validated_data=validated_data)
        return pasteur
