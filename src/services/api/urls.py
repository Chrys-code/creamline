from django.urls import path, include

from apps.healthcheck import views

urlpatterns = [
    path("health-check/", views.health_check_view, name="health-check"),
    path("v1/", include(("api.v1.urls", "v1"))),
]
