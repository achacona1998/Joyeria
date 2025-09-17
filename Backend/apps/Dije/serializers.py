from rest_framework import serializers
from .models import *


class DijesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dije
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
            'tipo_dije',
            'photo',
            'photo2',
            'photo3',
        ]
