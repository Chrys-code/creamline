import pytest

from apps.milk.use_cases.validation import (
    InvalidVolumePairError,
    validate_create_milk,
    validate_update_milk,
)


def test_validate_create_milk_does_not_raise():
    volume_liters = 1000.00
    volume_kg = 1000.00

    validate_create_milk(volume_liters=volume_liters, volume_kg=volume_kg)


def test_validate_create_milk_missing_liter_raises():
    volume_liters = None
    volume_kg = 1000.00

    with pytest.raises(InvalidVolumePairError):
        validate_create_milk(volume_liters=volume_liters, volume_kg=volume_kg)


def test_validate_create_milk_missing_kg_raises():
    volume_liters = 1000.00
    volume_kg = None

    with pytest.raises(InvalidVolumePairError):
        validate_create_milk(volume_liters=volume_liters, volume_kg=volume_kg)


def test_validate_update_milk_does_not_raise(milk):
    setattr(milk, "volume_liters", 1000.00)
    setattr(milk, "volume_kg", 1000.00)

    validate_update_milk(instance=milk)


def test_validate_update_milk_missing_liter_raises(milk):
    setattr(milk, "volume_liters", None)
    setattr(milk, "volume_kg", 1000.00)

    with pytest.raises(InvalidVolumePairError):
        validate_update_milk(instance=milk)


def test_validate_update_milk_missing_kg_raises(milk):
    setattr(milk, "volume_liters", 1000.00)
    setattr(milk, "volume_kg", None)

    with pytest.raises(InvalidVolumePairError):
        validate_update_milk(instance=milk)
