import logging
import boto3
from botocore.exceptions import ClientError
from django.conf import settings


logger = logging.getLogger(__name__)


def generate_presigned_url(
    key: str,
    action: str = "get_object",
    content_type: str | None = None,
    expiration: int = 300,
) -> str | None:
    do_client = _get_do_client()
    params = _get_params(key)

    if action == "put_object" and content_type:
        params["ContentType"] = content_type

    url = _get_url(do_client, action, params, expiration)
    return url


def _get_do_client():
    do_client = boto3.client(
        "s3",
        region_name=settings.DO_REGION,
        endpoint_url=settings.DO_STORAGE_ENDPOINT,
        aws_access_key=settings.DO_ACCESS_KEY,
        aws_secret_access_key=settings.DO_SECRET_ACCESS_KEY,
    )

    return do_client


def _get_params(key: str):
    params = {"Bucket": settings.DO_BUCKET, "Key": key}
    return params


def _get_url(do_client, action, params, expiration):
    try:
        url = do_client.generate_presigned_url(
            ClientMethod=action, Params=params, ExpiresIn=expiration
        )
        return url
    except ClientError as e:
        logger.info(
            "Error generating presigned url",
            extra={"reason": f"Error generating pre-signed URL: {e}"},
        )
        return None
