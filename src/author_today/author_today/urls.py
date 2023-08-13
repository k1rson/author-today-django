from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.main_app.urls'), name='home'), 
    path('', include('apps.authentication_app.urls'), name='account'), 
    path('', include('apps.profile_app.urls'), name='profile'), 
    path('', include('apps.information_pages_app.urls'), name='information_pages'), 
]

if settings.DEBUG: 
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)