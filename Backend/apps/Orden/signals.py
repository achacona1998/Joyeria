from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=Orden)
def calcular_total_orden(sender, instance, created, **kwargs):
    if created:  # Solo calcular el total al crear una nueva orden
        total = sum(item.cantidad *
                    item.precio_unitario for item in instance.items.all())
        instance.total = total
        instance.save()  # Guarda el total actualizado
