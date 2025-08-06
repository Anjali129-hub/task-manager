from rest_framework_simplejwt.tokens import RefreshToken

from backend.users import serializers

class MyToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token['username'] = user.username
        token['is_manager'] = user.is_staff  # or your custom role check
        return token
def validate(self, attrs):
    data = super().validate(attrs)

    if not self.user.is_email_verified:
        raise serializers.ValidationError("Please verify your email before login.")
    
    return data
