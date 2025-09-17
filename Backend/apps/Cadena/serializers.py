from rest_framework import serializers
from .models import *


class CadenasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadena
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
            'photo',
            'photo2',
            'photo3',
        ]
