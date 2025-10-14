from django.db import models
from django.core.validators import EmailValidator, RegexValidator
from django.utils import timezone
from animals.models import Animal, BaseCustomID


class SolicitudAdopcion(BaseCustomID):
    """Modelo para gestionar solicitudes de adopción de animales"""

    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('en_revision', 'En Revisión'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
    ]

    animal = models.ForeignKey(
        Animal,
        on_delete=models.PROTECT,
        related_name='solicitudes',
        verbose_name="Animal"
    )
    nombre_solicitante = models.CharField(
        max_length=150,
        verbose_name="Nombre del Solicitante"
    )
    telefono = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Ingrese un número de teléfono válido (9-15 dígitos)"
            )
        ],
        verbose_name="Teléfono"
    )
    email = models.EmailField(
        validators=[EmailValidator()],
        verbose_name="Email"
    )
    ciudad = models.CharField(
        max_length=100,
        verbose_name="Ciudad"
    )
    respuestas = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="Respuestas del Cuestionario",
        help_text="Respuestas a preguntas sobre adopción en formato JSON"
    )
    fecha_solicitud = models.DateTimeField(
        default=timezone.now,
        verbose_name="Fecha de Solicitud"
    )
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='pendiente',
        verbose_name="Estado"
    )

    class Meta:
        verbose_name = "Solicitud de Adopción"
        verbose_name_plural = "Solicitudes de Adopción"
        ordering = ['-fecha_solicitud']

    def save(self, *args, **kwargs):
        if not self.custom_id:
            self.custom_id = self.generate_custom_id('SOL')
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.custom_id} - {self.nombre_solicitante} ({self.animal.nombre})"
