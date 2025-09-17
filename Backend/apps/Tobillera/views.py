from django_filters import rest_framework as filters
from rest_framework import viewsets, filters as drf_filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Tobillera
from .serializers import TobillerasSerializer
from .pagination import SmallSetPagination


class TobilleraFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    precio_unidad = filters.CharFilter(lookup_expr='icontains')
    pureza = filters.CharFilter(lookup_expr='exact')
    size = filters.CharFilter(lookup_expr='icontains')
    peso_neto = filters.CharFilter(lookup_expr='exact')
    genero_usuario = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Tobillera
        fields = [
            'name',
            'precio_unidad',
            'pureza',
            'size',
            'peso_neto',
            'genero_usuario',
        ]


class TobilleraViewSet(viewsets.ModelViewSet):
    queryset = Tobillera.objects.all()
    serializer_class = TobillerasSerializer
    filter_backends = (filters.DjangoFilterBackend, drf_filters.SearchFilter)
    filterset_class = TobilleraFilter
    search_fields = [
        'name',
        'estado',
        'precio_unidad',
        'pureza',
        'size',
        'peso_neto',
        'genero_usuario',
    ]
    pagination_class = SmallSetPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Si es administrador, devuelve todos los objetos
            return Tobillera.objects.all().order_by('id')
        # Caso contrario, devuelve solo los públicos
        return Tobillera.objects.filter(es_publico=True).order_by('id')

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # Permitir acceso público para listar o recuperar objetos
            return [AllowAny()]
        # Requerir autenticación para las demás acciones
        return [IsAuthenticated()]
