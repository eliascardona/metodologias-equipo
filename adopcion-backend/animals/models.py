from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from datetime import datetime


class BaseCustomID(models.Model):
    """Clase abstracta base para generar IDs únicos con formato personalizado"""

    custom_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
        verbose_name="ID Único"
    )

    class Meta:
        abstract = True

    def generate_custom_id(self, prefix):
        """Genera ID único con formato: PREFIX-YYYY-###"""
        year = datetime.now().year

        # Buscar el último ID del año actual
        last_record = self.__class__.objects.filter(
            custom_id__startswith=f"{prefix}-{year}"
        ).order_by('custom_id').last()

        if last_record and last_record.custom_id:
            # Extraer el número del último ID y sumar 1
            last_number = int(last_record.custom_id.split('-')[-1])
            new_number = last_number + 1
        else:
            new_number = 1

        return f"{prefix}-{year}-{new_number:03d}"


class Animal(BaseCustomID):
    """Modelo para gestionar animales rescatados"""

    ESTADOS = [
        ('disponible', 'Disponible'),
        ('en_proceso', 'En Proceso de Adopción'),
        ('adoptado', 'Adoptado'),
        ('cuarentena', 'En Cuarentena'),
    ]

    ESPECIES = [
        ('perro', 'Perro'),
        ('gato', 'Gato'),
        ('otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    especie = models.CharField(
        max_length=50,
        choices=ESPECIES,
        verbose_name="Especie"
    )
    edad = models.PositiveIntegerField(
        validators=[MinValueValidator(0)],
        verbose_name="Edad (años)",
        help_text="Edad aproximada en años"
    )
    raza = models.CharField(max_length=100, verbose_name="Raza")
    lugar_rescate = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name="Lugar de Rescate"
    )
    fecha_rescate = models.DateField(
        blank=True,
        null=True,
        verbose_name="Fecha de Rescate"
    )
    descripcion_medica = models.TextField(
        blank=True,
        null=True,
        verbose_name="Descripción Médica",
        help_text="Estado de salud, vacunas, tratamientos, etc."
    )
    foto = models.ImageField(
        upload_to='animals/',
        blank=True,
        null=True,
        verbose_name="Fotografía"
    )
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='disponible',
        verbose_name="Estado"
    )

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animales"
        ordering = ['-fecha_rescate']

    def save(self, *args, **kwargs):
        if not self.custom_id:
            self.custom_id = self.generate_custom_id('RESC')
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.custom_id} - {self.nombre}"
