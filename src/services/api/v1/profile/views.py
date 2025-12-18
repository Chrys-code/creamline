from django.shortcuts import get_object_or_404

from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from api.v1.profile import serializers

from apps.users.features.profiles.models import Profile


class ProfileDetailView(RetrieveUpdateAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "uuid"

    def get_object(self):
        return get_object_or_404(
            Profile, user=self.request.user, deleted_at__isnull=True
        )


class ProfilePreviewView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProfilePreviewSerializer
    lookup_field = "uuid"

    def get_object(self):
        user_uuid = self.request.GET.get("uuid")

        return get_object_or_404(Profile, user__uuid=user_uuid)
