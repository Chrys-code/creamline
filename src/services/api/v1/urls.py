from django.urls import path
from rest_framework.routers import DefaultRouter

from api.v1.storage.views import StorageViewSet
from api.v1.profile.views import ProfileDetailView
from api.v1.pasteur.views import PasteurViewSet
from api.v1.pasteurised_milk.views import PasteurisedMilkViewSet
from api.v1.producer.views import ProducerViewSet
from api.v1.product_definition.views import ProductDefinitionViewSet
from api.v1.users.views import UserViewSet
from api.v1.milk.views import MilkViewSet

router = DefaultRouter()
router.register(
    "producer", ProducerViewSet, basename="producer",
)
router.register(
    "storage", StorageViewSet, basename="storage",
)
router.register(
    "milk", MilkViewSet, basename="milk",
)
router.register(
    "pasteur", PasteurViewSet, basename="pasteur",
)
router.register(
    "pasteurised-milk", PasteurisedMilkViewSet, basename="pasteurised-milk",
)
router.register(
    "product-definition", ProductDefinitionViewSet, basename="product-definition",
)
router.register(
    "users", UserViewSet, basename="users",
)


urlpatterns = [
    *router.urls,
    path("profile/", ProfileDetailView.as_view(), name="profile-detail"),
]
