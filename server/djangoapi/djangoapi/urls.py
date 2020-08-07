from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/api/', include('users.urls')),
    path('v1/api/', include('projectdetails.urls')),
    path('v1/api/', include('roles.urls')),
]
