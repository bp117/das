from django.shortcuts import render
from rest_framework import viewsets
from .models import ProjectDetails
from .serializers import ProjectDetailsSerializer

class ProjectDetailsView(viewsets.ModelViewSet):
    queryset = ProjectDetails.objects.all()
    serializer_class = ProjectDetailsSerializer