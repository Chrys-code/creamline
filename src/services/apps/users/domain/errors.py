class DomainError(Exception):
    """
    Base class for domain-level errors.
    """


class MissingRolesError(DomainError):
    """
    Raised when a user whould have no roles assigned.
    """


class RoleAssignmentError(DomainError):
    """
    Raised when a user tries to assign a role the are not allowed to.
    """
