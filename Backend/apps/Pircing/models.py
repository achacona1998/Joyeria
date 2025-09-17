from django.db import models
from apps.Mercancia.models import Mercancia

# Create your models here.


def pircing_photo_directory(instance, filename):
    return 'Pircing/{0}/{1}'.format(instance.name, filename)


class Pircing(Mercancia):

    LUGAR_USO = [
        ('oreja', 'Oreja'),
        ('nariz', 'Nariz'),
        ('boca', 'Boca'),
        ('ombligo', 'Ombligo'),
        ('otro', 'Otro'),
    ]
    lugar_de_uso = models.CharField(
        max_length=7, choices=LUGAR_USO, blank=True, null=True, default='otro')

    photo = models.ImageField(
        upload_to=pircing_photo_directory, default='imgExample.jpg')
    photo2 = models.ImageField(
        upload_to=pircing_photo_directory, default='imgExample.jpg')
    photo3 = models.ImageField(
        upload_to=pircing_photo_directory, default='imgExample.jpg')

    def __str__(self):
        txt = "Nombre: {0} | Precio: {1} | Pureza: {2} | Size: {3} | Peso: {4} | Lugar: {5}"
        return txt.format(self.name, self.precio_unidad, self.pureza, self.size, self.peso_neto, self.lugar_de_uso)
