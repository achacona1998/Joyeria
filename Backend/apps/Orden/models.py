from django.db import models


class Orden(models.Model):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100, blank=True)
    # Considera almacenar solo los últimos 4 dígitos
    tarjeta = models.CharField(max_length=19)
    total = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False, null=True, blank=True
    )

    def __str__(self):
        return f"Orden #{self.id} - {self.nombre}"


class ItemOrden(models.Model):
    orden = models.ForeignKey(
        Orden, related_name="items", on_delete=models.CASCADE
    )
    producto_id = models.PositiveIntegerField(
        default=0)  # ID del producto en su tabla
    nombre_articulo = models.CharField(max_length=100, default="asd")
    tipo_producto = models.CharField(max_length=50)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad} x {self.nombre_articulo} (Orden #{self.orden.id})"
