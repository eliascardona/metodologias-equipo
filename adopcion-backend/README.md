# Sistema de Adopción de Animales

Sistema backend desarrollado en Django para gestionar el rescate y adopción de animales.

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Características](#características)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Configuración](#configuración)
6. [Comandos Utilizados en el Desarrollo](#comandos-utilizados-en-el-desarrollo)
7. [Uso del Sistema](#uso-del-sistema)
8. [Estructura de Respuestas JSON](#estructura-de-respuestas-json)
9. [Solución de Problemas](#solución-de-problemas)

---

## Descripción

Sistema backend para gestionar animales rescatados  
y sus solicitudes de adopción. Incluye:

- Gestión de animales rescatados con IDs únicos
- Gestión de solicitudes de adopción
- Panel de administración Django
- Base de datos MySQL

---

## Características

### Gestión de Animales

- ID único autogenerado formato: `RESC-YYYY-###`
- Información completa: nombre, especie, edad, raza, lugar de rescate
- Historial médico y fotografía
- Estados: disponible, en proceso, adoptado, cuarentena

### Gestión de Solicitudes

- ID único autogenerado formato: `SOL-YYYY-###`
- Vinculación con animal mediante Foreign Key
- Información del solicitante validada
- Cuestionario en formato JSON
- Estados: pendiente, en revisión, aprobada, rechazada

### Panel de Administración

- Interfaz administrativa completa
- Búsqueda y filtros
- Campos de solo lectura para IDs
- Organización por categorías

---

## Requisitos Previos

- Python 3.8+
- MySQL 8.0+
- pip (gestor de paquetes de Python)

---

## Instalación

### 1. Clonar/Descargar el proyecto

```bash
cd /ruta/a/tu/proyecto/metodos
```

### 2. Crear entorno virtual (recomendado)

```bash
python -m venv venv
```

**Activar el entorno virtual:**

- **Linux/Mac**:
  ```bash
  source venv/bin/activate
  ```

- **Windows**:
  ```bash
  venv\Scripts\activate
  ```

### 3. Instalar dependencias

```bash
pip install Django==5.2.6
pip install mysqlclient
pip install python-decouple
pip install Pillow
```

---

## Configuración

### 1. Configurar Base de Datos MySQL

#### Opción A: Usar Docker Compose (Recomendado)

El proyecto incluye `docker-compose.yml` configurado.

```bash
# Iniciar contenedor MySQL
docker-compose up -d

# Verificar que esté corriendo
docker ps
```

#### Opción B: MySQL Local

Crear la base de datos manualmente:

```sql
CREATE DATABASE adopt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON adopt.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Variables de Entorno

El archivo `.env` ya está configurado con:

```env
DB_NAME=adopt
DB_USER=user
DB_PASSWORD=password123
DB_ROOT_PASSWORD=rootpassword123
DB_HOST=localhost
DB_PORT=3306
```

### 3. Aplicar Migraciones

Las migraciones ya fueron creadas y aplicadas. Si necesitas volver a ejecutarlas:

```bash
python manage.py migrate
```

### 4. Crear Superusuario

Para acceder al panel de administración:

```bash
python manage.py createsuperuser
```

Te pedirá:

- Username
- Email (opcional)
- Password (mínimo 8 caracteres)

### 5. Iniciar el Servidor

```bash
python manage.py runserver
```

El servidor estará disponible en: `http://127.0.0.1:8000/`

---

## Comandos Utilizados en el Desarrollo

### Creación del Proyecto

```bash
# El proyecto Django ya estaba creado
# django-admin startproject mi_app .
```

### Creación de Apps

```bash
# Crear app para animales
python manage.py startapp animals

# Crear app para adopciones
python manage.py startapp adoptions
```

### Migraciones

```bash
# Crear migraciones después de definir modelos
python manage.py makemigrations

# Aplicar migraciones a la base de datos
python manage.py migrate
```

Salida esperada:
```
Migrations for 'animals':
  animals/migrations/0001_initial.py
    + Create model Animal
Migrations for 'adoptions':
  adoptions/migrations/0001_initial.py
    + Create model SolicitudAdopcion
```

### Verificar Modelos

```bash
# Ver SQL de las migraciones
python manage.py sqlmigrate animals 0001

# Verificar problemas en los modelos
python manage.py check
```

### Shell de Django (para pruebas)

```bash
python manage.py shell
```

---

## Uso del Sistema

### 1. Acceder al Panel de Administración

1. Iniciar el servidor:

   ```bash
   python manage.py runserver
   ```

2. Abrir en navegador: `http://127.0.0.1:8000/admin`

3. Ingresar credenciales del superusuario

### 2. Registrar un Animal

1. En el admin, click en **"Animales"** → **"Agregar Animal"**

2. Completar los campos:
   - **Nombre**: Ej. "Max"
   - **Especie**: Seleccionar (Perro/Gato/Otro)
   - **Edad**: Ej. 3 (años)
   - **Raza**: Ej. "Labrador"
   - **Lugar de rescate**: Ej. "Calle 45, Bogotá"
   - **Fecha de rescate**: Seleccionar fecha
   - **Descripción médica**: Ej. "Vacunas al día, esterilizado"
   - **Estado**: Seleccionar (Disponible/En Proceso/Adoptado/Cuarentena)
   - **Foto**: Opcional, subir imagen

3. Click **"Guardar"**

4. El sistema genera automáticamente el ID: `RESC-2025-001`

### 3. Crear una Solicitud de Adopción

1. En el admin, click en **"Solicitudes de Adopción"** → **"Agregar Solicitud"**

2. Completar los campos:
   - **Animal**: Seleccionar de la lista
   - **Nombre del solicitante**: Ej. "Juan Pérez"
   - **Teléfono**: Ej. "+573001234567" o "3001234567"
   - **Email**: Ej. "juan@example.com"
   - **Ciudad**: Ej. "Bogotá"
   - **Estado**: Seleccionar (Pendiente/En Revisión/Aprobada/Rechazada)
   - **Respuestas del cuestionario**: Ver sección siguiente

3. Click **"Guardar"**

4. El sistema genera automáticamente el ID: `SOL-2025-001`

---

## Estructura de Respuestas JSON

El campo **"Respuestas del cuestionario"** acepta JSON. Aquí algunos ejemplos:

### Ejemplo 1: Formato Simple

```json
{
  "experiencia_previa": "Sí, he tenido perros durante 10 años",
  "tipo_vivienda": "casa",
  "tiene_jardin": true,
  "horas_solo": "4-6 horas",
  "hay_ninos": true,
  "edad_ninos": "8 y 12 años",
  "otras_mascotas": false,
  "motivo_adopcion": "Queremos darle un hogar a un animal rescatado",
  "compromiso_largo_plazo": true
}
```

### Ejemplo 2: Formato con Preguntas

```json
{
  "preguntas": [
    {
      "id": 1,
      "pregunta": "¿Tiene experiencia previa con mascotas?",
      "respuesta": "Sí, he tenido perros durante 10 años"
    },
    {
      "id": 2,
      "pregunta": "¿Qué tipo de vivienda tiene?",
      "respuesta": "Casa con jardín"
    },
    {
      "id": 3,
      "pregunta": "¿Cuántas horas al día estará solo el animal?",
      "respuesta": "4-6 horas"
    }
  ]
}
```

### Ejemplo 3: Formato Categorizado

```json
{
  "informacion_hogar": {
    "tipo_vivienda": "casa",
    "tiene_jardin": true,
    "espacio_metros": 150
  },
  "experiencia": {
    "ha_tenido_mascotas": true,
    "anos_experiencia": 10
  },
  "convivencia": {
    "personas_hogar": 4,
    "hay_ninos": true,
    "edades_ninos": [8, 12]
  }
}
```

**💡 Tip**: Copia y pega el JSON directamente en el campo del admin.

---

## Funcionalidades del Admin

### Búsqueda

**Animales**:
- Por ID único (RESC-YYYY-###)
- Por nombre
- Por raza
- Por lugar de rescate

**Solicitudes**:
- Por ID único (SOL-YYYY-###)
- Por nombre del solicitante
- Por email
- Por nombre del animal

### Filtros

**Animales**:
- Por estado
- Por especie
- Por fecha de rescate

**Solicitudes**:
- Por estado
- Por fecha de solicitud
- Por ciudad

### Ordenamiento

Ambos modelos se ordenan automáticamente por fecha (más recientes primero).

---

