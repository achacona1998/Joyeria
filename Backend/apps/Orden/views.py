from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Orden
from .serializers import OrdenSerializer
from .pagination import SmallSetPagination
from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.Anillo.models import Anillo
from apps.Arete.models import Arete
from apps.Cadena.models import Cadena
from apps.Brazalete.models import Brazalete
from apps.Pircing.models import Pircing
from apps.Tobillera.models import Tobillera
from apps.Dije.models import Dije


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = [
        'nombre',
        'correo',
    ]
    pagination_class = SmallSetPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Si es administrador, devuelve todas las órdenes
            return Orden.objects.all().order_by('-id')
        return Orden.objects.filter(user=user).order_by('-id')

    def get_permissions(self):
        if self.action in ['create']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        with transaction.atomic():
            orden = serializer.save()

            if not orden.items.exists():
                raise ValidationError("No hay artículos en la orden.")

            modelos_productos = {
                'anillo': Anillo,
                'arete': Arete,
                'cadena': Cadena,
                'brazalete': Brazalete,
                'tobillera': Tobillera,
                'pircing': Pircing,
                'dije': Dije,
            }

            for item in orden.items.all():
                tipo_producto = item.tipo_producto.lower().strip()
                modelo_producto = modelos_productos.get(tipo_producto)

                if not modelo_producto:
                    raise ValidationError(
                        f"Tipo de producto '{tipo_producto}' inválido.")

                try:
                    # Busca el producto por su ID único en su tabla
                    producto = modelo_producto.objects.get(id=item.producto_id)

                    if producto.cantUnidades < item.cantidad:
                        raise ValidationError(
                            f"Inventario insuficiente de {producto.name} (ID: {producto.id}). Disponible: {producto.cantUnidades}."
                        )

                    producto.cantUnidades -= item.cantidad
                    producto.save()

                except modelo_producto.DoesNotExist:
                    raise ValidationError(
                        f"Producto con ID {item.producto_id} no encontrado en {tipo_producto}."
                    )
