from rest_framework.permissions import BasePermission

from user_groups.models import GroupMetadata

class HasGroup:
    """
    Simple permission helpers for group-based access.
    """

    class Base(BasePermission):
        code_name = None

        def has_permission(self, request, view):
            user = request.user
            if not user.is_authenticated or not self.code_name:
                return False


            return GroupMetadata.objects.filter(
                code_name=self.code_name,
                group__in=user.groups.all()
            ).exists()

    class Manager(BasePermission):
        """
        Allows access only to users in the 'manager' group.
        """

        code_name = "manager"

    class MilkCollector(BasePermission):
        """
        Allows access only to users in the 'milk_collector' group.
        """

        code_name = "milk_collector"

    class Pasteuriser(BasePermission):
        """
        Allows access only to users in the 'pasteuriser' group.
        """

        code_name = "pasteuriser"
