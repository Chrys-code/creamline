from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.producer import serializers

from apps.producers.models import Producer


class ProducerViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProducerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Producer.objects.all()
