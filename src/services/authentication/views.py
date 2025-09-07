from django.contrib.auth import authenticate, login, logout, get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import views, status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from authentication.serializers import LoginSerializer, SignupSerializer


User = get_user_model()

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]


class LoginView(generics.GenericAPIView):
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
            {"message": _("Invalid credentials")},
            status=status.HTTP_401_UNAUTHORIZED
        )

class LogoutView(views.APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
    
class MeView(views.APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({"email": user.email})
        
        return Response({"message": _("Unauthorized")}, status=status.HTTP_401_UNAUTHORIZED)