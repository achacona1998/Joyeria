from rest_framework import serializers
from .models import *


class AnillosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anillo
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
            'cantidad',
            'tipo_anillo',
            'photo',
            'photo2',
            'photo3',
        ]
