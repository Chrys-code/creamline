import logging
from uuid import UUID
from typing import TYPE_CHECKING

from apps.users.features.user_groups.models import GroupMetadata

if TYPE_CHECKING:
    from apps.users.models import CustomUser


logger = logging.getLogger(__name__)


def set_user_groups(user: "CustomUser", group_metadata_uuids: list[UUID]):
    """
    Overwrite user's group membership.
    """
    group_metadatas = GroupMetadata.objects.filter(uuid__in=group_metadata_uuids)
    groups = [meta.group for meta in group_metadatas]

    user.groups.set(groups)
    user.save()

    logger.info(
        "user_group-updated",
        extra={
            "user_uuid": user.uuid,
            "group_metadata_uuids": [meta.uuid for meta in group_metadatas],
        },
    )

    return user
