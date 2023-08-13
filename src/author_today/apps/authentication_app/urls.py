from django.contrib import admin
from django.urls import path

from . import views
from ..main_app import views as home_views

urlpatterns = [
    path('', home_views.HomePageView.as_view(), name='home'),
    
    path('account/login', views.AuthorizationPageView.as_view(), name='login'),
    path('account/registration', views.RegistrationPageView.as_view(), name='registration'),
    path('account/reset_password', views.ResetPasswordPageView.as_view(), name='reset_password'),
    
    path('account/check_login', views.check_login, name='check_login'), 
    path('account/check_password', views.check_password, name='check_password'),
    path('account/check_email', views.check_email, name='check_email'), 
    path('account/auth_user', views.authorization_user, name='auth_user'), 
    path('account/registr_user', views.registration_user, name='registr_user'), 
    path('account/logout_user', views.logout_user, name='logout_user'), 
    path('account/check_possibility_reset', views.check_possibility_reset, name='check_possibility_reset'), 
    path('account/reset_password_user', views.reset_password, name='reset_password_user'), 
]