from rest_framework import serializers
from .models import *


class AretesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arete
        fields = [
            'id',
            'name',
            'es_publico',
            'precio_unidad',
            'pureza',
            'size',
            'peso_neto',
            'genero_usuario',
            'cantUnidades',
            'unidades',
            'photo',
            'photo2',
            'photo3',
        ]
