"""Tests unitarios corregidos para los modelos del sistema de joyería usando Django TestCase"""
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from apps.Anillo.models import Anillo
from apps.Arete.models import Arete
from apps.Brazalete.models import Brazalete
from apps.Cadena.models import Cadena
from apps.Dije.models import Dije
from apps.Pircing.models import Pircing
from apps.Tobillera.models import Tobillera


class TestAnilloModel(TestCase):
    """Tests para el modelo Anillo"""
    
    def test_create_anillo_with_valid_data(self):
        """Test crear anillo con datos válidos"""
        anillo = Anillo.objects.create(
            name="Anillo de Oro",
            precio_unidad=150.50,
            pureza="18",
            size="7,8,9",
            peso_neto="5.2",
            genero_usuario="unisex",
            cantUnidades=10,
            lugar_de_uso="mano",
            es_publico=True
        )
        
        self.assertEqual(anillo.name, "Anillo de Oro")
        self.assertEqual(anillo.precio_unidad, 150.50)
        self.assertEqual(anillo.pureza, "18")
        self.assertEqual(anillo.size, "7,8,9")
        self.assertEqual(anillo.peso_neto, "5.2")
        self.assertEqual(anillo.genero_usuario, "unisex")
        self.assertEqual(anillo.cantUnidades, 10)
        self.assertEqual(anillo.lugar_de_uso, "mano")
        self.assertTrue(anillo.es_publico)

    def test_anillo_str_representation(self):
        """Test representación string del anillo"""
        anillo = Anillo.objects.create(
            name="Anillo de Plata",
            precio_unidad=75.00,
            pureza="925",
            size="6,7,8",
            peso_neto="3.5",
            genero_usuario="female",
            cantUnidades=5,
            lugar_de_uso="mano"
        )
        
        self.assertEqual(str(anillo), "Anillo de Plata")

    def test_anillo_default_values(self):
        """Test valores por defecto del anillo"""
        anillo = Anillo.objects.create(
            name="Anillo Simple",
            precio_unidad=50.00,
            pureza="14",
            size="7",
            peso_neto="2.0",
            genero_usuario="male",
            cantUnidades=1,
            lugar_de_uso="mano"
        )
        
        self.assertTrue(anillo.es_publico)  # Default should be True


class TestAreteModel(TestCase):
    """Tests para el modelo Arete"""
    
    def test_create_arete_with_valid_data(self):
        """Test crear arete con datos válidos"""
        arete = Arete.objects.create(
            name="Arete de Oro",
            precio_unidad=200.00,
            pureza="18",
            peso_neto="3.0",
            genero_usuario="female",
            cantUnidades=2,
            es_publico=True
        )
        
        self.assertEqual(arete.name, "Arete de Oro")
        self.assertEqual(arete.precio_unidad, 200.00)

    def test_arete_default_values(self):
        """Test valores por defecto del arete"""
        arete = Arete.objects.create(
            name="Arete Simple",
            precio_unidad=25.00,
            pureza="925",
            peso_neto="0.8",
            genero_usuario="unisex",
            cantUnidades=1
        )
        
        self.assertTrue(arete.es_publico)


class TestBrazaleteModel(TestCase):
    """Tests para el modelo Brazalete"""
    
    def test_create_brazalete_with_valid_data(self):
        """Test crear brazalete con datos válidos"""
        brazalete = Brazalete.objects.create(
            name="Brazalete de Plata",
            precio_unidad=180.00,
            pureza="925",
            peso_neto="12.0",
            genero_usuario="unisex",
            cantUnidades=1,
            es_publico=True
        )
        
        self.assertEqual(brazalete.name, "Brazalete de Plata")
        self.assertEqual(brazalete.precio_unidad, 180.00)

    def test_brazalete_default_values(self):
        """Test valores por defecto del brazalete"""
        brazalete = Brazalete.objects.create(
            name="Brazalete Simple",
            precio_unidad=100.00,
            pureza="925",
            peso_neto="8.0",
            genero_usuario="unisex",
            cantUnidades=1
        )
        
        self.assertTrue(brazalete.es_publico)


