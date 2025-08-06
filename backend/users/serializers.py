from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

# ✅ Login Serializer (JWT Token)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_manager': user.is_manager,
            'full_name': user.full_name if hasattr(user, 'full_name') else ''
        }
        return data

# ✅ Registration Serializer with Email OTP
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, min_length=6)
    mobile = serializers.CharField(required=False)
    is_manager = serializers.BooleanField(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'full_name', 'email', 'mobile', 'password', 'is_manager')

    def validate(self, data):
        if not data.get('email') and not data.get('mobile'):
            raise serializers.ValidationError("Email or mobile is required.")
        if data.get('email') and User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("User with this email already exists.")
        if data.get('mobile') and User.objects.filter(mobile=data['mobile']).exists():
            raise serializers.ValidationError("User with this mobile number already exists.")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            full_name=validated_data['full_name'],
            email=validated_data.get('email'),
            mobile=validated_data.get('mobile'),
            password=validated_data['password'],
            is_manager=validated_data.get('is_manager', False),
            is_active=True
        )
        return user

       
# ✅ Display User Info
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_manager')
