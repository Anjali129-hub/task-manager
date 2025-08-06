from django.urls import path, include
from django.contrib import admin
from django.http import JsonResponse, HttpResponse
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from authapi.views import MyTokenObtainPairView

def login_view(request):
    return HttpResponse("<h2>This is a placeholder for the frontend login page. It should be handled by Angular.</h2>")

def root(request):
    return JsonResponse({'message': 'Welcome to the Task Manager API!'})

# Routers
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', root),
    path('login/', login_view),
    path('admin/', admin.site.urls),

    # Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', MyTokenObtainPairView.as_view(), name='custom_token_login'),

    # Users
    path('api/', include('users.urls')),     # ✅ /api/register/, /api/user/me/, etc.

    # Tasks
    path('api/', include(router.urls)),                  # ✅ /api/tasks/

    # AuthAPI
    path('api/auth/', include('authapi.urls')),
]
