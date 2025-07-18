from django.contrib import admin
from django.urls import path

from authentication.views import SignupView, LoginView, LogoutView, MeView

urlpatterns = [
	path("api/signup/", SignupView.as_view()),
	path("api/login/", LoginView.as_view()),
    path("api/logout/", LogoutView.as_view()),
    path("api/me/", MeView.as_view()),
    path("api/admin/", admin.site.urls),
]
