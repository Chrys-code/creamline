from rest_framework.views import APIView
from rest_framework.response import Response

from apps.users.features.user_groups.models import GroupMetadata

from common.has_group import HasGroup


class UserGroupsView(APIView):
    permission_classes = [HasGroup.Manager]

    def get(self, _request, *args, **kwargs):
        groups = GroupMetadata.objects.all()
        data = [
            {
                "uuid": group.uuid,
                "name": GroupMetadata.GroupTypes[group.code_name.upper()].label,
            }
            for group in groups
        ]

        return Response(data)
