from rest_framework import serializers

from apps.pasteurs.models import Pasteur
from apps.pasteurs.use_cases.create import create_pasteur
from apps.pasteurs.use_cases.update import update_pasteur


class PasteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pasteur
        fields = ["uuid", "name", "created_at", "updated_at"]

    def create(self, validated_data):
        name = validated_data["name"]

        pasteur = create_pasteur(
            name=name, created_by=self.context["request"].user
        )
        return pasteur

    def update(self, instance, validated_data):
        name = validated_data.get("name", None)

        pasteur = update_pasteur(instance=instance, name=name)
        return pasteur
