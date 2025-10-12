from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.pasteurised_milk import serializers
from api.v1.pagination import StandardPagePagination

from pasteurised_milk.models import PasteurisedMilk


class PasteurisedMilkViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PasteurisedMilkSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    def get_queryset(self):
        return PasteurisedMilk.objects.all().order_by("-created_at")
