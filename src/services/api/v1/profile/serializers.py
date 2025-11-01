from rest_framework import serializers

from profiles.models import Profile
from profiles.use_cases.update import update_profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "uuid",
            "email",
            "profile_image", 
            "first_name", 
            "last_name",

            "created_at", 
            "updated_at", 
            "deleted_at"
        ]

    def update(self, instance, validated_data):
        profile = update_profile(instance=instance, validated_data=validated_data)
        return profile
