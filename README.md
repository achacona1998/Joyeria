# Sistema de Joyería - E-commerce Completo

## Descripción General

Sistema completo de comercio electrónico para joyería desarrollado con arquitectura moderna de microservicios. Incluye backend API REST con Django, panel de administración y tienda online con React, proporcionando una solución integral para la gestión y venta de productos de joyería.

## Arquitectura del Sistema

```
Joyeria/
├── Backend/                 # API REST con Django
│   ├── Joyeria/            # Configuración principal
│   ├── User/               # Gestión de usuarios
│   ├── Mercancia/          # Modelo base de productos
│   ├── Anillo/             # Gestión de anillos
│   ├── Arete/              # Gestión de aretes
│   ├── Brazalete/          # Gestión de brazaletes
│   ├── Pircing/            # Gestión de piercings
│   ├── Tobillera/          # Gestión de tobilleras
│   ├── Orden/              # Gestión de órdenes
│   └── media/              # Archivos multimedia
├── Frontend/
│   ├── admin/              # Panel de administración
│   └── joyeria/            # Tienda online (cliente)
└── docs/                   # Documentación del proyecto
```

## Tecnologías Utilizadas

### Backend (Django REST API)
- **Django 5.1.4** - Framework web de Python
- **Django REST Framework** - API REST robusta
- **PostgreSQL** - Base de datos principal
- **Django CORS Headers** - Manejo de CORS
- **Pillow** - Procesamiento de imágenes
- **Python 3.11+** - Lenguaje de programación

### Frontend Admin (React)
- **React 18.3.1** - Biblioteca de UI
- **Vite** - Herramienta de desarrollo
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP
- **React Router DOM** - Enrutamiento

### Frontend Cliente (React)
- **React 18.3.1** - Biblioteca de UI
- **Vite** - Herramienta de desarrollo
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones
- **Axios** - Cliente HTTP
- **React Router DOM** - Enrutamiento

## Características Principales

### 🔧 Backend API
- **API REST Completa**: Endpoints para todos los recursos
- **Autenticación JWT**: Sistema seguro de autenticación
- **Gestión de Usuarios**: Registro, login y perfiles
- **Catálogo de Productos**: CRUD completo para joyería
- **Sistema de Órdenes**: Gestión completa de pedidos
- **Upload de Imágenes**: Manejo de archivos multimedia
- **Filtros Avanzados**: Búsqueda y filtrado de productos
- **Validaciones**: Validación robusta de datos

### 👨‍💼 Panel de Administración
- **Dashboard Ejecutivo**: Métricas y estadísticas
- **Gestión de Productos**: CRUD completo de inventario
- **Gestión de Órdenes**: Seguimiento de pedidos
- **Gestión de Usuarios**: Administración de clientes
- **Reportes**: Análisis de ventas y productos
- **Configuración**: Ajustes del sistema

### 🛍️ Tienda Online
- **Catálogo Interactivo**: Navegación intuitiva
- **Carrito de Compras**: Gestión completa de compras
- **Proceso de Checkout**: Flujo de compra optimizado
- **Búsqueda Avanzada**: Filtros por categoría, precio, etc.
- **Responsive Design**: Optimizado para todos los dispositivos
- **Animaciones**: Experiencia de usuario fluida

## Modelos de Datos

### Productos de Joyería
- **Mercancia** (Modelo base abstracto)
  - Nombre, precio, pureza, talla, peso
  - Género de usuario, visibilidad pública
  - Timestamps de creación y actualización

- **Categorías Específicas**
  - **Anillo**: Hereda de Mercancia
  - **Arete**: Hereda de Mercancia
  - **Brazalete**: Hereda de Mercancia
  - **Pircing**: Hereda de Mercancia
  - **Tobillera**: Hereda de Mercancia

### Sistema de Usuarios
- **UserAccount**: Usuario personalizado
  - Email como identificador único
  - Nombres, apellidos, teléfono
  - Estado activo, staff, superuser

### Sistema de Órdenes
- **Orden**: Gestión de pedidos
  - Usuario, productos, cantidades
  - Estados de orden, totales
  - Información de envío

## Instalación y Configuración

### Prerrequisitos
- Python 3.11+
- Node.js 18+
- PostgreSQL 13+
- Git

### Configuración del Backend

1. **Clonar repositorio**
   ```bash
   git clone <repository-url>
   cd Joyeria
   ```

2. **Configurar entorno virtual**
   ```bash
   cd Backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar base de datos**
   ```bash
   # Crear archivo .env con configuraciones
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Ejecutar servidor**
   ```bash
   python manage.py runserver
   ```

