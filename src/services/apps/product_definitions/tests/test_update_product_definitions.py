import pytest

from apps.product_definitions.models import ProductDefinition
from apps.product_definitions.use_cases.update_product_definition import update_product_definition

pytestmark = pytest.mark.django_db()


def test_update_product_definition_saves(product_definition, test_user):
    original_name = product_definition.name
    product_definition_data = {"name": "whole milk"}

    updated = update_product_definition(
        instance=product_definition, name=product_definition_data["name"]
    )
    db_instance = ProductDefinition.objects.get(uuid=updated.uuid)

    assert isinstance(updated, ProductDefinition)
    assert db_instance.name != original_name
    assert db_instance.name == product_definition_data["name"]
    assert db_instance.created_by == test_user


def test_update_product_definition_missing_name_skips_attribute(
    product_definition, test_user
):
    original_name = product_definition.name

    updated = update_product_definition(
        instance=product_definition, name=None  # type: ignore[attr-defined]
    )
    db_instance = ProductDefinition.objects.get(uuid=updated.uuid)

    assert isinstance(updated, ProductDefinition)
    assert db_instance.name == original_name
    assert db_instance.created_by == test_user
