from django.contrib.auth import authenticate, login, logout, get_user_model
from django.utils.translation import gettext_lazy as _

from rest_framework import views, status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from apps.authentication.serializers import LoginSerializer
from apps.authentication.throttles import LoginRateThrottle

User = get_user_model()


class LoginView(generics.GenericAPIView):
    throttle_classes = [LoginRateThrottle]

    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            request,
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )

        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)

        return Response(
            {"detail": _("Invalid credentials")}, status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class SessionCheckView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, _request):
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetRolesView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {}
        data["groups"] = list(request.user.groups.values_list("name", flat=True))
        data["permissions"] = list(request.user.get_all_permissions())

        return Response(data, status=status.HTTP_200_OK)
