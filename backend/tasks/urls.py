from django.urls import path, include
from rest_framework.routers import DefaultRouter

from backend.users.views import get_current_user
from .views import TaskViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
     path('admin/', admin.site.urls),
     path('api/auth/', include('authapi.urls')), 
    path('api/user/me/', get_current_user),
    path('api/tasks/summary/', task_summary), 
]


