# from django.core.exceptions import ValidationError as DjangoValidationError
# from django.utils.translation import gettext_lazy as _

# class MilkException(Exception):
#     default_code = "shift_service_error"
#     default_detail = _("An error occoured")

#     def __init__(self, detail=None):
#         translated_detail = detail or self.default_detail

#         super().__init__(translated_detail)
#         self.detail = translated_detail
#         self.code = self.default_code


# class ModelNotFoundError(MilkException):
#     default_detail = _("Model does not exist")
#     default_code = "invalid_dates"
