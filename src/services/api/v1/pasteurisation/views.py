from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.pasteurisation.models import Pasteurisation

from api.v1.pasteurisation import serializers
from api.v1.pagination import StandardPagePagination
from api.v1.permissions import StrictDjangoModelPermissions


class PasteurisationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PasteurisationSerializer
    permission_classes = [IsAuthenticated, StrictDjangoModelPermissions]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    def get_queryset(self):
        return Pasteurisation.objects.all().order_by("-created_at")
