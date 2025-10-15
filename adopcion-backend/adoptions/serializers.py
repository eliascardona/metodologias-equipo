from rest_framework import serializers
from .models import SolicitudAdopcion
from animals.serializers import AnimalListSerializer


class SolicitudAdopcionSerializer(serializers.ModelSerializer):
    """Serializer para el modelo SolicitudAdopcion"""
    animal_detalle = AnimalListSerializer(source='animal', read_only=True)

    class Meta:
        model = SolicitudAdopcion
        fields = [
            'id',
            'custom_id',
            'animal',
            'animal_detalle',
            'nombre_solicitante',
            'telefono',
            'email',
            'ciudad',
            'respuestas',
            'fecha_solicitud',
            'estado',
        ]
        read_only_fields = ['id', 'custom_id', 'fecha_solicitud']

    def validate_respuestas(self, value):
        """Valida que las respuestas estén en formato dict"""
        if not isinstance(value, dict):
            raise serializers.ValidationError("Las respuestas deben ser un objeto JSON")
        return value


class SolicitudAdopcionCreateSerializer(serializers.ModelSerializer):
    """Serializer para crear solicitudes de adopción"""

    class Meta:
        model = SolicitudAdopcion
        fields = [
            'animal',
            'nombre_solicitante',
            'telefono',
            'email',
            'ciudad',
            'respuestas',
        ]

    def validate_respuestas(self, value):
        """Valida que las respuestas estén en formato dict"""
        if not isinstance(value, dict):
            raise serializers.ValidationError("Las respuestas deben ser un objeto JSON")
        return value
