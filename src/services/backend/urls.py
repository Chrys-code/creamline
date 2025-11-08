from django.contrib import admin
from django.urls import include, path

from drf_spectacular.views import SpectacularAPIView
from authentication.views import GetRolesView, LoginView, LogoutView, SessionCheckView
from user_groups.views import UserGroupsView


urlpatterns = [
    # Auth
    path("api/login/", LoginView.as_view()),
    path("api/logout/", LogoutView.as_view()),
    path("api/session/", SessionCheckView.as_view()),
    path("api/roles/", GetRolesView.as_view()),

    # Admin
    path("api/admin/", admin.site.urls),

    # Domain endpoints
    path("api/user-groups/", UserGroupsView.as_view(), name="user-groups"),

    # API schema
    path("api/schema/", SpectacularAPIView.as_view()),

    # Other versioned API endpoints
    path("api/", include(("api.urls", "api"))),
]
