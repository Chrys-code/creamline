from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.storage_type import serializers

from apps.storages.features.storage_types.models import StorageType


class StorageTypeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.StorageTypeSerializer
    permission_classes = [IsAuthenticated]
    queryset = StorageType.objects.all()
