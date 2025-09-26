"""
Django settings for testing
"""
import os
import sys

# Add the Backend directory to Python path
backend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'Backend')
sys.path.insert(0, backend_path)

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.admin',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
    'djoser',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'apps.Anillo',
    'apps.Arete',
    'apps.Brazalete',
    'apps.Cadena',
    'apps.Dije',
    'apps.Orden',
    'apps.Pircing',
    'apps.Tobillera',
    'apps.User',
    'apps.Mercancia',
]

SECRET_KEY = 'test-secret-key-for-testing-only'

USE_TZ = True

ROOT_URLCONF = 'joyeria.urls'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# Test specific settings
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

# Disable migrations for faster tests
class DisableMigrations:
    def __contains__(self, item):
        return True
    
    def __getitem__(self, item):
        return None

MIGRATION_MODULES = DisableMigrations()

# Usuario personalizado
AUTH_USER_MODEL = 'User.UserAccount'

# Configuración de archivos estáticos
STATIC_URL = '/static/'
MEDIA_URL = '/media/'

# Configuración de idioma
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True

# Campo por defecto
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Configuración de email para tests
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

# Configuración de JWT
from datetime import timedelta
SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT', ),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10080),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
    )
}

# Configuración de Djoser
DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'SERIALIZERS': {
        'user_create': 'apps.User.serializers.UserSerializer',
        'user': 'apps.User.serializers.UserSerializer',
        'current_user': 'apps.User.serializers.UserSerializer',
    },
}

# Templates
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