import pytest

from apps.product_definitions.models import ProductDefinition
from apps.product_definitions.use_cases.delete import delete_product_definition

pytestmark = pytest.mark.django_db()


def test_delete_product_definition_updates_instance(product_definition, test_user):
    delete_product_definition(instance=product_definition, deleted_by=test_user)
    updated_db_instance = ProductDefinition.objects.get(uuid=product_definition.uuid)

    assert isinstance(updated_db_instance, ProductDefinition)
    assert updated_db_instance.deleted_at != None
    assert updated_db_instance.deleted_by == test_user


def test_delete_product_definition_missing_delete_by_does_not_update_instance(
    product_definition,
):
    with pytest.raises(AttributeError):
        delete_product_definition(
            instance=product_definition, deleted_by=None  # type: ignore[attr-defined]
        )


def test_delete_product_definition_missing_instance_does_not_update_instance(
    test_user,
):
    with pytest.raises(AttributeError):
        delete_product_definition(
            instance=None, deleted_by=test_user  # type: ignore[attr-defined]
        )
