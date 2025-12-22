import logging

from apps.pasteurs.models import Pasteur


logger = logging.getLogger(__name__)


def _update(instance: Pasteur) -> Pasteur:
    instance.save()

    return instance


def update_pasteur(
    instance: Pasteur,
    name: str,
) -> Pasteur:
    if name is not None:
        setattr(instance, "name", name)

    updated_pasteur = _update(instance=instance)

    logger.info(
        "pasteur-updated",
        extra={
            "uuid": updated_pasteur.uuid,
        },
    )

    return updated_pasteur
