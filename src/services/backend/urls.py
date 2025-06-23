from django.contrib import admin
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from authentication.views import SignUpView, current_user


urlpatterns = [
	path("auth/signup/", SignUpView.as_view(), name="signup"),
    path("auth/login/", LoginView.as_view(), name="login"),
	path("auth/user/", current_user, name="current_user"),
	path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("api/admin/", admin.site.urls),
]
