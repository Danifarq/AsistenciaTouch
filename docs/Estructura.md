ASISTENCIA-TOUCH/
│
├── diseños/                      # Contiene los diseños de interfaz 
│   ├── DiseñoFinal.pdf
│   ├── DiseñoNuevo.pdf
│   └── PrimerDiseño.pdf
│
├── docs/                         # Documentación del proyecto
│   └── Manual de Usuario.pdf
│
├── public/                       # Archivos públicos del proyecto 
│
├── src/                          # Carpeta principal del código fuente
│   │
│   ├── components/               # Componentes reutilizables 
│   │   ├── AdminMenu.jsx         # Panel principal del administrador
│   │   ├── AltaCurso.jsx         # Formulario de alta de cursos
│   │   ├── AltaMateria.jsx       # Formulario de alta de materias
│   │   ├── AltaProfesor.jsx      # Formulario de alta de profesores
│   │   ├── AltaPreceptor.jsx     # Formulario de alta de preceptores
│   │   ├── BajaCurso.jsx         # Eliminación de cursos
│   │   ├── BajaMateria.jsx       # Eliminación de materias
│   │   ├── BajaProfesor.jsx      # Eliminación de profesores
│   │   ├── BajaPreceptor.jsx     # Eliminación de preceptores
│   │   ├── BotonRedirigir.jsx    # Botón genérico para navegación
│   │   ├── DetalleProfesor.jsx   # Vista detallada de un profesor
│   │   ├── ListaProfesores.jsx   # Listado de profesores
│   │   ├── MenuPrincipal.jsx     # Menú principal del sistema
│   │   ├── ProfeMenu.jsx         # Panel del profesor
│   │   ├── PreceptorMenu.jsx     # Panel del preceptor
│   │   ├── Login.jsx             # Pantalla de inicio de sesión
│   │   ├── Registro.jsx          # Pantalla de registro de usuario
│   │   └── ProteccionRutas.jsx   # Componente que controla rutas privadas
│   │
│   ├── css/                      # Estilos CSS del proyecto
│   │   └── ├── AdminMenu.css         # Estilos del panel del administrador
│   │       ├── AltaCurso.css         # Estilos del form de alta de cursos
│   │       ├── AltaMateria.css       # Estilos del form de alta de materias
│   │       ├── AltaPreceptor.css     # Estilos del form de alta de prece
│   │       ├── AltaProfesor.css      # Estilos del form de alta de profesor
│   │       ├── BajaCurso.css         # Estilos para la baja de cursos
│   │       ├── BajaMateria.css       # Estilos para la baja de materias
│   │       ├── BajaPreceptor.css     # Estilos para la baja de preceptores
│   │       ├── BajaProfesor.css      # Estilos para la baja de profesores
│   │       ├── DetalleProfesor.css   # Estilos de la vista del profesor
│   │       ├── fondo.jpg             # Imagen de fondo 
│   │       ├── Inicio.css            # Estilos de la pantalla de inicio
│   │       ├── Login.css             # Estilos de la pantalla de login
│   │       ├── MenuPreceptor.css     # Estilos del panel del preceptor
│   │       ├── MenuPrincipal.css     # Estilos del menú principal
│   │       ├── MenuProf.css          # Estilos del panel del profesor
│   │       ├── Registro.css          # Estilos de la pantalla de registro
│   │
│   ├── firebase/                 # Configuración de Firebase
│   │   └── firebase.jsx
│   │
│   ├── hooks/                    # Hooks personalizados
│   │   ├── useAuth.jsx           # Manejo de autenticación
│   │   ├── useAdmin.jsx          # Funciones del rol administrador
│   │   ├── useCursos.jsx         # Operaciones relacionadas con cursos
│   │   ├── useMaterias.jsx       # Operaciones relacionadas con materias
│   │   ├── useProfesores.jsx     # Operaciones relacionadas con profesores
│   │   ├── useProfesoresList.jsx # Listado y filtrado de profesores
│   │   ├── usePreceptores.jsx    # Operaciones relacionadas con preceptores
│   │   └── useUsuarios.jsx       # Gestión general de usuarios
│   │
│   ├── pages/                    # Páginas del proyecto
│   │   └── routes/               # Configuración de rutas
│   │       └── AppRoute.jsx
│   │
│   ├── App.jsx                   # Componente raíz del proyecto
│   ├── index.js                  # Punto de entrada principal de la app
│   └── index.css                 # Estilos globales
│
├── .gitignore                    # Archivos y carpetas ignoradas por Git
├── package.json                  # Dependencias y scripts del proyecto
├── package-lock.json             # Bloqueo de versiones
└── README.md                     # Descripción general del proyecto
