class DomainError(Exception):
    """
    Base class for domain-level errors.
    """


class RoleAssignmentError(DomainError):
    """
    Raised when a user tries to assign a role the are not allowed to.
    """
