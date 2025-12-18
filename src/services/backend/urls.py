from django.urls import include, path
from django.contrib import admin

from utils import views as utils_views

urlpatterns = [
    # Admin
    path("api/admin/", admin.site.urls),
    path("api/", include(("api.urls", "api"))),
    path("s3/upload-url/", utils_views.get_upload_url, name="get_upload_url"),
    path("s3/download-url/", utils_views.get_download_url, name="get_download_url"),
]
