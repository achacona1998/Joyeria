from django.apps import AppConfig


class OrdenConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Orden'

    def ready(self):
        import apps.Orden.signals  # Importa el archivo de señales
