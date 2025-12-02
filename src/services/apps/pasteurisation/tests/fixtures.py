from datetime import datetime, timedelta
import pytest

from apps.pasteurisation.models import Pasteurisation
from apps.product_definitions.models import ProductDefinition

@pytest.fixture
def pasteurisation(test_user, db):
    created_pasteurisation = Pasteurisation.objects.create(
        pasteur_uuid="test_pasteur_uuid",
        pasteur_name="test_pasteur_name",
        source_storage_uuid="test_source_storage_uuid",
        source_storage_name="test_source_storage_name",
        target_storage_uuid="test_target_storage_uuid",
        target_storage_name="test_target_storage_name",
        product_definition_name="test_product_definition_name",
        product_definition_type=ProductDefinition.ProductDefinitionTypes.CREAM,
        volume_kg=1000,
        volume_liters=1000,
        temperature=15,
        start_date=datetime.now().date(),
        end_date=datetime.now().date() + timedelta(minutes=10),
        created_by=test_user
    )

    return created_pasteurisation


@pytest.fixture
def pasteuriation_data():
    return {
        "pasteur_uuid":"test_pasteur_uuid",
        "pasteur_name":"test_pasteur_name",
        "source_storage_uuid":"test_source_storage_uuid",
        "source_storage_name":"test_source_storage_name",
        "target_storage_uuid":"test_target_storage_uuid",
        "target_storage_name":"test_target_storage_name",
        "product_definition_name":"test_product_definition_name",
        "product_definition_type":ProductDefinition.ProductDefinitionTypes.CREAM,
        "volume_kg":1000.00,
        "volume_liters":1000.00,
        "temperature":15.00,
        "start_date":datetime.now().date(),
        "end_date":datetime.now().date() + timedelta(minutes=10),
    }
