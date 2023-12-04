import os

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-7#*ou^z%srva86$c8hhqe+q38oo84%z%9_#c_%@on!f29--ci*'

ALLOWED_HOSTS = ['localhost', '*']

DEBUG = True

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'djmoney',
    'apps.main_app.apps.MainAppConfig', 
    'apps.profile_app.apps.ProfileAppConfig',
    'apps.authentication_app.apps.AuthenticationAppConfig',
    'apps.information_pages_app.apps.InformationPagesAppConfig',
    'apps.mail_client_app.apps.MailClientAppConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'author_today.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'author_today.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'author_today',
        'USER': 'postgres',
        'PASSWORD': 'nn200205131189nn',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

AUTH_USER_MODEL = 'profile_app.User'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# IMAP CONFIGURATION
IMAP_SERVER = 'imap.mail.ru'
IMAP_PORT = 993
IMAP_USERNAME = 'sup-author-today@bk.ru'
IMAP_PASSWORD = 'kCf1su4UvhmmxpM5bfCr'

# SMTP CONFIGURATION
SMTP_SERVER = 'smtp.mail.ru'
SMTP_PORT = 465 
SMTP_USERNAME = 'sup-author-today@bk.ru'
SMTP_PASSWORD = 'kCf1su4UvhmmxpM5bfCr'