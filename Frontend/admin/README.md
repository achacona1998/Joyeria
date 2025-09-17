# Frontend Admin - Sistema de Joyería

## Descripción

Panel de administración desarrollado con React y Vite para la gestión del sistema de joyería. Proporciona una interfaz moderna y responsiva para administradores que permite gestionar productos, usuarios, órdenes y estadísticas del negocio.

## Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes de UI accesibles
- **Tremor** - Componentes para dashboards y gráficos
- **Framer Motion** - Biblioteca de animaciones
- **React Router DOM** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para API
- **Recharts** - Biblioteca de gráficos para React
- **React Icons** - Iconos para React
- **Sonner** - Notificaciones toast

## Características Principales

### 🎨 Interfaz de Usuario
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio
- **Tema Oscuro/Claro**: Soporte completo para modo oscuro
- **Componentes Modernos**: Uso de Radix UI para componentes accesibles
- **Animaciones Fluidas**: Implementadas con Framer Motion
- **Tipografías Personalizadas**: Roboto y Libre Bodoni

### 📊 Dashboard y Analytics
- **Gráficos Interactivos**: Visualización de datos con Recharts
- **Métricas en Tiempo Real**: Estadísticas de ventas y productos
- **Componentes Tremor**: Dashboards profesionales
- **Filtros Avanzados**: Filtrado por fechas, categorías y más

### 🛠️ Gestión de Productos
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Gestión de Imágenes**: Subida múltiple de imágenes
- **Categorización**: Gestión por tipos de joyería
- **Control de Inventario**: Seguimiento de stock y disponibilidad
- **Estados de Publicación**: Control de visibilidad pública/privada

### 👥 Gestión de Usuarios
- **Autenticación JWT**: Sistema seguro de autenticación
- **Roles y Permisos**: Control de acceso basado en roles
- **Perfil de Usuario**: Gestión de información personal

### 📦 Gestión de Órdenes
- **Visualización de Órdenes**: Lista completa de pedidos
- **Detalles de Compra**: Información detallada de cada orden
- **Estados de Pedido**: Seguimiento del estado de las órdenes
- **Reportes de Ventas**: Análisis de ventas y tendencias

## Estructura del Proyecto

```
Frontend/admin/
├── public/              # Archivos públicos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── ui/         # Componentes de UI base
│   │   ├── forms/      # Formularios
│   │   ├── charts/     # Componentes de gráficos
│   │   └── layout/     # Componentes de layout
│   ├── pages/          # Páginas de la aplicación
│   │   ├── Dashboard/  # Panel principal
│   │   ├── Products/   # Gestión de productos
│   │   ├── Orders/     # Gestión de órdenes
│   │   ├── Users/      # Gestión de usuarios
│   │   └── Auth/       # Autenticación
│   ├── hooks/          # Custom hooks
│   ├── services/       # Servicios API
│   ├── utils/          # Utilidades
│   ├── styles/         # Estilos globales
│   └── assets/         # Recursos estáticos
├── package.json        # Dependencias del proyecto
├── vite.config.js      # Configuración de Vite
├── tailwind.config.js  # Configuración de Tailwind
└── eslint.config.js    # Configuración de ESLint
```

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o pnpm

### Pasos de Instalación

