from django.shortcuts import get_object_or_404

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from api.v1.profile import serializers

from apps.profiles.models import Profile


class ProfileDetailView(RetrieveUpdateAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "uuid"

    def get_object(self):
        return get_object_or_404(
            Profile, user=self.request.user, deleted_at__isnull=True
        )
