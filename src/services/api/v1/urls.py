from django.urls import path
from rest_framework.routers import DefaultRouter

from api.v1.profile.views import ProfileDetailView

router = DefaultRouter()
# router.register(
#     "profile", ProfileDetailView, basename="profile"
# )

urlpatterns = [
    # *router.urls,
    path("profile/", ProfileDetailView.as_view(), name="profile-detail"),
]