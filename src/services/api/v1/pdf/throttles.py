from rest_framework.throttling import UserRateThrottle


class PDFGenerationRateThrottle(UserRateThrottle):
    scope = "pdf_generation"
