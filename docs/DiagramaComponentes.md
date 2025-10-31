# Diagrama de Componentes - ASISTENCIA-TOUCH
                          ┌────────────────────┐
                          │      App.jsx       │
                          │ Componente raíz    │
                          └─────────┬──────────┘
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        │                                                       │
┌───────────────┐                                       ┌───────────────┐
│   Pages       │                                       │   Firebase    │
│ (src/pages/)  │◄─────────────── API / Hooks ─────────►│ firebase.jsx  │
│ - AppRoute.jsx│                                       │               │
└───────────────┘                                       └───────────────┘
        │
        │
┌──────────────────────┐
│ Components           │
│ (src/components)     │
│ - Login.jsx          │
│ - Registro.jsx       │
│ - MenuPrincipal.jsx  │
│ - AdminMenu.jsx      │
│ - ProfeMenu.jsx      │
│ - PreceptorMenu.jsx  │
│ - Alta/Baja/...      │
│ - BotonRedirigir.jsx │
│ - ProteccionRutas.jsx│
└──────────────────────┘
        │
        ▼
┌───────────────┐
│  CSS / Assets │
│ (src/css,     │
│  public/)     │
└───────────────┘
        │
        ▼
┌─────────────────┐
│    Hooks        │
│ (src/hooks/)    │
│ - useAuth       │
│ - useAdmin      │
│ - useCursos     │
│ - useMaterias   │
│ - useProfesores │
│ - usePreceptores│
│ - useUsuarios   │
└─────────────────┘
Descripción de los componentes

App.jsx: Componente raíz que maneja la navegación y carga de rutas.

Pages / Routes: Contiene la configuración de rutas según el rol del usuario.

Components: Componentes reutilizables (formularios, menús, vistas).

Hooks: Funciones personalizadas para lógica y comunicación con Firebase.

Firebase: Configuración de Firebase y acceso a la base de datos.

CSS / Assets: Estilos y recursos estáticos del proyecto.