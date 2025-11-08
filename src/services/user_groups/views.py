from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import Group

from common.has_group import HasGroup

class UserGroupsView(APIView):
    permission_classes = [HasGroup.Manager]

    def get(self, request, *args, **kwargs):
        groups = Group.objects.all().values("id", "name")
        return Response(list(groups))