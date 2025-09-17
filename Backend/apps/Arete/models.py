from django.db import models
from apps.Mercancia.models import Mercancia

# Create your models here.


def arete_photo_directory(instance, filename):
    return 'Arete/{0}/{1}'.format(instance.name, filename)


class Arete(Mercancia):

    UNIDADES = [
        ('solo', 'Solo'),
        ('pareja', 'Pareja'),
    ]
    unidades = models.CharField(
        max_length=6, choices=UNIDADES, blank=True, null=True, default='pareja')

    photo = models.ImageField(
        upload_to=arete_photo_directory, default='imgExample.jpg')
    photo2 = models.ImageField(
        upload_to=arete_photo_directory, default='imgExample.jpg')
    photo3 = models.ImageField(
        upload_to=arete_photo_directory, default='imgExample.jpg')

    def __str__(self):
        txt = "Nombre: {0} | Precio: {1} | Pureza: {2} | Size: {3} | Peso: {4} | Unidades: {5}"
        return txt.format(self.name, self.precio_unidad, self.pureza, self.size, self.peso_neto, self.unidades)
