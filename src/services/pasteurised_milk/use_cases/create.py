import logging
import datetime as dt
from typing import TypedDict, TYPE_CHECKING

from storages.models import Storage
from pasteurs.models import Pasteur
from pasteurised_milk.models import PasteurisedMilk
from product_definitions.models import ProductDefinition

if TYPE_CHECKING:
    from users.models import CustomUser

logger = logging.getLogger(__name__)


class CreatePasteurisedMilkData(TypedDict):
    pasteur: Pasteur
    pasteur_uuid: str
    pasteur_name: str

    source_storage: Storage
    source_storage_uuid: str
    source_storage_name: str
    source_storage_type: Storage.StorageType.choices

    target_storage: Storage
    target_storage_uuid: str
    target_storage_name: str
    target_storage_type: Storage.StorageType.choices

    product_definition: ProductDefinition
    product_definition_name: str
    product_definition_type: ProductDefinition.ProductDefinitionTypes.choices

    volume_kg: float
    volume_liters: float
    temperature: float

    start_date: dt.datetime
    end_date: dt.datetime

    created_by: "CustomUser"


def _create(
    pasteur: Pasteur,
    pasteur_uuid: str,
    pasteur_name: str,

    source_storage: Storage,
    source_storage_uuid: str,
    source_storage_name: str,
    source_storage_type: Storage.StorageType.choices,

    target_storage: Storage,
    target_storage_uuid: str,
    target_storage_name: str,
    target_storage_type: Storage.StorageType.choices,

    product_definition: ProductDefinition,
    product_definition_name: str,
    product_definition_type: ProductDefinition.ProductDefinitionTypes.choices,

    volume_kg: float,
    volume_liters: float,
    temperature: float,

    start_date: dt.datetime,
    end_date: dt.datetime,

    created_by: "CustomUser"
) -> PasteurisedMilk:
    pasteurised_milk = PasteurisedMilk.objects.create(
        pasteur=pasteur,
        pasteur_uuid=pasteur_uuid,
        pasteur_name=pasteur_name,

        source_storage=source_storage,
        source_storage_uuid=source_storage_uuid,
        source_storage_name=source_storage_name,
        source_storage_type=source_storage_type,

        target_storage=target_storage,
        target_storage_uuid=target_storage_uuid,
        target_storage_name=target_storage_name,
        target_storage_type=target_storage_type,

        product_definition=product_definition,
        product_definition_name=product_definition_name,
        product_definition_type=product_definition_type,

        volume_kg=volume_kg,
        volume_liters=volume_liters,
        temperature=temperature,

        start_date=start_date,
        end_date=end_date,

        created_by=created_by,
    )

    return pasteurised_milk


def create_pasteurised_milk(
        validated_data: CreatePasteurisedMilkData,
        created_by: "CustomUser"
) -> PasteurisedMilk:
    pasteur=validated_data["pasteur"]
    source_storage=validated_data["source_storage"]
    target_storage=validated_data["target_storage"]
    product_definition=validated_data["product_definition"]

    created_pasteurised_milk = _create(
        **validated_data,

        pasteur_uuid=pasteur.uuid,
        pasteur_name=pasteur.name,

        source_storage_uuid=source_storage.uuid,
        source_storage_name=source_storage.name,
        source_storage_type=source_storage.type,

        target_storage_uuid=target_storage.uuid,
        target_storage_name=target_storage.name,
        target_storage_type=target_storage.type,

        product_definition_name=product_definition.name,
        product_definition_type=product_definition.type,

        created_by=created_by
    )

    logger.info(
        "pasteurised_milk-created",
        extra={
            "uuid": created_pasteurised_milk.uuid,
            "created_by": created_by.uuid
        },
    )

    return created_pasteurised_milk
