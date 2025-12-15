from django.utils.translation import gettext_lazy as _

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.v1.pagination import StandardPagePagination
from api.v1.pasteur import seralizers
from api.v1.permissions import StrictDjangoModelPermissions

from apps.pasteurs.models import Pasteur
from apps.pasteurs.use_cases.delete import delete_pasteur


class PasteurViewSet(ModelViewSet):
    queryset = Pasteur.objects.all()
    serializer_class = seralizers.PasteurSerializer
    permission_classes = [IsAuthenticated, StrictDjangoModelPermissions]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    def get_queryset(self):
        return Pasteur.objects.all().filter(deleted_at=None)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        delete_pasteur(instance=instance, deleted_by=request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="all")
    def list_no_pagination(self, _request):
        """
        Returns pasteurs without pagination ordered by name to be used in dropdowns.
        """

        # Disable pagination for this action
        self.pagination_class = None

        queryset = self.get_queryset().order_by("name")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
