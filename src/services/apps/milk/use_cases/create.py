import logging
from typing import TypedDict, TYPE_CHECKING

from apps.storages.models import Storage
from apps.milk.models import Milk
from apps.producers.models import Producer

if TYPE_CHECKING:
    from apps.users.models import CustomUser

logger = logging.getLogger(__name__)


class CreateMilkData(TypedDict):
    producer: Producer
    storage: Storage
    volume_kg: float
    volume_liters: float
    acid_content: float
    aflatoxin: bool
    inhibitory_residue: bool
    temperature: float
    created_by: "CustomUser"


def _create(
    producer: Producer,
    producer_uuid: str,
    producer_name: str,
    storage: Storage,
    storage_uuid: str,
    storage_name: str,
    storage_type: str,
    volume_kg: float,
    volume_liters: float,
    acid_content: float,
    aflatoxin: bool,
    inhibitory_residue: bool,
    temperature: float,
    created_by: "CustomUser",
) -> Milk:
    milk = Milk.objects.create(
        producer=producer,
        producer_uuid=producer_uuid,
        producer_name=producer_name,
        storage=storage,
        storage_uuid=storage_uuid,
        storage_name=storage_name,
        storage_type=storage_type,
        volume_kg=volume_kg,
        volume_liters=volume_liters,
        acid_content=acid_content,
        aflatoxin=aflatoxin,
        inhibitory_residue=inhibitory_residue,
        temperature=temperature,
        created_by=created_by,
    )

    return milk


def create_milk(validated_data: CreateMilkData, created_by: "CustomUser") -> Milk:
    producer = validated_data["producer"]
    storage = validated_data["storage"]

    created_milk = _create(
        producer=producer,
        producer_uuid=producer.uuid,
        producer_name=producer.name,
        storage=storage,
        storage_uuid=storage.uuid,
        storage_name=storage.name,
        storage_type=storage.type,
        volume_kg=validated_data["volume_kg"],
        volume_liters=validated_data["volume_liters"],
        acid_content=validated_data["acid_content"],
        aflatoxin=validated_data["aflatoxin"],
        inhibitory_residue=validated_data["inhibitory_residue"],
        temperature=validated_data["temperature"],
        created_by=created_by,
    )

    logger.info(
        "milk-created",
        extra={"uuid": created_milk.uuid, "created_by": created_by.uuid},
    )

    return created_milk
