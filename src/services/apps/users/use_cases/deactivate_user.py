from typing import TYPE_CHECKING
import logging

if TYPE_CHECKING:
    from ..models import CustomUser


logger = logging.getLogger(__name__)


def _deactivate(user: "CustomUser"):
    user.is_active = False
    user.save()

    return user


def deactivate_user(user: "CustomUser") -> None:

    _deactivate(user)

    logger.info("user-deactivated", extra={"user_uuid": user.uuid})
