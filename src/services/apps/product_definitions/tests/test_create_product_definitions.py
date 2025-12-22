import pytest

from django.db import IntegrityError

from apps.product_definitions.models import ProductDefinition
from apps.product_definitions.use_cases.create_product_definition import create_product_definition

pytestmark = pytest.mark.django_db()


def test_create_product_definition_saves(test_user):
    product_definition_data = {"name": "whole milk"}

    created = create_product_definition(
        name=product_definition_data["name"], created_by=test_user
    )
    created_db_instance = ProductDefinition.objects.get(uuid=created.uuid)

    assert isinstance(created, ProductDefinition)
    assert created_db_instance.name == product_definition_data["name"]
    assert created_db_instance.created_by == test_user


def test_create_product_definition_missing_created_by_does_not_save():
    product_definition_data = {"name": "whole milk"}

    with pytest.raises(AttributeError):
        create_product_definition(
            name=product_definition_data["name"], created_by=None  # type: ignore[attr-defined]
        )


def test_create_product_definition_missing_name_does_not_save(test_user):
    with pytest.raises(IntegrityError):
        create_product_definition(
            name=None, created_by=test_user  # type: ignore[attr-defined]
        )
