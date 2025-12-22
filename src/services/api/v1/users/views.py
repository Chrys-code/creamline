from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from api.v1.pagination import StandardPagePagination
from api.v1.permissions import StrictDjangoModelPermissions
from api.v1.users import serialisers
from apps.users.domain.errors import RoleAssignmentError
from apps.users.domain.services import UserService

from apps.users.models import CustomUser as User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, StrictDjangoModelPermissions]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    serializer_classes = {
        "list": serialisers.UserReadSerializer,
        "retrieve": serialisers.UserReadSerializer,
        "create": serialisers.UserWriteSerializer,
        "update": serialisers.UserWriteSerializer,
        "partial_update": serialisers.UserWriteSerializer,
    }

    def get_queryset(self):
        return User.objects.all().filter(is_staff=False)

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, serialisers.UserReadSerializer)

    def create(self, request, *args, **kwargs):
        write_serializer = self.get_serializer(data=request.data)
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serialisers.UserReadSerializer(instance).data,
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        write_serializer = self.get_serializer(
            instance, data=request.data, partial=False
        )
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serialisers.UserReadSerializer(instance).data, status=status.HTTP_200_OK
        )

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        write_serializer = self.get_serializer(
            instance, data=request.data, partial=True
        )
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serialisers.UserReadSerializer(instance).data, status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        try:
            user = User.objects.get(uuid=kwargs["uuid"])
            updated_by = request.user

            user_service = UserService()
            user_service.deactivate_user(user=user, updated_by=updated_by)

            return super().destroy(request, *args, **kwargs)

        except RoleAssignmentError as e:
            raise serializers.ValidationError({"detail": str(e)})
