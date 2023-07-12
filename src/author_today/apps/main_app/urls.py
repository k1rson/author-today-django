from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),

    # AJAX URLS
    path('ajax/books', views.get_books, name='get_books'),
]