from django.contrib.auth import get_user_model

from rest_framework import serializers

from apps.users.domain.errors import RoleAssignmentError
from apps.users.domain.services import ProfileData, UserData, UserService
from apps.users.features.profiles.models import Profile
from apps.users.features.user_groups.models import GroupMetadata


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
        try:
            email = validated_data.pop("email")
            password = validated_data.pop("password")
            profile = validated_data.pop("profile")
            group_metadata_uuids = validated_data.pop("groups", [])

            user_data: UserData = {"email": email, "password": password}

            profile_data: ProfileData = {
                "email": email,
                "profile_image": None,
                "first_name": profile["first_name"],
                "last_name": profile["last_name"],
            }

            user_service = UserService()
            created_user = user_service.create_user(
                user_data=user_data,
                profile_data=profile_data,
                user_group_uuids=group_metadata_uuids,
                created_by=self.context["request"].user,
            )

            return created_user

        except RoleAssignmentError as e:
            raise serializers.ValidationError({"detail": str(e)})

    def update(self, instance, validated_data):
        try:
            email = validated_data.pop("email")
            profile = validated_data.pop("profile")
            group_metadata_uuids = validated_data.pop("groups", [])

            profile_data: ProfileData = {
                "email": email,
                "profile_image": None,
                "first_name": profile["first_name"],
                "last_name": profile["last_name"],
            }

            user_service = UserService()
            updated_user = user_service.update_user(
                user=instance,
                user_email=email,
                profile_data=profile_data,
                user_group_uuids=group_metadata_uuids,
                updated_by=self.context["request"].user,
            )

            return updated_user

        except RoleAssignmentError as e:
            raise serializers.ValidationError({"detail": str(e)})
