from django.contrib import admin
from django.urls import include, path

from authentication.views import SignupView, LoginView, LogoutView, SessionCheckView

urlpatterns = [
	path("api/signup/", SignupView.as_view()),
	path("api/login/", LoginView.as_view()),
    path("api/logout/", LogoutView.as_view()),
    path("api/session/", SessionCheckView.as_view()),
    path("api/admin/", admin.site.urls),
    path("api/", include(("api.urls", "api"))),
]
