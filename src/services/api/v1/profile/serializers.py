from rest_framework import serializers

from profiles.models import Profile
from profiles.use_cases.create import create_profile
from profiles.use_cases.update import update_profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["uuid", "email", "profile_image", "first_name", "last_name"]

    def create(self, validated_data):
        profile = create_profile(validated_data=validated_data)
        return profile
    
    def update(self, instance, validated_data):
        profile = update_profile(profile=instance, validated_data=validated_data)
        return profile

        