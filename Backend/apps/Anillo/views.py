from django_filters import rest_framework as filters
from rest_framework import viewsets, filters as drf_filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Anillo
from .serializers import AnillosSerializer
from .pagination import SmallSetPagination


class AnilloFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    precio_unidad = filters.CharFilter(lookup_expr='icontains')
    pureza = filters.CharFilter(lookup_expr='exact')
    size = filters.CharFilter(lookup_expr='icontains')
    peso_neto = filters.CharFilter(lookup_expr='exact')
    genero_usuario = filters.CharFilter(lookup_expr='exact')
    lugar_de_uso = filters.CharFilter(lookup_expr='exact')
    tipo_anillo = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Anillo
        fields = [
            'name',
            'precio_unidad',
            'pureza',
            'size',
            'peso_neto',
            'genero_usuario',
            'lugar_de_uso',
            'tipo_anillo',
        ]


class AnilloViewSet(viewsets.ModelViewSet):
    queryset = Anillo.objects.all()
    serializer_class = AnillosSerializer
    filter_backends = (filters.DjangoFilterBackend, drf_filters.SearchFilter)
    filterset_class = AnilloFilter
    search_fields = [
        'name',
        'precio_unidad',
        'pureza',
        'size',
        'peso_neto',
        'genero_usuario',
        'lugar_de_uso',
        'cantidad',
        'tipo_anillo',
    ]
    pagination_class = SmallSetPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Si es administrador, devuelve todos los objetos
            return Anillo.objects.all().order_by('id')
        # Caso contrario, devuelve solo los públicos
        return Anillo.objects.filter(es_publico=True).order_by('id')

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # Permitir acceso público para listar o recuperar objetos
            return [AllowAny()]
        # Requerir autenticación para las demás acciones
        return [IsAuthenticated()]
