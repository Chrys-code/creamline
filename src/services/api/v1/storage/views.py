from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.storages.models import Storage
from apps.storages.use_cases.delete import delete_storage

from api.v1.pagination import StandardPagePagination
from api.v1.storage import serializers


class StorageViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.StorageSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    def get_queryset(self):
        return Storage.objects.all().filter(deleted_at=None)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        delete_storage(instance=instance, deleted_by=request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="all")
    def list_no_pagination(self, _request):
        # Disable pagination for this action
        self.pagination_class = None

        queryset = self.get_queryset().order_by("name")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
