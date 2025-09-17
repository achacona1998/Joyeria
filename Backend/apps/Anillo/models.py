from django.db import models
from apps.Mercancia.models import Mercancia

# Create your models here.


def anillo_photo_directory(instance, filename):
    return 'Anillo/{0}/{1}'.format(instance.name, filename)


class Anillo(Mercancia):

    LUGAR_USO = [
        ('mano', 'Mano'),
        ('pie', 'Pie'),
    ]
    lugar_de_uso = models.CharField(
        max_length=4, choices=LUGAR_USO, blank=True, null=True, default='mano')

    CANTIDAD = [
        ('simple', 'Simple'),
        ('pareja', 'Pareja'),
    ]
    cantidad = models.CharField(
        max_length=6, choices=CANTIDAD, blank=True, null=True, default='simple')

    TIPO_ANI = [
        ('compromiso', 'Compromiso'),
        ('matrimonio', 'Matrimonio'),
        ('normal', 'Normal'),
    ]
    tipo_anillo = models.CharField(
        max_length=10, choices=TIPO_ANI, blank=True, null=True, default='normal')

    photo = models.ImageField(
        upload_to=anillo_photo_directory, default='imgExample.jpg')
    photo2 = models.ImageField(
        upload_to=anillo_photo_directory, default='imgExample.jpg')
    photo3 = models.ImageField(
        upload_to=anillo_photo_directory, default='imgExample.jpg')

    def __str__(self):
        txt = "Nombre: {0} | Precio: {1} | Pureza: {2} | Size: {3} | Peso: {4}| Lugar: {5} | Cantidad: {6} | Tipo: {7}"
        return txt.format(self.name, self.precio_unidad, self.pureza, self.size, self.peso_neto, self.lugar_de_uso, self.cantidad, self.tipo_anillo)