class TestCadenaModel(TestCase):
    """Tests para el modelo Cadena"""
    
    def test_create_cadena_with_valid_data(self):
        """Test crear cadena con datos válidos"""
        cadena = Cadena.objects.create(
            name="Cadena de Oro",
            precio_unidad=250.00,
            pureza="18",
            peso_neto="10.0",
            genero_usuario="unisex",
            cantUnidades=1,
            es_publico=True
        )
        
        self.assertEqual(cadena.name, "Cadena de Oro")
        self.assertEqual(cadena.precio_unidad, 250.00)

    def test_cadena_default_values(self):
        """Test valores por defecto de la cadena"""
        cadena = Cadena.objects.create(
            name="Cadena Simple",
            precio_unidad=150.00,
            pureza="925",
            peso_neto="6.0",
            genero_usuario="unisex",
            cantUnidades=1
        )
        
        self.assertTrue(cadena.es_publico)


class TestDijeModel(TestCase):
    """Tests para el modelo Dije"""
    
    def test_create_dije_with_valid_data(self):
        """Test crear dije con datos válidos"""
        dije = Dije.objects.create(
            name="Dije de Corazón",
            precio_unidad=80.00,
            pureza="925",
            peso_neto="2.5",
            genero_usuario="unisex",
            cantUnidades=1,
            es_publico=True
        )
        
        self.assertEqual(dije.name, "Dije de Corazón")
        self.assertEqual(dije.precio_unidad, 80.00)

    def test_dije_default_values(self):
        """Test valores por defecto del dije"""
        dije = Dije.objects.create(
            name="Dije Simple",
            precio_unidad=40.00,
            pureza="925",
            peso_neto="1.5",
            genero_usuario="unisex",
            cantUnidades=1
        )
        
        self.assertTrue(dije.es_publico)


class TestPircingModel(TestCase):
    """Tests para el modelo Pircing"""
    
    def test_create_pircing_with_valid_data(self):
        """Test crear pircing con datos válidos"""
        pircing = Pircing.objects.create(
            name="Pircing de Acero",
            precio_unidad=30.00,
            pureza="316L",
            peso_neto="1.0",
            genero_usuario="unisex",
            cantUnidades=10,
            lugar_de_uso="oreja",
            es_publico=True
        )
        
        self.assertEqual(pircing.name, "Pircing de Acero")
        self.assertEqual(pircing.lugar_de_uso, "oreja")

    def test_pircing_default_values(self):
        """Test valores por defecto del pircing"""
        pircing = Pircing.objects.create(
            name="Pircing Simple",
            precio_unidad=15.00,
            pureza="316L",
            peso_neto="0.5",
            genero_usuario="unisex",
            cantUnidades=1,
            lugar_de_uso="oreja"
        )
        
        self.assertTrue(pircing.es_publico)


class TestTobilleraModel(TestCase):
    """Tests para el modelo Tobillera"""
    
    def test_create_tobillera_with_valid_data(self):
        """Test crear tobillera con datos válidos"""
        tobillera = Tobillera.objects.create(
            name="Tobillera de Plata",
            precio_unidad=120.00,
            pureza="925",
            peso_neto="8.0",
            genero_usuario="unisex",
            cantUnidades=3,
            es_publico=True
        )
        
        self.assertEqual(tobillera.name, "Tobillera de Plata")
        self.assertEqual(tobillera.precio_unidad, 120.00)
        self.assertEqual(tobillera.pureza, "925")

    def test_tobillera_default_values(self):
        """Test valores por defecto de la tobillera"""
        tobillera = Tobillera.objects.create(
            name="Tobillera Simple",
            precio_unidad=60.00,
            pureza="925",
            peso_neto="5.0",
            genero_usuario="unisex",
            cantUnidades=1
        )
        
        self.assertTrue(tobillera.es_publico)