"""
Configuración de pytest para tests del backend Django
"""
import pytest

# Automatically mark all tests with django_db
def pytest_collection_modifyitems(config, items):
    """Automatically mark all tests with django_db"""
    for item in items:
        item.add_marker(pytest.mark.django_db)

@pytest.fixture(scope='session')
def django_db_setup():
    """Configurar la base de datos para tests"""
    from django.core.management import call_command
    call_command('migrate', verbosity=0, interactive=False)

@pytest.fixture
def api_client():
    """Cliente de API para tests"""
    from rest_framework.test import APIClient
    return APIClient()

@pytest.fixture
def authenticated_user():
    """Usuario autenticado para tests"""
    from django.contrib.auth.models import User
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    return user

@pytest.fixture
def authenticated_api_client(api_client, authenticated_user):
    """Cliente de API autenticado"""
    api_client.force_authenticate(user=authenticated_user)
    return api_client