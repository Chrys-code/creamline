import pytest
import datetime as dt

from apps.pasteurisation.use_cases.validation import (
    InvalidDatesError,
    validate_create_pasteurisation,
    validate_update_pasteurisation,
)


def test_validate_create_pasteurisation_raises_invalid_dates():
    start, end = dt.date(2025, 12, 31), dt.date(2025, 12, 30)
    with pytest.raises(InvalidDatesError) as exc:
        validate_create_pasteurisation(start, end)

    assert "Start date must come before end date." in str(exc), exc


def test_validate_create_pasteurisation_does_not_raise_invalid_dates():
    start, end = dt.date(2025, 12, 28), dt.date(2025, 12, 29)
    validate_create_pasteurisation(start, end)


# TODO start with fixtures!
# def test_validate_update_pasteurisation_raises_invalid_dates():
#     start, end = dt.date(2025, 12, 31), dt.date(2025, 12, 30)
#     with pytest.raises(InvalidDatesError):
#         validate_update_pasteurisation(start, end)
