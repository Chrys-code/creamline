from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from api.v1.pagination import StandardPagePagination
from api.v1.permissions import StrictDjangoModelPermissions
from api.v1.producer import serializers

from apps.producers.models import Producer
from apps.producers.use_cases.delete_producer import delete_producer


class ProducerViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProducerSerializer
    permission_classes = [IsAuthenticated, StrictDjangoModelPermissions]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    def get_queryset(self):
        return Producer.objects.all().filter(deleted_at=None).order_by("name")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        delete_producer(instance=instance, deleted_by=request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="all")
    def list_no_pagination(self, _request):
        """
        Returns producers without pagination ordered by name to be used in dropdowns.
        """
        # Disable pagination for this action
        self.pagination_class = None

        queryset = self.get_queryset().order_by("name")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
