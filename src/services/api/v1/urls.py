from django.urls import path
from rest_framework.routers import DefaultRouter

from api.v1.profile.views import ProfileDetailView
from api.v1.producer.views import ProducerViewSet

router = DefaultRouter()
router.register(
    "producer", ProducerViewSet, basename="producer"
)

urlpatterns = [
    *router.urls,
    path("profile/", ProfileDetailView.as_view(), name="profile-detail"),
]