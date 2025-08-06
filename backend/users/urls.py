from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, get_all_employees, get_current_user
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('users/employees/', get_all_employees, name='get_all_employees'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
      path('employees/', get_all_employees, name='get_all_employees'),
       path('me/', get_current_user, name='get_current_user'),
]
