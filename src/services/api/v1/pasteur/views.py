from django.utils.translation import gettext_lazy as _

from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated

from pasteurs.models import Pasteur
from api.v1.pasteur import seralizers


class PasteurViewSet(ReadOnlyModelViewSet):
    queryset = Pasteur.objects.all()
    serializer_class = seralizers.PasteurSerializer
    permission_classes = [IsAuthenticated]

