from django.urls import include, path
from django.contrib import admin


urlpatterns = [
    # Admin
    path("api/admin/", admin.site.urls),
    path("api/", include(("api.urls", "api"))),
]
