from django.db import models
from apps.Mercancia.models import Mercancia

# Create your models here.


def dije_photo_directory(instance, filename):
    return 'Dije/{0}/{1}'.format(instance.name, filename)


class Dije(Mercancia):

    TIPO_DIJ = [
        ('animales', 'Animales'),
        ('flores', 'Flores'),
        ('formas', 'Formas'),
        ('otros', 'Otros'),
    ]
    tipo_dije = models.CharField(
        max_length=10, choices=TIPO_DIJ, blank=True, null=True, default='otros')

    photo = models.ImageField(
        upload_to=dije_photo_directory, default='imgExample.jpg')
    photo2 = models.ImageField(
        upload_to=dije_photo_directory, default='imgExample.jpg')
    photo3 = models.ImageField(
        upload_to=dije_photo_directory, default='imgExample.jpg')

    def __str__(self):
        txt = "Nombre: {0} | Precio: {1} | Pureza: {2} | Size: {3} | Peso: {4} | Tipo: {5}"
        return txt.format(self.name, self.precio_unidad, self.pureza, self.size, self.peso_neto, self.tipo_dije)
