from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.milk import serializers
from api.v1.pagination import StandardPagePagination

from milk.models import Milk


class MilkViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MilkSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    def get_queryset(self):
        return Milk.objects.all().order_by("-created_at")
