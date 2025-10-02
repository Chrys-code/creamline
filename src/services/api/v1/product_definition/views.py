from django.utils.translation import gettext_lazy as _

from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated

from product_definitions.models import ProductDefinition
from api.v1.product_definition import serializers


class ProductDefinitionViewSet(ReadOnlyModelViewSet):
    queryset = ProductDefinition.objects.all()
    serializer_class = serializers.ProductDefinitionSerializer
    permission_classes = [IsAuthenticated]
