from django.contrib import admin
from django.urls import include, path

from drf_spectacular.views import SpectacularAPIView
from authentication.views import GetRolesView, LoginView, LogoutView, SessionCheckView


urlpatterns = [
	path("api/login/", LoginView.as_view()),
    path("api/logout/", LogoutView.as_view()),
    path("api/session/", SessionCheckView.as_view()),
    path("api/roles/", GetRolesView.as_view()),
    path("api/admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view()),
    path("api/", include(("api.urls", "api"))),
]
