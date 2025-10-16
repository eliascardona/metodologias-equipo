import { Label } from "@/components/ui/label";
import { SolicitudAdopcion } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { EstadoBadge } from "./estado-badge";

interface SolicitudDetailProps {
  solicitud: SolicitudAdopcion;
}

export function SolicitudDetail({ solicitud }: SolicitudDetailProps) {
  return (
    <div className="space-y-6">
      {/* Información del solicitante */}
      <section>
        <h3 className="font-semibold text-lg mb-3">Datos del Solicitante</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-600">Nombre</Label>
            <p className="font-medium">{solicitud.nombre_solicitante}</p>
          </div>
          <div>
            <Label className="text-gray-600">Teléfono</Label>
            <p className="font-medium">{solicitud.telefono}</p>
          </div>
          <div>
            <Label className="text-gray-600">Email</Label>
            <p className="font-medium">{solicitud.email}</p>
          </div>
          <div>
            <Label className="text-gray-600">Ciudad</Label>
            <p className="font-medium">{solicitud.ciudad}</p>
          </div>
        </div>
      </section>

      {/* Información del animal */}
      <section>
        <h3 className="font-semibold text-lg mb-3">Animal de Interés</h3>
        <div>
          <p className="font-bold text-lg">{solicitud.animal_detalle.nombre}</p>
          <p className="text-sm text-gray-600">
            {solicitud.animal_detalle.especie} • {solicitud.animal_detalle.raza} •{" "}
            {solicitud.animal_detalle.edad} años
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ID: {solicitud.animal_detalle.custom_id}
          </p>
        </div>
      </section>

      {/* Respuestas del cuestionario */}
      <section>
        <h3 className="font-semibold text-lg mb-3">Cuestionario de Adopción</h3>
        <div className="space-y-3">
          {solicitud.respuestas.motivacion && (
            <div>
              <Label className="text-gray-600">Motivación para adoptar</Label>
              <p className="mt-1 text-sm">{solicitud.respuestas.motivacion}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {solicitud.respuestas.tipo_vivienda && (
              <div>
                <Label className="text-gray-600">Tipo de vivienda</Label>
                <p className="mt-1 text-sm capitalize">
                  {solicitud.respuestas.tipo_vivienda}
                </p>
              </div>
            )}
            {solicitud.respuestas.propiedad_vivienda && (
              <div>
                <Label className="text-gray-600">Propiedad</Label>
                <p className="mt-1 text-sm capitalize">
                  {solicitud.respuestas.propiedad_vivienda}
                </p>
              </div>
            )}
            {solicitud.respuestas.ninos && (
              <div>
                <Label className="text-gray-600">Niños en el hogar</Label>
                <p className="mt-1 text-sm capitalize">{solicitud.respuestas.ninos}</p>
                {solicitud.respuestas.edades_ninos && (
                  <p className="text-xs text-gray-500">
                    Edades: {solicitud.respuestas.edades_ninos}
                  </p>
                )}
              </div>
            )}
            {solicitud.respuestas.otras_mascotas && (
              <div>
                <Label className="text-gray-600">Otras mascotas</Label>
                <p className="mt-1 text-sm capitalize">
                  {solicitud.respuestas.otras_mascotas}
                </p>
                {solicitud.respuestas.especificar_mascotas && (
                  <p className="text-xs text-gray-500">
                    {solicitud.respuestas.especificar_mascotas}
                  </p>
                )}
              </div>
            )}
            {solicitud.respuestas.visita_domiciliaria && (
              <div>
                <Label className="text-gray-600">Acepta visita domiciliaria</Label>
                <p className="mt-1 text-sm capitalize">
                  {solicitud.respuestas.visita_domiciliaria}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Estado y fecha */}
      <section className="flex justify-between items-center pt-4 border-t">
        <div>
          <Label className="text-gray-600">Estado actual</Label>
          <div className="mt-1">
            <EstadoBadge estado={solicitud.estado} />
          </div>
        </div>
        <div className="text-right">
          <Label className="text-gray-600">Fecha de solicitud</Label>
          <p className="text-sm mt-1">{formatDate(solicitud.fecha_solicitud)}</p>
        </div>
      </section>
    </div>
  );
}
