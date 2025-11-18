import logging
from typing import Dict

from apps.pasteurs.models import Pasteur


logger = logging.getLogger(__name__)


def _update(instance: Pasteur) -> Pasteur:
    updated_pasteur = instance.save()

    return updated_pasteur


def update_pasteur(
    instance: Pasteur,
    validated_data: Dict,
) -> Pasteur:
    for field, value in validated_data.items():
        setattr(instance, field, value)

    updated_pasteur = _update(instance=instance)

    logger.info(
        "pasteur-updated",
        extra={
            "uuid": updated_pasteur.uuid,
        },
    )

    return updated_pasteur
