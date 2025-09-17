from django.db import models
from apps.Mercancia.models import Mercancia

# Create your models here.


def brazalete_photo_directory(instance, filename):
    return 'Brazalete/{0}/{1}'.format(instance.name, filename)


class Brazalete(Mercancia):

    photo = models.ImageField(
        upload_to=brazalete_photo_directory, default='imgExample.jpg')
    photo2 = models.ImageField(
        upload_to=brazalete_photo_directory, default='imgExample.jpg')
    photo3 = models.ImageField(
        upload_to=brazalete_photo_directory, default='imgExample.jpg')

    def __str__(self):
        txt = "Nombre: {0} | Precio: {1} | Pureza: {2} | Size: {3} | Peso: {4}"

        return txt.format(self.name, self.precio_unidad, self.pureza, self.size, self.peso_neto)
