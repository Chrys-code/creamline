from django.utils.translation import gettext_lazy as _

# Somehow TRANSLATION_KEYS should be generated from:
# from apps.users.features.user_groups.common.constants import USER_GROUP_CHOICES

USER_GROUP_TYPE_TRANSLATION_KEYS = {
    "manager": _("manager"),
    "milk_collector": _("milk collector"),
    "pasteuriser": _("pasteuriser"),
}
