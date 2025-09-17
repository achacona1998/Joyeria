from django_filters import rest_framework as filters
from rest_framework import viewsets, filters as drf_filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Brazalete
from .serializers import BrazaletesSerializer
from .pagination import SmallSetPagination


class BrazaleteFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    precio_unidad = filters.CharFilter(lookup_expr='icontains')
    pureza = filters.CharFilter(lookup_expr='exact')
    size = filters.CharFilter(lookup_expr='icontains')
    peso_neto = filters.CharFilter(lookup_expr='exact')
    genero_usuario = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Brazalete
        fields = [
            'name',
            'precio_unidad',
            'pureza',
            'size',
            'peso_neto',
            'genero_usuario',
        ]


class BrazaleteViewSet(viewsets.ModelViewSet):
    queryset = Brazalete.objects.all()
    serializer_class = BrazaletesSerializer
    filter_backends = (filters.DjangoFilterBackend, drf_filters.SearchFilter)
    filterset_class = BrazaleteFilter
    search_fields = [
        'name',
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
            return Brazalete.objects.all().order_by('id') 
        # Caso contrario, devuelve solo los públicos
        return Brazalete.objects.filter(es_publico=True).order_by('id') 

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # Permitir acceso público para listar o recuperar objetos
            return [AllowAny()]
        # Requerir autenticación para las demás acciones
        return [IsAuthenticated()]
