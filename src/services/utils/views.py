from django.http.response import mimetypes
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .do_utils import generate_presigned_url


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_upload_url(request):
    key = request.GET.get("key")
    content_type = request.GET.get("content_type", "application/octet-stream")

    url = generate_presigned_url(
        key=key, action="put_object", content_type=content_type
    )

    if url:
        return Response({"url": url})
    return Response({"error": "Failed to generate URL"}, status=500)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_download_url(request):
    key = request.GET.get("key")
    content_type = mimetypes.guess_file_type(key)[0]
    url = generate_presigned_url(
        key=key,
        action="get_object",
        content_type=content_type,
    )
    if url:
        return Response({"url": url})
    return Response({"error": "Failed to generate URL"}, status=500)
