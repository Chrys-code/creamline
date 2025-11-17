from rest_framework.views import APIView
from rest_framework.response import Response

from common.has_group import HasGroup

from user_groups.models import GroupMetadata

class UserGroupsView(APIView):
    permission_classes = [HasGroup.Manager]

    def get(self, request, *args, **kwargs):
        groups = GroupMetadata.objects.all()
        data = [
            {"id": group.id, "name": group.code_name}
            for group in groups
        ]

        return Response(data)
