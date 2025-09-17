from rest_framework import serializers
from .models import *


class ItemOrdenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOrden
        fields = [
            'id',
            'producto_id',
            'nombre_articulo',
            'tipo_producto',
            'cantidad',
            'precio_unitario'
        ]


class OrdenSerializer(serializers.ModelSerializer):
    items = ItemOrdenSerializer(many=True)

    class Meta:
        model = Orden
        fields = [
            'id',
            'nombre',
            'apellidos',
            'tarjeta',
            'total',
            'items'
        ]

    def get_tarjeta(self, obj):
        if obj.tarjeta:
            # Reemplaza todos los dígitos menos los últimos 4 con asteriscos
            return '*' * (len(obj.tarjeta) - 4) + obj.tarjeta[-4:]
        return None

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        orden = Orden.objects.create(**validated_data)
        for item_data in items_data:
            ItemOrden.objects.create(orden=orden, **item_data)
        return orden
