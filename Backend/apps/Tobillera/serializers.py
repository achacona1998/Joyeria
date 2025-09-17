from rest_framework import serializers
from .models import *


class TobillerasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tobillera
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
