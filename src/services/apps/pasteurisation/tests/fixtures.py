from datetime import datetime, timedelta
import pytest

from apps.pasteurisation.models import Pasteurisation

@pytest.fixture
def pasteurisation(test_user, pasteur, storage, storage_2, product_definition, db):
    created_pasteurisation = Pasteurisation.objects.create(
        pasteur=pasteur,
        pasteur_uuid=pasteur.uuid,
        pasteur_name=pasteur.name,
        source_storage=storage,
        source_storage_uuid=storage.uuid,
        source_storage_name=storage.name,
        target_storage=storage_2,
        target_storage_uuid=storage_2.uuid,
        target_storage_name=storage_2.name,
        product_definition=product_definition,
        product_definition_name=product_definition.name,
        product_definition_uuid=product_definition.uuid,
        volume_kg=1000,
        volume_liters=1000,
        temperature=15,
        start_date=datetime.now().date(),
        end_date=datetime.now().date() + timedelta(minutes=10),
        created_by=test_user
    )

    return created_pasteurisation


@pytest.fixture
def pasteuriation_payload(pasteur, storage, storage_2, product_definition):
    return {
        "pasteur":pasteur,
        "pasteur_uuid":pasteur.uuid,
        "pasteur_name":pasteur.name,
        "source_storage":storage,
        "source_storage_uuid":storage.uuid,
        "source_storage_name":storage.name,
        "target_storage":storage_2,
        "target_storage_uuid":storage_2.uuid,
        "target_storage_name":storage_2.name,
        "product_definition":product_definition,
        "product_definition_name":product_definition.name,
        "product_definition_uuid":product_definition.uuid,
        "volume_kg":1000.00,
        "volume_liters":1000.00,
        "temperature":15.00,
        "start_date":datetime.now().date(),
        "end_date":datetime.now().date() + timedelta(minutes=10),
    }
