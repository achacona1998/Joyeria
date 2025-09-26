#!/usr/bin/env python
"""Script para ejecutar todos los tests desde la carpeta test/backend"""
import os
import sys
import django
from django.conf import settings
from django.test.utils import get_runner

if __name__ == "__main__":
    # Agregar el directorio del backend al path
    backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'Backend'))
    sys.path.insert(0, backend_path)
    
    # Configurar Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test_settings')
    django.setup()
    
    # Obtener el test runner
    TestRunner = get_runner(settings)
    test_runner = TestRunner()
    
    # Ejecutar todos los tests en el directorio actual
    failures = test_runner.run_tests(["."])
    
    if failures:
        print(f"¡{failures} test(s) fallaron!")
        sys.exit(1)
    else:
        print("¡Todos los tests pasaron exitosamente!")
        sys.exit(0)