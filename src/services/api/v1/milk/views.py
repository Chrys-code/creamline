from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.milk import serializers

from milk.models import Milk


class MilkViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MilkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Milk.objects.all()
