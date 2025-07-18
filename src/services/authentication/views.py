from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

User = get_user_model()


class SignupView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"detail": "email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"detail": "email already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user( email=email, password=password)
        user.save()

        return Response({"detail": "User created successfully"}, status=status.HTTP_201_CREATED)


class LoginView(views.APIView):
    permission_classes = [AllowAny]
	
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)

        if user:
            login(request, user)
            return Response({"detail": "Logged in"})
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    

class LogoutView(views.APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "Logged out"})
    

class MeView(views.APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({"email": user.email})
        
        return Response({"detail": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)