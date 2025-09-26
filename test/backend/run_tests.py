#!/usr/bin/env python
"""
Script para ejecutar tests del backend desde la carpeta test/backend
"""
import os
import sys
import django
from django.conf import settings
from django.test.utils import get_runner

if __name__ == "__main__":
    # Configurar el path del Backend
    backend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'Backend')
    sys.path.insert(0, backend_path)
    
    # Configurar Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test_settings')
    django.setup()
    
    # Ejecutar tests usando Django test runner
    TestRunner = get_runner(settings)
    test_runner = TestRunner()
    
    # Ejecutar tests específicos
    failures = test_runner.run_tests([
        "test_models_django.TestAnilloModel",
        "test_models_django.TestAreteModel", 
        "test_models_django.TestBrazaleteModel",
        "test_models_django.TestCadenaModel",
        "test_models_django.TestDijeModel",
        "test_models_django.TestPircingModel",
        "test_models_django.TestTobilleraModel"
    ])
    
    if failures:
        sys.exit(1)
    else:
        print("¡Todos los tests pasaron exitosamente!")
        sys.exit(0)