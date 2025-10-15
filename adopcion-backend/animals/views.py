from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Animal
from .serializers import AnimalSerializer, AnimalListSerializer


class AnimalViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar animales.

    list: Retorna lista de animales
    retrieve: Retorna detalle de un animal
    create: Crea un nuevo animal
    update: Actualiza un animal existente
    partial_update: Actualiza parcialmente un animal
    destroy: Elimina un animal
    """
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['especie', 'estado']
    search_fields = ['nombre', 'raza', 'custom_id']
    ordering_fields = ['fecha_rescate', 'nombre', 'edad']
    ordering = ['-fecha_rescate']

    def get_serializer_class(self):
        """Usa serializer simplificado para listado"""
        if self.action == 'list':
            return AnimalListSerializer
        return AnimalSerializer

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        """Endpoint para obtener solo animales disponibles"""
        animales = self.queryset.filter(estado='disponible')
        serializer = AnimalListSerializer(animales, many=True)
        return Response(serializer.data)
