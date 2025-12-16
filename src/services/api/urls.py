from django.urls import path, include

from drf_spectacular.views import SpectacularAPIView

from apps.healthcheck import views
from apps.authentication import views as auth_views
from apps.users.features.user_groups.views import UserGroupsView

urlpatterns = [
    path("health-check/", views.health_check_view, name="health-check"),
    # Auth
    path("login/", auth_views.LoginView.as_view(), name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    path("session/", auth_views.SessionCheckView.as_view(), name="session"),
    path("roles/", auth_views.GetRolesView.as_view(), name="roles"),
    # Domain endpoints
    path("user-groups/", UserGroupsView.as_view(), name="user-groups"),
    # API schema
    path("schema/", SpectacularAPIView.as_view()),
    # Other versioned API endpoints
    path("v1/", include(("api.v1.urls", "v1"))),
]
