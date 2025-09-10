import logging

from django.utils import timezone
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from profiles.models import Profile


User = get_user_model()


logger = logging.getLogger(__name__)


def _delete(profile: Profile):
    profile.save()


def delete_profile(profile: Profile, deleted_by: User):
    profile.deleted_at = timezone.now()
    profile.deleted_by=deleted_by

    _delete(profile=profile)

    logger.info(
        "profile-deleted",
        extra={
            "uuid": str(profile.uuid),
            "deleted_by": str(deleted_by.uuid)
        },
    )
