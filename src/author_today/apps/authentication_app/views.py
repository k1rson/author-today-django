from django.contrib.auth import authenticate, login

from django.views import View
from django.http import JsonResponse

from django.shortcuts import render

from ..profile_app.models import User

class AuthorizationPageView(View):
    def get(self, request):
        return render(request, 'registration/login.html')
    
class RegistrationPageView(View):
    def get(self, request):
        return render(request, 'registration/registration.html')
    
class ResetPasswordPageView(View):
    def get(self, request):
        return render(request, 'registration/reset_password.html')
    
# AJAX functions
def check_email(request) -> JsonResponse:
    email = request.POST.get('email')

    try:
        User.objects.get(email=email)
        return JsonResponse({'status': 'error'})
    except:
        return JsonResponse({'status': 'success'})

def check_login(request) -> JsonResponse:
    username = request.POST.get('username')
    user = get_object_user(username)

    if not user: 
        return JsonResponse({'status': 'error'})
    
    return JsonResponse({'status': 'success'})

def check_password(request) -> JsonResponse:
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = get_object_user(username)

    if not user: 
        return JsonResponse({'status': 'error'})
    
    if not user.check_password(password):
        return JsonResponse({'status': 'error'})

    return JsonResponse({'status': 'success'})
    
def authorization_user(request) -> JsonResponse:
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error'})
    
def registration_user(request) -> JsonResponse:
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email') 

    user = User.objects.create_user(username=username, password=password, email=email)

    if user is not None: 
        login(request, user)
        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error'})
    
# custom functions
def get_object_user(username: str) -> User: 
    try: 
        user = User.objects.get(username=username)
        return user
    except: 
        return None