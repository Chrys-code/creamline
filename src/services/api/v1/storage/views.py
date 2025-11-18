from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.storages.models import Storage
from api.v1.storage import serializers


class StorageViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.StorageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Storage.objects.all()
