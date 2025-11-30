import logging
import datetime as dt

from typing import Optional
from uuid import UUID

from django.utils.translation import gettext_lazy as _

from apps.pasteurisation.models import Pasteurisation


class PasteurisationException(Exception):
    default_code = "pasteurisation_service_error"
    default_detail = _("An error occoured")

    def __init__(self, detail=None):
        translated_detail = detail or self.default_detail

        super().__init__(translated_detail)
        self.detail = translated_detail
        self.code = self.default_code


class InvalidDatesError(PasteurisationException):
    default_detail = _("Start date must come before end date.")
    default_code = "invalid_dates"


def _validate_duration(
    start_date: dt.date,
    end_date: dt.date,
    instance_uuid: Optional[UUID] = None,
    logger: Optional[logging.Logger] = None,
) -> None:
    if start_date > end_date:
        if logger:
            logger.info(
                "Pasteurisation duration validation failed",
                extra={
                    "reason": "start date must come before end date",
                    "uuid": instance_uuid,
                },
            )

        raise InvalidDatesError()


def validate_create_pasteurisation(
    start_date: dt.date, end_date: dt.date, logger: Optional[logging.Logger] = None
) -> None:
    if logger is None:
        logger = logging.getLogger(f"{__name__}-create_validation")

    _validate_duration(start_date=start_date, end_date=end_date, logger=logger)


def validate_update_pasteurisation(
    instance: Pasteurisation, logger: Optional[logging.Logger] = None
) -> None:
    if logger is None:
        logger = logging.getLogger(f"{__name__}-update_validation")

    _validate_duration(
        start_date=instance.start_date,
        end_date=instance.end_date,
        instance_uuid=instance.uuid,
        logger=logger,
    )
