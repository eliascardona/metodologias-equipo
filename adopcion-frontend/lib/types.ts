// Tipos para los modelos del backend

export interface Animal {
  id: number;
  custom_id: string;
  nombre: string;
  especie: 'perro' | 'gato' | 'otro';
  edad: number;
  raza: string;
  lugar_rescate?: string | null;
  fecha_rescate?: string | null;
  descripcion_medica?: string | null;
  foto: string | null;
  estado: 'disponible' | 'en_proceso' | 'adoptado' | 'cuarentena';
}

export interface AnimalCreate {
  nombre: string;
  especie: 'perro' | 'gato' | 'otro';
  edad: number;
  raza: string;
  foto?: File;
}

export interface SolicitudAdopcion {
  id: number;
  custom_id: string;
  animal: number;
  animal_detalle: {
    id: number;
    custom_id: string;
    nombre: string;
    especie: string;
    edad: number;
    raza: string;
    foto: string | null;
    estado: string;
  };
  nombre_solicitante: string;
  telefono: string;
  email: string;
  ciudad: string;
  respuestas: Record<string, any>;
  fecha_solicitud: string;
  estado: 'pendiente' | 'en_revision' | 'aprobada' | 'rechazada';
}

export interface SolicitudAdopcionCreate {
  animal: number;
  nombre_solicitante: string;
  telefono: string;
  email: string;
  ciudad: string;
  respuestas: Record<string, any>;
}
