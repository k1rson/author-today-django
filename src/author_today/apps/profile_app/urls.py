from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('profile/<int:id>', views.ProfileView.as_view(), name='profile'),
    path('profile/get_info_about_user/<int:id>', views.get_info_about_user, name='get_info_about_user'),
]