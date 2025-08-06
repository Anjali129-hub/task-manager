from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from django.contrib.auth import get_user_model  # ✅ RIGHT
User = get_user_model()

from .emails import send_password_reset_email  # <-- Make sure this exists

# -----------------------
# JWT Token Serializer
# -----------------------
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['is_manager'] = getattr(self.user, 'is_manager', False)
        return data


# -----------------------
# JWT Login View
# -----------------------
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# -----------------------
# Forgot Password View
# -----------------------
@permission_classes([AllowAny])
class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            send_password_reset_email(user)  # <-- Implement this in emails.py
            return Response({'message': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)
@permission_classes([AllowAny])
class ResetPasswordView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        new_password = request.data.get('password')

        try:
            user = User.objects.get(id=user_id)
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password reset successful.'})
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)