1. **Navegar al directorio del admin**
   ```bash
   cd Frontend/admin
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_AUTH_URL=http://localhost:8000/auth
   VITE_MEDIA_URL=http://localhost:8000/media
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

5. **Acceder a la aplicación**
   Abrir [http://localhost:5174](http://localhost:5174) en el navegador

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Construye para producción
npm run preview      # Vista previa de la construcción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## Configuración de Tailwind CSS

### Breakpoints Personalizados
```javascript
screens: {
  Mobile: "390px",
  Tablet: "768px",
  Laptop: "1280px",
  Desktop: "1920px",
  DesktopHd: "2560px",
}
```

### Tipografías
```javascript
fontFamily: {
  roboto: ["Roboto", "sans-serif"],
  bodoni: ["Bodoni Moda", "serif"],
}
```

## Componentes Principales

### Dashboard
- **Métricas Clave**: Ventas, productos, usuarios
- **Gráficos de Tendencias**: Ventas por período
- **Actividad Reciente**: Últimas órdenes y productos
- **Alertas**: Notificaciones importantes

### Gestión de Productos
- **Lista de Productos**: Tabla con filtros y búsqueda
- **Formulario de Producto**: Creación y edición
- **Galería de Imágenes**: Gestión visual de imágenes
- **Control de Stock**: Gestión de inventario

### Gestión de Órdenes
- **Lista de Órdenes**: Vista completa de pedidos
- **Detalle de Orden**: Información completa del pedido
- **Estados**: Gestión de estados de pedidos
- **Reportes**: Análisis de ventas

## Integración con API

### Configuración de Axios
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});
```

### Servicios API
- **AuthService**: Autenticación y gestión de tokens
- **ProductService**: CRUD de productos
- **OrderService**: Gestión de órdenes
- **UserService**: Gestión de usuarios
- **AnalyticsService**: Datos para dashboard

## Características de UI/UX

### Componentes Radix UI
- **Dialog**: Modales accesibles
- **Dropdown Menu**: Menús desplegables
- **Toast**: Notificaciones
- **Tabs**: Navegación por pestañas
- **Select**: Selectores personalizados

### Animaciones
- **Page Transitions**: Transiciones entre páginas
- **Loading States**: Estados de carga animados
- **Hover Effects**: Efectos de hover suaves
- **Form Animations**: Animaciones en formularios

### Responsividad
- **Mobile First**: Diseño optimizado para móviles
- **Adaptive Layout**: Layout que se adapta al dispositivo
- **Touch Friendly**: Interfaz optimizada para touch

## Optimización y Performance

### Code Splitting
- **Lazy Loading**: Carga perezosa de componentes
- **Route Splitting**: División por rutas
- **Component Splitting**: División de componentes grandes

### Optimizaciones de Vite
- **Hot Module Replacement**: Recarga rápida en desarrollo
- **Tree Shaking**: Eliminación de código no utilizado
- **Asset Optimization**: Optimización de recursos

## Despliegue

### Construcción para Producción
```bash
npm run build
```

### Variables de Entorno de Producción
```env
VITE_API_URL=https://tu-api.com/api
VITE_AUTH_URL=https://tu-api.com/auth
VITE_MEDIA_URL=https://tu-api.com/media
```

### Configuración de Servidor
- **Nginx**: Configuración para SPA
- **Apache**: Configuración con .htaccess
- **Vercel/Netlify**: Despliegue automático

## Seguridad

### Autenticación
- **JWT Tokens**: Tokens seguros con expiración
- **Refresh Tokens**: Renovación automática
- **Protected Routes**: Rutas protegidas por autenticación

### Validación
- **Form Validation**: Validación del lado del cliente
- **Input Sanitization**: Sanitización de entradas
- **XSS Protection**: Protección contra XSS

## Testing

### Configuración de Tests
```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Ejecutar tests
npm run test
```

## Contribución

### Estándares de Código
- **ESLint**: Configuración estricta
- **Prettier**: Formateo automático
- **Conventional Commits**: Commits semánticos

### Flujo de Trabajo
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Troubleshooting

### Problemas Comunes

**Error de CORS**
```javascript
// Verificar configuración en backend
CORS_ORIGIN_WHITELIST = ['http://localhost:5174']
```

**Error de autenticación**
```javascript
// Verificar token en localStorage
const token = localStorage.getItem('access_token');
console.log('Token:', token);
```

**Problemas de build**
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## Licencia

Este proyecto está bajo la Licencia MIT.

## Contacto

Para soporte técnico o consultas sobre el proyecto, contactar al equipo de desarrollo.