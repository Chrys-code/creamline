from rest_framework.permissions import BasePermission

class HasGroup:
    """
    Simple permission helpers for group-based access.
    """

    class Manager(BasePermission):
        """
        Allows access only to users in the 'manager' group.
        """

        def has_permission(self, request, view):
            user = request.user
            return user.is_authenticated and user.groups.filter(name="manager").exists()