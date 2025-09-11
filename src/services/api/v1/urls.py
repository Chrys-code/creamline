from django.urls import path
from rest_framework.routers import DefaultRouter

from api.v1.profile.views import ProfileDetailView
from api.v1.producer.views import ProducerViewSet
from api.v1.milk.views import MilkViewSet

router = DefaultRouter()
router.register(
    "producer", ProducerViewSet, basename="producer",
)
router.register(
    "milk", MilkViewSet, basename="milk",
)

urlpatterns = [
    *router.urls,
    path("profile/", ProfileDetailView.as_view(), name="profile-detail"),
]