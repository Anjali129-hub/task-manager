import random
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

User = get_user_model()

# ✅ Custom JWT login
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ✅ Register View (No OTP, direct activation)
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user_id': user.id, 'message': 'User registered successfully'}, status=201)
        return Response(serializer.errors, status=400)

# ✅ Get All Employees (for assignment dropdown)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_employees(request):
    if request.user.is_manager:
        employees = User.objects.filter(is_manager=False)
        return Response([
            {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "full_name": user.full_name
            } for user in employees
        ])
    return Response({"detail": "Forbidden"}, status=403)

# ✅ Get Current Logged-in User (Fix for Angular `user/me/`)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
