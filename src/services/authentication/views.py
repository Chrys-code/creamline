from django.contrib.auth import logout
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .forms import CustomUserCreationForm

class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_logout(request):
    logout(request)
    return Response({"detail": "Logged out successfully"})

def ajax_login_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"detail": "Unauthorized"}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapper

@ajax_login_required
def current_user(request):
    user = request.user
    return JsonResponse({
        "id": user.id,
        "email": user.email,
    })
