from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)  # ✅ Add this to ensure unique email logins
    is_manager = models.BooleanField(default=False)
    email_otp = models.CharField(max_length=6, blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    mobile = models.CharField(max_length=15, blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True)
    
    USERNAME_FIELD = 'username'  
    REQUIRED_FIELDS = []  
    
    def __str__(self):
        return self.email

