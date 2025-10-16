from django.contrib.auth import get_user_model

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.permissions import StrictDjangoModelPermissions
from api.v1.users.serialisers import UserSerializer


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, StrictDjangoModelPermissions]
    lookup_field = "uuid"

    def get_queryset(self):
        return User.objects.all()
