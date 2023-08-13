from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('information/about_us', views.AboutUsView.as_view(), name='about_us'),
    path('information/background_information', views.BackInfoView.as_view(), name='background_information'),
    path('information/public_offer', views.PublicOfferView.as_view(), name='public_offer'),
    path('information/rules', views.RulesView.as_view(), name='rules'),
    path('information/user_agreement', views.UserAgreementView.as_view(), name='user_agreement'),
    
]