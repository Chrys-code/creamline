from django.contrib.auth import get_user_model

from rest_framework import serializers

from apps.users.features.profiles.models import Profile
from apps.users.features.user_groups.models import GroupMetadata
from apps.users.use_cases.create import create_user_workflow
from apps.users.use_cases.update import update_user_workflow


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["first_name", "last_name"]


class UserReadSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField()
    profile = ProfileSerializer()

    groups = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "uuid",
            "email",
            "is_active",
            "is_staff",
            "profile",
            "groups",
        ]

    def get_groups(self, obj):
        groups = obj.groups.all()
        group_metadatas = GroupMetadata.objects.all()

        return [meta.uuid for meta in group_metadatas.filter(group__in=groups)]


class UserWriteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True)
    profile = ProfileSerializer()

    groups = serializers.ListField(
        child=serializers.UUIDField(),
        required=False,
        help_text="List of GroupMetadata UUIDs",
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

        group_metadata_uuids = validated_data.pop("groups", [])

        created_user = create_user_workflow(
            email=email,
            password=password,
            profile_image=None,
            first_name=first_name,
            last_name=last_name,
            group_metadata_uuids=group_metadata_uuids,
        )

        return created_user

    def update(self, instance, validated_data):
        email = validated_data.pop("email")
        group_metadata_uuids = validated_data.pop("groups", [])
        profile_data = validated_data.pop("profile")
        first_name = profile_data["first_name"]
        last_name = profile_data["last_name"]

        update_user_workflow(
            user=instance,
            email=email,
            first_name=first_name,
            last_name=last_name,
            group_metadata_uuids=group_metadata_uuids,
        )

        return instance
