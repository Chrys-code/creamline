from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework import serializers

from apps.users.features.profiles.models import Profile
from apps.users.use_cases.create import create_user_workflow
from apps.users.use_cases.update import update_user_workflow


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["first_name", "last_name"]


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    is_staff = serializers.BooleanField(read_only=True)
    profile = ProfileSerializer()
    groups = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Group.objects.all(),
    )

    class Meta:
        model = User
        fields = [
            "uuid",
            "email",
            "password",
            "is_active",
            "is_staff",
            "profile",
            "groups",
        ]

    def create(self, validated_data):
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        profile = validated_data.pop("profile")
        first_name = profile["first_name"]
        last_name = profile["last_name"]

        groups = validated_data.pop("groups", [])
        group_ids = [g.id for g in groups]

        created_user = create_user_workflow(
            email=email,
            password=password,
            profile_image=None,
            first_name=first_name,
            last_name=last_name,
            group_ids=group_ids,
        )

        return created_user

    def update(self, instance, validated_data):
        email = validated_data.pop("email")
        groups = validated_data.pop("groups", None)
        profile_data = validated_data.pop("profile")
        first_name = profile_data["first_name"]
        last_name = profile_data["last_name"]
        group_ids = []

        if groups is not None:
            group_ids = [g.id for g in groups]

        update_user_workflow(
            user=instance,
            email=email,
            first_name=first_name,
            last_name=last_name,
            group_ids=group_ids,
        )

        return instance
