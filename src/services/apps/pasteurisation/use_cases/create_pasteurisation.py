import logging
import datetime as dt
from typing import TypedDict, TYPE_CHECKING

from apps.pasteurisation.models import Pasteurisation
from apps.pasteurisation.use_cases.validate_pasteurisation import validate_create_pasteurisation

from apps.storages.models import Storage
from apps.pasteurs.models import Pasteur
from apps.product_definitions.models import ProductDefinition

if TYPE_CHECKING:
    from apps.users.models import CustomUser

logger = logging.getLogger(__name__)


class CreatePasteurisationData(TypedDict):
    pasteur: Pasteur
    source_storage: Storage
    target_storage: Storage
    product_definition: ProductDefinition

    volume_kg: float
    volume_liters: float
    temperature: float

    start_date: dt.datetime
    end_date: dt.datetime

    created_by: "CustomUser"


def _create(
    pasteur: Pasteur,
    source_storage: Storage,
    target_storage: Storage,
    product_definition: ProductDefinition,
    volume_kg: float,
    volume_liters: float,
    temperature: float,
    start_date: dt.datetime,
    end_date: dt.datetime,
    created_by: "CustomUser",
) -> Pasteurisation:
    pasteurisation = Pasteurisation.objects.create(
        pasteur=pasteur,
        source_storage=source_storage,
        target_storage=target_storage,
        product_definition=product_definition,
        volume_kg=volume_kg,
        volume_liters=volume_liters,
        temperature=temperature,
        start_date=start_date,
        end_date=end_date,
        created_by=created_by,
    )

    return pasteurisation


def create_pasteurisation(
    validated_data: CreatePasteurisationData, created_by: "CustomUser"
) -> Pasteurisation:
    pasteur = validated_data["pasteur"]
    source_storage = validated_data["source_storage"]
    target_storage = validated_data["target_storage"]
    product_definition = validated_data["product_definition"]

    validate_create_pasteurisation(
        start_date=validated_data["start_date"],
        end_date=validated_data["end_date"],
        logger=logger,
    )

    created_pasteurisation = _create(
        pasteur=pasteur,
        source_storage=source_storage,
        target_storage=target_storage,
        product_definition=product_definition,
        volume_kg=validated_data["volume_kg"],
        volume_liters=validated_data["volume_liters"],
        temperature=validated_data["temperature"],
        start_date=validated_data["start_date"],
        end_date=validated_data["end_date"],
        created_by=created_by,
    )

    logger.info(
        "Pasteurisation-created",
        extra={"uuid": created_pasteurisation.uuid, "created_by": created_by.uuid},
    )

    return created_pasteurisation
