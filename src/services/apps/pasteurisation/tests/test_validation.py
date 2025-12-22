import pytest
import datetime as dt

from apps.pasteurisation.use_cases.validate_pasteurisation import (
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


def test_validate_update_pasteurisation_raises_invalid_dates(pasteurisation):
    start, end = dt.date(2025, 12, 31), dt.date(2025, 12, 30)

    setattr(pasteurisation, "start_date", start)
    setattr(pasteurisation, "end_date", end)

    with pytest.raises(InvalidDatesError) as exc:
        validate_update_pasteurisation(instance=pasteurisation)

    assert "Start date must come before end date." in str(exc), exc


def test_validate_update_pasteurisation_does_not_raise_invalid_dates(pasteurisation):
    start, end = dt.date(2025, 12, 28), dt.date(2025, 12, 29)

    setattr(pasteurisation, "start_date", start)
    setattr(pasteurisation, "end_date", end)

    validate_update_pasteurisation(instance=pasteurisation)
