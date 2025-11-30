import pytest

from apps.product_definitions.models import ProductDefinition

@pytest.fixture
def product_definition(test_user, db):
    pd = ProductDefinition.objects.create(name="test", created_by=test_user)
    return pd

@pytest.fixture
def product_definition_payload():
    return {
        "name": "test",
        "type": ProductDefinition.ProductDefinitionTypes.WHOLEMILK
    }
