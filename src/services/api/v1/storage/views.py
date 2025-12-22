from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from api.v1.permissions import StrictDjangoModelPermissions
from apps.storages.models import Storage
from apps.storages.use_cases.delete_storage import delete_storage

from api.v1.pagination import StandardPagePagination
from api.v1.storage import serializers


class StorageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, StrictDjangoModelPermissions]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    serializer_classes = {
        "list": serializers.StorageReadSerializer,
        "retrieve": serializers.StorageReadSerializer,
        "create": serializers.StorageWriteSerializer,
        "update": serializers.StorageWriteSerializer,
        "partial_update": serializers.StorageWriteSerializer,
    }

    def get_queryset(self):
        return Storage.objects.all().filter(deleted_at=None).order_by("name")

    def get_serializer_class(self):
        return self.serializer_classes.get(
            self.action, serializers.StorageReadSerializer
        )

    def create(self, request, *args, **kwargs):
        write_serializer = self.get_serializer(data=request.data)
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serializers.StorageReadSerializer(instance).data,
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
            serializers.StorageReadSerializer(instance).data, status=status.HTTP_200_OK
        )

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        write_serializer = self.get_serializer(
            instance, data=request.data, partial=True
        )
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serializers.StorageReadSerializer(instance).data, status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        delete_storage(instance=instance, deleted_by=request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="all")
    def list_no_pagination(self, _request):
        """
        Returns storages without pagination ordered by name to be used in dropdowns.
        """
        # Disable pagination for this action
        self.pagination_class = None

        queryset = self.get_queryset().order_by("name")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="types")
    def list_types(self, _request):
        """
        Returns the stored enum options as Storage type options
        """

        data = [
            {
                "value": choice.value,
                "label": str(choice.label),
            }
            for choice in Storage.StorageTypes
        ]
        return Response(data)
