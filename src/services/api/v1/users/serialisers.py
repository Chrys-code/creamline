from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework import serializers

from profiles.models import Profile
from profiles.use_cases.create import create_profile
from profiles.use_cases.update import update_profile


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["first_name", "last_name"]


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Group.objects.all()
    )
    password = serializers.CharField(write_only=True, required=True)
    is_staff = serializers.BooleanField(read_only=True)
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = [
            "uuid", 
            "email", 
            "password", 
            "groups", 
            "is_active", 
            "is_staff",
            "profile"
        ]

    def create(self, validated_data):
        groups = validated_data.pop("groups", [])
        password = validated_data.pop("password", None)

        profile = validated_data.pop("profile")
        first_name = profile.get("first_name", "")
        last_name = profile.get("last_name", "")

        user = User(email=validated_data["email"], password=password, is_staff=False, is_active=True)

        user.set_password(password)
        user.save()
        user.groups.set(groups)

        profile_data = {
            "first_name": first_name,
            "last_name": last_name
        }

        create_profile(validated_data=profile_data, user=user, created_by=self.context["request"].user)

        return user


    def update(self, instance, validated_data):
        groups = validated_data.pop("groups", None)
        password = validated_data.pop("password", None)
        profile_data = validated_data.pop("profile")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)
        instance.save()

        if groups is not None:
            instance.groups.set(groups)

        profile = Profile.objects.filter(user=instance).first()

        if profile:
            profile_data = {
                "first_name": profile_data.get("first_name", profile.first_name),
                "last_name": profile_data.get("last_name", profile.last_name)
            }

            update_profile(instance=profile, validated_data=profile_data)

        return instance
