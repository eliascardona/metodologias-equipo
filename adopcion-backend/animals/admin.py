from django.contrib import admin
from .models import Animal


@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('custom_id', 'nombre', 'especie', 'edad', 'estado', 'fecha_rescate')
    list_filter = ('estado', 'especie', 'fecha_rescate')
    search_fields = ('custom_id', 'nombre', 'raza', 'lugar_rescate')
    readonly_fields = ('custom_id',)

    fieldsets = (
        ('Identificación', {
            'fields': ('custom_id', 'nombre', 'especie', 'raza', 'edad')
        }),
        ('Información de Rescate', {
            'fields': ('lugar_rescate', 'fecha_rescate', 'estado')
        }),
        ('Información Médica', {
            'fields': ('descripcion_medica',)
        }),
        ('Multimedia', {
            'fields': ('foto',)
        }),
    )
