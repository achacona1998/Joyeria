from rest_framework import serializers
from .models import *


class PircingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pircing
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
            'lugar_de_uso',
            'photo',
            'photo2',
            'photo3',
        ]
