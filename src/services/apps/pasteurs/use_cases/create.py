import logging
from typing import TYPE_CHECKING

from apps.pasteurs.models import Pasteur

if TYPE_CHECKING:
    from apps.users.models import CustomUser

logger = logging.getLogger(__name__)


def _create(
    name: str,
    created_by: "CustomUser",
) -> Pasteur:
    pasteur = Pasteur.objects.create(
        name=name,
        created_by=created_by,
    )

    return pasteur


def create_pasteur(
    name: str, created_by: "CustomUser"
) -> Pasteur:
    created_pasteur = _create(
        name=name,
        created_by=created_by,
    )

    logger.info(
        "pasteur-created",
        extra={"uuid": created_pasteur.uuid, "created_by": created_by.uuid},
    )

    return created_pasteur
