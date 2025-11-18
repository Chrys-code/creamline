from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework import serializers

from profiles.models import Profile
from profiles.use_cases.create import create_profile
from profiles.use_cases.update import update_profile
from user_groups.use_cases.set_groups import set_user_groups


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
        groups = validated_data.pop("groups", [])
        password = validated_data.pop("password", None)

        profile = validated_data.pop("profile")
        email = validated_data["email"]
        first_name = profile.get("first_name", "")
        last_name = profile.get("last_name", "")

        user = User(
            email=validated_data["email"],
            password=password,
            is_staff=False,
            is_active=True,
        )

        user.set_password(password)
        user.save()

        if groups:
            set_user_groups(user=user, group_ids=[g.id for g in groups])

        profile_data = {
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
        }

        create_profile(
            validated_data=profile_data,
            user=user,
            created_by=self.context["request"].user,
        )

        return user

    def update(self, instance, validated_data):
        # Remove email to prevent updates
        _email = validated_data.pop("email")
        groups = validated_data.pop("groups", None)
        password = validated_data.pop("password", None)
        profile_data = validated_data.pop("profile")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)
        instance.save()

        if groups is not None:
            set_user_groups(user=instance, group_ids=[g.id for g in groups])

        profile = Profile.objects.filter(user=instance).first()

        if profile:
            profile_data = {
                "first_name": profile_data.get("first_name", profile.first_name),
                "last_name": profile_data.get("last_name", profile.last_name),
            }

            update_profile(instance=profile, validated_data=profile_data)

        return instance
