# Sistema de Batalla de Monstruos

**Prueba Técnica**

Angel Higueros

Aplicación web desarrollada en React que permite gestionar monstruos y simular combates estratégicos mediante un sistema de combate por turnos.

## Descripción del Proyecto

En esta aplicación se implementando un sistema completo de gestión de monstruos con capacidades de combate simulado. El sistema utiliza reglas específicas de combate por turnos y permite visualizar resultados detallados de cada enfrentamiento.

## Características Principales

### Gestión de monstruos

- Crear monstruos con atributos personalizables
- Editar monstruos existentes
- Eliminar monstruos del sistema
- Validación de datos de entrada
- Persistencia automática de información

### Sistema de Combate

- Combate por turnos entre dos monstruos
- Orden de ataque basado en velocidad y ataque
- Cálculo de daño (Ataque - Defensa, mínimo 1)
- Simulación en tiempo real con registro detallado
- Condición de victoria al llegar a 0 HP

### Historial de Combates

- Registro completo de todos los combates
- Detalles expandibles con log de cada turno
- Información de ganador y estadísticas
- Funcionalidad de eliminación de registros

## Tecnologías Utilizadas

- **React 18**
- **Vite**
- **JavaScript**
- **CSS3**
- **Lucide React**
- **LocalStorage**

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instrucciones de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/angelhigueros/prueba-tecnica.git
cd prueba-tecnica

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Análisis de código


## Despliegue

La aplicación está configurada para desplegarse en **Vercel** con integración continua desde el repositorio de GitHub.

URL de despliegue: 

## Autor

**Angel Higueros**

- GitHub: [@angelhigueros](https://github.com/angelhigueros)
- Repositorio: [prueba-tecnica](https://github.com/angelhigueros/prueba-tecnica)
