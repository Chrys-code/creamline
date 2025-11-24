import logging
from django.utils import translation


logger = logging.getLogger(__name__)


class CustomLocaleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        lang = request.headers.get("X-Language")
        if lang:
            translation.activate(lang)

            logger.info(
                "x-language_detected",
                extra={"lang": lang},
            )

        return self.get_response(request)
