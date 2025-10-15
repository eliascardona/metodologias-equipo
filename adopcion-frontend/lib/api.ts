import { Animal, AnimalCreate, SolicitudAdopcion, SolicitudAdopcionCreate } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Manejo de errores
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Error desconocido' }));
    throw new APIError(response.status, error.detail || JSON.stringify(error));
  }
  return response.json();
}

// API para Animales
export const animalsAPI = {
  // Obtener todos los animales
  getAll: async (): Promise<Animal[]> => {
    const response = await fetch(`${API_BASE_URL}/animals/`);
    return handleResponse<Animal[]>(response);
  },

  // Obtener animales disponibles
  getAvailable: async (): Promise<Animal[]> => {
    const response = await fetch(`${API_BASE_URL}/animals/disponibles/`);
    return handleResponse<Animal[]>(response);
  },

  // Obtener un animal por ID
  getById: async (id: number): Promise<Animal> => {
    const response = await fetch(`${API_BASE_URL}/animals/${id}/`);
    return handleResponse<Animal>(response);
  },

  // Crear un nuevo animal
  create: async (data: AnimalCreate): Promise<Animal> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/animals/`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<Animal>(response);
  },

  // Actualizar un animal
  update: async (id: number, data: Partial<AnimalCreate>): Promise<Animal> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/animals/${id}/`, {
      method: 'PATCH',
      body: formData,
    });
    return handleResponse<Animal>(response);
  },

  // Eliminar un animal
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/animals/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new APIError(response.status, 'Error al eliminar el animal');
    }
  },
};

// API para Solicitudes de Adopción
export const adoptionsAPI = {
  // Obtener todas las solicitudes
  getAll: async (): Promise<SolicitudAdopcion[]> => {
    const response = await fetch(`${API_BASE_URL}/adoptions/`);
    return handleResponse<SolicitudAdopcion[]>(response);
  },

  // Obtener una solicitud por ID
  getById: async (id: number): Promise<SolicitudAdopcion> => {
    const response = await fetch(`${API_BASE_URL}/adoptions/${id}/`);
    return handleResponse<SolicitudAdopcion>(response);
  },

  // Crear una nueva solicitud
  create: async (data: SolicitudAdopcionCreate): Promise<SolicitudAdopcion> => {
    const response = await fetch(`${API_BASE_URL}/adoptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<SolicitudAdopcion>(response);
  },

  // Cambiar estado de una solicitud
  changeStatus: async (id: number, estado: string): Promise<SolicitudAdopcion> => {
    const response = await fetch(`${API_BASE_URL}/adoptions/${id}/cambiar_estado/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado }),
    });
    return handleResponse<SolicitudAdopcion>(response);
  },

  // Eliminar una solicitud
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/adoptions/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new APIError(response.status, 'Error al eliminar la solicitud');
    }
  },
};
