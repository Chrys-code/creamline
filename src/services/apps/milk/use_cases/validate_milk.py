import logging

from typing import Optional
from uuid import UUID

from django.utils.translation import gettext_lazy as _

from apps.milk.models import Milk


class MilkException(Exception):
    default_detail = _("An error occoured")
    default_code = "milk_service_error"

    def __init__(self, detail=None):
        translated_detail = detail or self.default_detail

        super().__init__(translated_detail)
        self.detail = translated_detail
        self.code = self.default_code


class InvalidVolumePairError(MilkException):
    default_detail = _("Both volumes kg and liters has to be provided")
    default_code = "invalid_volume_pair"


def _validate_volume_pair(
    volume_kg: float | None,
    volume_liters: float | None,
    instance_uuid: Optional[UUID] = None,
    logger: Optional[logging.Logger] = None,
):

    if volume_kg and volume_liters is None:
        if logger:
            logger.info(
                "Milk volume validation failed",
                extra={
                    "reason": "updating volumes volume_liters was not provided",
                    "volume_kg": volume_kg,
                    "volume_liters": volume_liters,
                    "uuid": instance_uuid,
                },
            )

        raise InvalidVolumePairError()

    if volume_liters and volume_kg is None:
        if logger:
            logger.info(
                "Milk volume validation failed",
                extra={
                    "reason": "updating volumes volume_kg was not provided",
                    "volume_kg": volume_kg,
                    "volume_liters": volume_liters,
                    "uuid": instance_uuid,
                },
            )

        raise InvalidVolumePairError()


def validate_create_milk(
    volume_liters: float | None,
    volume_kg: float | None,
    logger: Optional[logging.Logger] = None,
) -> None:
    if logger is None:
        logger = logging.getLogger(f"{__name__}-create_validation")

    _validate_volume_pair(
        volume_kg=volume_kg, volume_liters=volume_liters, logger=logger
    )


def validate_update_milk(
    instance: Milk, logger: Optional[logging.Logger] = None
) -> None:

    if logger is None:
        logger = logging.getLogger(f"{__name__}-update_validation")

    _validate_volume_pair(
        volume_kg=instance.volume_kg,
        volume_liters=instance.volume_liters,
        logger=logger,
    )
