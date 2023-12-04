from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect

from django.views import View
from django.http import JsonResponse

from ..profile_app.models import User

from ..mail_client_app.utils import TemplateGenerator
from ..mail_client_app.smtp_utils.smtp_client import SMTPServer

from .service.services import get_object_user, generate_password

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
    user = get_object_user('email', email)

    if not user: 
        return JsonResponse({'status': 'error'})
    
    return JsonResponse({'status': 'success'})

def check_login(request) -> JsonResponse:
    username = request.POST.get('username')
    user = get_object_user('username', username)

    if not user: 
        return JsonResponse({'status': 'error'})
    
    return JsonResponse({'status': 'success'})

def check_password(request) -> JsonResponse:
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = get_object_user('username', username)

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

    user = User.objects.create_user(username=username, password=password, email=email,
        exp_reader=0, exp_writer=0, lvl_reader=1, lvl_writer=1, role=1)

    if user is not None: 
        login(request, user)
        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error'})
    
def logout_user(request) -> JsonResponse:
    logout(request)
    
    return redirect('home')

def check_possibility_reset(request) -> JsonResponse:
    email = request.POST.get('email')
    user = get_object_user('email', email)

    if not user: 
        return JsonResponse({'status': 'error'})
    
    data = {
        'avatar_url': user.avatar.url if user.avatar else None,
        'username': user.username
    }

    return JsonResponse({'status': 'success', 'data': data})

def reset_password(request) -> JsonResponse:
    email = request.POST.get('email')
    user = get_object_user('email', email)

    if not user:
        return JsonResponse({'status': 'error'})
    
    password = generate_password(10)

    context = {
        'username': user.username,
        'password': password
    }
    
    template_generator = TemplateGenerator('reset_password_email.html')
    html_content = template_generator.generate_html_content(context)

    smtp_server = SMTPServer()
    smtp_server.send_message(f'Ваша учетная запись - {user.username}. Восстановление пароля', '', email, html_content)

    user.set_password(password)
    user.save()

    return JsonResponse({'status': 'success'})