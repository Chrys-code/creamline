from rest_framework import serializers

from pasteurs.models import Pasteur

class PasteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pasteur
        fields = [
            "uuid",
            "name",

            "created_at", 
            "updated_at", 
            "deleted_at"
        ]
