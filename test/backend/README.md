# Tests del Backend - Sistema de Joyería

Este directorio contiene todos los tests para el backend del sistema de joyería.

## Estructura de Tests

```
test/backend/
├── __init__.py
├── conftest.py              # Configuración de pytest
├── pytest.ini              # Configuración de pytest
├── test_settings.py         # Configuración de Django para tests
├── requirements.txt         # Dependencias de testing
├── test_models_django.py    # Tests de modelos del sistema
├── run_tests.py            # Script para ejecutar tests específicos
├── run_all_tests.py        # Script para ejecutar todos los tests
└── README.md               # Este archivo
```

## Configuración Inicial

### 1. Instalar Dependencias

Primero, instala las dependencias del backend:
```bash
pip install -r ../../Backend/requirements.txt
```

Luego, instala las dependencias específicas de testing:
```bash
pip install -r requirements.txt
```

### 2. Configuración de Django

Los tests están configurados para usar `test_settings.py` que incluye:
- Base de datos en memoria SQLite para tests rápidos
- Configuración específica para testing
- Todas las apps necesarias del proyecto

## Ejecutar Tests

### Opción 1: Ejecutar Todos los Tests
```bash
python run_all_tests.py
```

### Opción 2: Ejecutar Tests Específicos
```bash
python run_tests.py
```

## Tests Disponibles

El archivo `test_models_django.py` contiene tests unitarios para todos los modelos de joyería:

- **Anillo**: Creación, representación string y valores por defecto
- **Arete**: Creación y valores por defecto  
- **Brazalete**: Creación y valores por defecto
- **Cadena**: Creación y valores por defecto
- **Dije**: Creación y valores por defecto
- **Pircing**: Creación y valores por defecto
- **Tobillera**: Creación y valores por defecto

**Total**: 15 tests que validan la funcionalidad básica de todos los modelos.

## Resultados Esperados

Cuando ejecutes los tests, deberías ver algo como:
```
Found 15 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...............
----------------------------------------------------------------------
Ran 15 tests in 0.006s

OK
Destroying test database for alias 'default'...
¡Todos los tests pasaron exitosamente!
```

## Notas Importantes

1. **Ubicación**: Los tests ahora se ejecutan desde `test/backend` en lugar de `Backend/`
2. **Configuración**: Se usa `test_settings.py` para la configuración de Django
3. **Base de Datos**: Se crea una base de datos temporal para cada ejecución de tests
4. **Dependencias**: Asegúrate de tener instaladas todas las dependencias antes de ejecutar

## Solución de Problemas

### Error: "No module named 'apps'"
- Asegúrate de haber instalado las dependencias del backend: `pip install -r ../../Backend/requirements.txt`

### Error: "ImproperlyConfigured"
- Verifica que `test_settings.py` esté configurado correctamente
- Usa los scripts proporcionados (`run_tests.py` o `run_all_tests.py`)

### Tests Fallan
- Revisa que los datos de prueba sean válidos según los modelos
- Verifica que los campos `genero_usuario` usen valores válidos: "male", "female", "unisex"
- Verifica que los campos `lugar_de_uso` usen valores válidos según cada modelo