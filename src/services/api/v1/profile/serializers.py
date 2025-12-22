from rest_framework import serializers

from apps.users.features.profiles.models import Profile
from apps.users.features.profiles.use_cases.update import update_profile


class ProfileSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="name", source="user.groups"
    )

    class Meta:
        model = Profile
        fields = [
            "uuid",
            "email",
            "profile_image",
            "first_name",
            "last_name",
            "groups",
            "created_at",
            "updated_at",
            "deleted_at",
        ]

    def update(self, instance, validated_data):

        email = validated_data.get("email", None)
        profile_image = validated_data.get("profile_image", None)
        first_name = validated_data.get("first_name", None)
        last_name = validated_data.get("last_name", None)

        profile = update_profile(
            instance=instance,
            email=email,
            profile_image=profile_image,
            first_name=first_name,
            last_name=last_name,
        )

        return profile


class ProfilePreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "profile_image",
            "first_name",
            "last_name",
        ]
