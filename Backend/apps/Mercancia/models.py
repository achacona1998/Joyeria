from django.db import models
from django.core.validators import validate_comma_separated_integer_list

# Create your models here.


class Mercancia(models.Model):

    name = models.CharField(max_length=30, blank=True,
                            null=True, default='')
    precio_unidad = models.FloatField(default=0, blank=True, null=True)
    pureza = models.CharField(validators=[
                              validate_comma_separated_integer_list], max_length=200, blank=True, null=True, default='0')
    size = models.CharField(validators=[
                            validate_comma_separated_integer_list], max_length=200, blank=True, null=True, default='0')
    peso_neto = models.CharField(validators=[
                                 validate_comma_separated_integer_list], max_length=200, blank=True, null=True, default='0')

    es_publico = models.BooleanField(max_length=8, default=False)

    GENERO = [
        ('unisex', 'Unisex'),
        ('female', 'Female'),
        ('male', 'Male'),
    ]
    genero_usuario = models.CharField(
        max_length=17, choices=GENERO, blank=True, null=True, default='unisex')
    cantUnidades = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
