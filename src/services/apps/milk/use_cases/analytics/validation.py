import logging
import datetime as dt

from typing import Optional

from django.utils.translation import gettext_lazy as _


class MilkAnalyticsException(Exception):
    default_detail = _("An error occoured")
    default_code = "milk_service_error"

    def __init__(self, detail=None):
        translated_detail = detail or self.default_detail

        super().__init__(translated_detail)
        self.detail = translated_detail
        self.code = self.default_code


class InvalidDateError(MilkAnalyticsException):
    default_detail = _("Start date cannot be after end date")
    default_code = "invalid_date"


def _validate_date(
    start_date: dt.date,
    end_date: dt.date,
    logger: Optional[logging.Logger] = None,
):

    if not start_date or end_date is None:
        if logger:
            logger.info(
                "Milk Time Series Analytics date validation failed",
                extra={
                    "reason": "Start date or end date was not provied",
                    "start_date": start_date,
                    "end_date": end_date,
                },
            )

        raise InvalidDateError()

    if start_date > end_date:
        if logger:
            logger.info(
                "Milk Time Series Analytics date validation failed",
                extra={
                    "reason": "start date cannot be after end date",
                    "start_date": start_date,
                    "end_date": end_date,
                },
            )

        raise InvalidDateError()


def validate_milk_time_series_input(
    start_date: dt.date,
    end_date: dt.date,
    # _interval: str = "day",
    # _producer_uuid: str | None = None,
    logger: Optional[logging.Logger] = None,
) -> None:
    if logger is None:
        logger = logging.getLogger(f"{__name__}-milk_time_series_analytics_validation")

    _validate_date(start_date=start_date, end_date=end_date, logger=logger)
