import os, random, string

from jinja2 import Template, Environment, FileSystemLoader

from django.contrib.auth import authenticate, login, logout

from django.views import View
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives

from django.shortcuts import render, redirect

from ..profile_app.models import User

from ..mail_client_app.smtp_utils.smtp_client import SMTPServer

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

    user = User.objects.create_user(username=username, password=password, email=email)

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

    template_dir = os.path.join(os.path.dirname(__file__), 'templates/email') 
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template('reset_password_email.html')

    password = generate_password(10)

    html_content = template.render(username=user.username, password=password)

    smtp_server = SMTPServer()
    smtp_server.send_message(f'Ваша учетная запись - {user.username}. Восстановление пароля', '', email, html_content)

    user.set_password(password)
    user.save()

    return JsonResponse({'status': 'success'})

# custom function
def get_object_user(attribute: str, value: str) -> User: 
    try: 
        if attribute == 'username':
            user = User.objects.get(username=value)
        elif attribute == 'email':
            user = User.objects.get(email=value)
        else:
            user = None
        return user
    except User.DoesNotExist: 
        return None
    
def generate_password(length):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for _ in range(length))

    return password