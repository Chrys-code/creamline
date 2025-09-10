from django.utils.translation import gettext_lazy as _

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from api.v1.profile import serializers

from profiles.models import Profile
from profiles.use_cases.delete import delete_profile



class ProfileDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return Profile.objects.get(account_id=self.request.user, deleted_at__isnull=True)
        except Profile.DoesNotExist:
            return None
        
    def destroy(self, request, *args, **kwargs):
        profile = self.get_object()
        if profile is None:
            return Response(
                {"detail": _("Profile not found.")},
                status=status.HTTP_404_NOT_FOUND,
            )

        if profile.deleted_at is not None:
            return Response(
                {"detail": _("Profile already deleted.")},
                status=status.HTTP_400_BAD_REQUEST,
            )

        delete_profile(profile=profile, deleted_by=self.request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)