from django.utils.translation import gettext_lazy as _

# Somehow TRANSLATION_KEYS should be generated from:
# from apps.storages.features.storage_types.constants import STORAGE_TYPE_CHOICES

TRANSLATION_KEYS = {
    "silo": _("silo"),
    "tub": _("tub"),
    "container": _("container"),
}
