# Backend - Sistema de Joyería

## Descripción

API REST desarrollada con Django y Django REST Framework para la gestión de un sistema de joyería. Proporciona endpoints para la administración de productos de joyería, usuarios y órdenes de compra.

## Tecnologías Utilizadas

- **Python 3.x**
- **Django 5.1.3** - Framework web
- **Django REST Framework** - API REST
- **SQLite** - Base de datos (desarrollo)
- **JWT** - Autenticación
- **Djoser** - Autenticación y gestión de usuarios
- **Django CORS Headers** - Manejo de CORS
- **Pillow** - Procesamiento de imágenes
- **WhiteNoise** - Servir archivos estáticos

## Estructura del Proyecto

```
Backend/
├── apps/
│   ├── Anillo/          # Gestión de anillos
│   ├── Arete/           # Gestión de aretes
│   ├── Brazalete/       # Gestión de brazaletes
│   ├── Cadena/          # Gestión de cadenas
│   ├── Dije/            # Gestión de dijes
│   ├── Pircing/         # Gestión de piercings
│   ├── Tobillera/       # Gestión de tobilleras
│   ├── Mercancia/       # Modelo base para productos
│   ├── User/            # Gestión de usuarios
│   └── Orden/           # Gestión de órdenes
├── joyeria/             # Configuración del proyecto
├── media/               # Archivos multimedia
├── env/                 # Entorno virtual
├── manage.py            # Comando de Django
├── requirements.txt     # Dependencias
└── joyeria.db          # Base de datos SQLite
```

## Modelos Principales

### Mercancia (Modelo Base)
Modelo abstracto que define los campos comunes para todos los productos:
- `name`: Nombre del producto
- `precio_unidad`: Precio por unidad
- `pureza`: Pureza del material
- `size`: Tallas disponibles
- `peso_neto`: Peso del producto
- `es_publico`: Visibilidad del producto
- `genero_usuario`: Género objetivo (unisex, female, male)
- `cantUnidades`: Cantidad en inventario

### Productos Específicos
Cada tipo de joyería hereda de `Mercancia` y añade campos específicos:

- **Anillo**: `lugar_de_uso`, `cantidad`, `tipo_anillo`
- **Pircing**: `lugar_de_uso`
- **Otros**: Campos básicos de `Mercancia`

### UserAccount
Modelo personalizado de usuario:
- `email`: Email único (campo de login)
- `first_name`: Nombre
- `last_name`: Apellido
- `is_active`: Estado activo
- `is_staff`: Permisos de administrador

### Orden
Sistema de órdenes de compra:
- `nombre`: Nombre del cliente
- `apellidos`: Apellidos del cliente
- `tarjeta`: Información de tarjeta
- `total`: Total de la orden
- `items`: Productos incluidos (ItemOrden)

## Instalación y Configuración

### Prerrequisitos
- Python 3.8+
- pip

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Backend
   ```

2. **Crear entorno virtual**
   ```bash
   python -m venv env
   ```

3. **Activar entorno virtual**
   ```bash
   # Windows
   env\Scripts\activate
   
   # Linux/Mac
   source env/bin/activate
   ```

4. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configurar variables de entorno**
   Crear archivo `.env` en la carpeta `joyeria/`:
   ```env
   SECRET_KEY=tu_clave_secreta_aqui
   DOMAIN=localhost
   ALLOWED_HOSTS_DEV=localhost,127.0.0.1
   CORS_ORIGIN_WHITELIST_DEV=http://localhost:5173,http://localhost:5174
   CSRF_TRUSTED_ORIGINS_DEV=http://localhost:5173,http://localhost:5174
   ```

6. **Ejecutar migraciones**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Crear superusuario**
   ```bash
   python manage.py createsuperuser
   ```

8. **Ejecutar servidor de desarrollo**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Autenticación
- `POST /auth/users/` - Registro de usuario
- `POST /auth/jwt/create/` - Login (obtener token)
- `POST /auth/jwt/refresh/` - Refrescar token
- `POST /auth/jwt/verify/` - Verificar token

### Productos
Cada tipo de producto tiene endpoints CRUD completos:
- `GET /api/anillos/` - Listar anillos
- `POST /api/anillos/` - Crear anillo (requiere autenticación)
- `GET /api/anillos/{id}/` - Detalle de anillo
- `PUT /api/anillos/{id}/` - Actualizar anillo (requiere autenticación)
- `DELETE /api/anillos/{id}/` - Eliminar anillo (requiere autenticación)

Endpoints similares para: `aretes`, `brazaletes`, `cadenas`, `dijes`, `pircings`, `tobilleras`

### Órdenes
- `GET /api/ordenes/` - Listar órdenes
- `POST /api/ordenes/` - Crear orden
- `GET /api/ordenes/{id}/` - Detalle de orden

## Características

### Autenticación JWT
- Tokens de acceso con duración de 7 días
- Tokens de refresco con duración de 30 días
- Rotación automática de tokens
- Blacklist de tokens después de rotación

### Permisos
- **Usuarios públicos**: Solo lectura de productos públicos
- **Usuarios autenticados**: CRUD completo en productos
- **Administradores**: Acceso a todos los productos (públicos y privados)

### Filtros y Búsqueda
- Filtrado por múltiples campos
- Búsqueda de texto en campos relevantes
- Paginación automática

### Gestión de Archivos
- Subida de imágenes para productos (3 imágenes por producto)
- Organización automática en carpetas por tipo de producto
- Servicio de archivos estáticos con WhiteNoise

## Configuración de Producción

### Variables de Entorno Requeridas
```env
SECRET_KEY=clave_secreta_segura
DEBUG=False
ALLOWED_HOSTS_PROD=tu-dominio.com
CORS_ORIGIN_WHITELIST_PROD=https://tu-frontend.com
CSRF_TRUSTED_ORIGINS_PROD=https://tu-frontend.com
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

### Base de Datos
Para producción, configurar PostgreSQL en `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'joyeria_db',
        'USER': 'tu_usuario',
        'PASSWORD': 'tu_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Comandos Útiles

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver

# Ejecutar tests
python manage.py test

# Recopilar archivos estáticos
python manage.py collectstatic

# Acceder al shell de Django
python manage.py shell
```

## Estructura de Respuestas API

### Producto (ejemplo Anillo)
```json
{
  "id": 1,
  "name": "Anillo de Oro",
  "precio_unidad": 150.00,
  "pureza": "18",
  "size": "6,7,8",
  "peso_neto": "3.5",
  "es_publico": true,
  "genero_usuario": "unisex",
  "cantUnidades": 10,
  "lugar_de_uso": "mano",
  "cantidad": "simple",
  "tipo_anillo": "normal",
  "photo": "/media/Anillo/Anillo_de_Oro/imagen1.jpg",
  "photo2": "/media/Anillo/Anillo_de_Oro/imagen2.jpg",
  "photo3": "/media/Anillo/Anillo_de_Oro/imagen3.jpg"
}
```

### Orden
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "tarjeta": "****-****-****-1234",
  "total": "450.00",
  "items": [
    {
      "producto_id": 1,
      "nombre_articulo": "Anillo de Oro",
      "tipo_producto": "anillo",
      "cantidad": 2,
      "precio_unitario": "150.00"
    }
  ]
}
```

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## Contacto

Para soporte técnico o consultas sobre el proyecto, contactar al equipo de desarrollo.