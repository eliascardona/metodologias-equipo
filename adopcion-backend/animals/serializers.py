from rest_framework import serializers
from .models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    """Serializer para el modelo Animal"""

    class Meta:
        model = Animal
        fields = [
            'id',
            'custom_id',
            'nombre',
            'especie',
            'edad',
            'raza',
            'lugar_rescate',
            'fecha_rescate',
            'descripcion_medica',
            'foto',
            'estado',
        ]
        read_only_fields = ['id', 'custom_id', 'estado']
        extra_kwargs = {
            'lugar_rescate': {'required': False, 'allow_blank': True, 'allow_null': True},
            'fecha_rescate': {'required': False, 'allow_null': True},
            'descripcion_medica': {'required': False, 'allow_blank': True, 'allow_null': True},
            'foto': {'required': False, 'allow_null': True},
        }


class AnimalListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listar animales"""

    class Meta:
        model = Animal
        fields = [
            'id',
            'custom_id',
            'nombre',
            'especie',
            'edad',
            'raza',
            'foto',
            'estado',
        ]
        read_only_fields = ['id', 'custom_id']
