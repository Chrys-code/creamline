from django.utils.translation import gettext_lazy as _

from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from api.v1.pagination import StandardPagePagination
from api.v1.product_definition import serializers

from apps.product_definitions.models import ProductDefinition
from apps.product_definitions.use_cases.delete import delete_product_definition


class ProductDefinitionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagePagination
    lookup_field = "uuid"

    serializer_classes = {
        "list": serializers.ProductDefinitionReadSerializer,
        "retrieve": serializers.ProductDefinitionReadSerializer,
        "create": serializers.ProductDefinitionWriteSerializer,
        "update": serializers.ProductDefinitionWriteSerializer,
        "partial_update": serializers.ProductDefinitionWriteSerializer,
    }

    def get_queryset(self):
        return ProductDefinition.objects.all().filter(deleted_at=None).order_by("name")

    def get_serializer_class(self):
        return self.serializer_classes.get(
            self.action, serializers.ProductDefinitionReadSerializer
        )

    def create(self, request, *args, **kwargs):
        write_serializer = self.get_serializer(data=request.data)
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serializers.ProductDefinitionReadSerializer(instance).data,
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        write_serializer = self.get_serializer(
            instance, data=request.data, partial=False
        )
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serializers.ProductDefinitionReadSerializer(instance).data,
            status=status.HTTP_200_OK,
        )

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        write_serializer = self.get_serializer(
            instance, data=request.data, partial=True
        )
        write_serializer.is_valid(raise_exception=True)
        instance = write_serializer.save()

        return Response(
            serializers.ProductDefinitionReadSerializer(instance).data,
            status=status.HTTP_200_OK,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        delete_product_definition(instance=instance, deleted_by=request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="all")
    def list_no_pagination(self, _request):
        # Disable pagination for this action
        self.pagination_class = None

        queryset = self.get_queryset().order_by("name")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="types")
    def list_types(self, _request):
        """
        Returns the stored enum options as ProductDefintiton type options
        """

        data = [
            {
                "value": choice.value,
                "label": str(choice.label),
            }
            for choice in ProductDefinition.ProductDefinitionTypes
        ]
        return Response(data)
