from django.shortcuts import render
from rest_framework import viewsets
from .models import Roles
from .serializers import RolesSerializer

class RolesView(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer