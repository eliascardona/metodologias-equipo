from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import SolicitudAdopcion
from .serializers import SolicitudAdopcionSerializer, SolicitudAdopcionCreateSerializer


class SolicitudAdopcionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar solicitudes de adopción.

    list: Retorna lista de solicitudes
    retrieve: Retorna detalle de una solicitud
    create: Crea una nueva solicitud de adopción
    update: Actualiza una solicitud existente
    partial_update: Actualiza parcialmente una solicitud
    destroy: Elimina una solicitud
    """
    queryset = SolicitudAdopcion.objects.all().select_related('animal')
    serializer_class = SolicitudAdopcionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'animal']
    search_fields = ['nombre_solicitante', 'email', 'custom_id']
    ordering_fields = ['fecha_solicitud', 'nombre_solicitante']
    ordering = ['-fecha_solicitud']

    def get_serializer_class(self):
        """Usa serializer específico para crear solicitudes"""
        if self.action == 'create':
            return SolicitudAdopcionCreateSerializer
        return SolicitudAdopcionSerializer

    def create(self, request, *args, **kwargs):
        """Crea una nueva solicitud de adopción"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Retornar el detalle completo con el serializer normal
        instance = serializer.instance
        response_serializer = SolicitudAdopcionSerializer(instance)
        headers = self.get_success_headers(response_serializer.data)
        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        """Endpoint para cambiar el estado de una solicitud"""
        solicitud = self.get_object()
        nuevo_estado = request.data.get('estado')

        estados_validos = dict(SolicitudAdopcion.ESTADOS).keys()
        if nuevo_estado not in estados_validos:
            return Response(
                {'error': f'Estado inválido. Debe ser uno de: {", ".join(estados_validos)}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        solicitud.estado = nuevo_estado
        solicitud.save()

        serializer = self.get_serializer(solicitud)
        return Response(serializer.data)
