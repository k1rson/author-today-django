from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('profile/<int:id>', views.ProfileView.as_view(), name='profile'),
    
]