from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from users.models import CustomUser


def is_manager(user: "CustomUser") -> bool:
    return user.is_staff or user.groups.filter(name="managers").exists()

def is_collector(user: "CustomUser") -> bool:
    return user.groups.filter(name="milk_collectors").exists()

def is_pasteuriser(user: "CustomUser") -> bool:
    return user.groups.filter(name="pasteurisers").exists()
