from django.contrib import admin
from .models import SolicitudAdopcion


@admin.register(SolicitudAdopcion)
class SolicitudAdopcionAdmin(admin.ModelAdmin):
    list_display = ('custom_id', 'nombre_solicitante', 'animal', 'ciudad', 'estado', 'fecha_solicitud')
    list_filter = ('estado', 'fecha_solicitud', 'ciudad')
    search_fields = ('custom_id', 'nombre_solicitante', 'email', 'animal__nombre')
    readonly_fields = ('custom_id', 'fecha_solicitud')

    fieldsets = (
        ('Identificación', {
            'fields': ('custom_id', 'fecha_solicitud', 'estado')
        }),
        ('Información del Solicitante', {
            'fields': ('nombre_solicitante', 'telefono', 'email', 'ciudad')
        }),
        ('Información de Adopción', {
            'fields': ('animal', 'respuestas')
        }),
    )