### Configuración del Frontend Admin

1. **Navegar al directorio**
   ```bash
   cd Frontend/admin
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Ejecutar aplicación**
   ```bash
   npm run dev
   ```

### Configuración del Frontend Cliente

1. **Navegar al directorio**
   ```bash
   cd Frontend/joyeria
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_MEDIA_URL=http://localhost:8000/media
   ```

4. **Ejecutar aplicación**
   ```bash
   npm run dev
   ```

## URLs de Acceso

- **Backend API**: http://localhost:8000/
- **Admin Django**: http://localhost:8000/admin/
- **Panel Admin**: http://localhost:5173/ (Frontend/admin)
- **Tienda Cliente**: http://localhost:5174/ (Frontend/joyeria)

## API Endpoints

### Autenticación
```
POST /api/auth/login/          # Iniciar sesión
POST /api/auth/register/       # Registrar usuario
POST /api/auth/logout/         # Cerrar sesión
GET  /api/auth/user/           # Obtener usuario actual
```

### Productos
```
GET    /api/anillos/           # Listar anillos
POST   /api/anillos/           # Crear anillo
GET    /api/anillos/{id}/      # Obtener anillo
PUT    /api/anillos/{id}/      # Actualizar anillo
DELETE /api/anillos/{id}/      # Eliminar anillo

# Similar para: aretes, brazaletes, piercings, tobilleras
```

### Órdenes
```
GET    /api/ordenes/           # Listar órdenes
POST   /api/ordenes/           # Crear orden
GET    /api/ordenes/{id}/      # Obtener orden
PUT    /api/ordenes/{id}/      # Actualizar orden
```

## Estructura de Respuestas API

### Respuesta Exitosa
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Anillo de Oro",
    "precio_unidad": 150.00,
    "pureza": "18k",
    "size": "M",
    "peso_neto": 5.2,
    "es_publico": true,
    "genero_usuario": "unisex"
  }
}
```

### Respuesta de Error
```json
{
  "status": "error",
  "message": "Producto no encontrado",
  "code": 404
}
```

## Despliegue en Producción

### Backend (Django)
```bash
# Configurar variables de entorno
export DEBUG=False
export DATABASE_URL=postgresql://...
export SECRET_KEY=...

# Recopilar archivos estáticos
python manage.py collectstatic

# Ejecutar con Gunicorn
gunicorn Joyeria.wsgi:application
```

### Frontend
```bash
# Construir para producción
npm run build

# Servir archivos estáticos
# Configurar servidor web (Nginx/Apache)
```

## Testing

### Backend Tests
```bash
cd Backend
python manage.py test
```

### Frontend Tests
```bash
cd Frontend/admin
npm run test

cd Frontend/joyeria
npm run test
```

## Seguridad

### Medidas Implementadas
- **Autenticación JWT**: Tokens seguros
- **CORS Configurado**: Orígenes permitidos
- **Validación de Datos**: Sanitización de entradas
- **HTTPS**: Comunicación encriptada (producción)
- **Variables de Entorno**: Configuraciones sensibles

### Configuraciones de Seguridad
```python
# settings.py
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
```

## Monitoreo y Logs

### Logging
```python
# Configuración de logs en Django
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'joyeria.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

## Contribución

### Flujo de Trabajo
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- **Python**: PEP 8, Black formatter
- **JavaScript**: ESLint, Prettier
- **Commits**: Conventional Commits
- **Documentación**: Docstrings y comentarios

## Roadmap

### Próximas Características
- [ ] **Sistema de Pagos**: Integración con pasarelas
- [ ] **Notificaciones**: Email y push notifications
- [ ] **Inventario Avanzado**: Control de stock
- [ ] **Reportes Avanzados**: Analytics y métricas
- [ ] **API GraphQL**: Alternativa a REST
- [ ] **Aplicación Móvil**: React Native
- [ ] **Realidad Aumentada**: Prueba virtual
- [ ] **Chatbot**: Soporte automatizado

## Soporte y Documentación

### Documentación Adicional
- [Backend README](./Backend/README.md)
- [Frontend Admin README](./Frontend/admin/README.md)
- [Frontend Cliente README](./Frontend/joyeria/README.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

### Contacto

Para soporte técnico, reportar bugs o solicitar nuevas características:
- **Email**: soporte@joyeria.com
- **Issues**: GitHub Issues
- **Documentación**: Wiki del proyecto

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ para la industria de la joyería**