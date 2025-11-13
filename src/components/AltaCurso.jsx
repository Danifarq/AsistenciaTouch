// ======================================================
// GUÍA PARA NUEVOS DESARROLLADORES - AltaCurso.jsx
// ======================================================
//
// Este componente permite al administrador crear un nuevo curso.
// El curso se guarda en Firestore a través del hook personalizado `useCursos`.
//
//  DEPENDENCIAS PRINCIPALES:
// - React: para manejar el estado y renderizado.
// - useCursos: contiene la lógica para crear cursos en Firebase.
// - useNavigate: redirección entre rutas.
// - BotonRedirigir: botón reutilizable para volver al panel principal.
// - CSS: estilos específicos para la vista de alta de curso.
//
// ======================================================

import React, { useState } from "react";
import { crearCurso } from "../hooks/useCursos";

import BotonRedirigir from '../components/BotonRedirigir';
import '../css/AltaCurso.css';

const AltaCurso = () => {
  // ----------------------------------------------
  // Estados locales:
  // - nombre: almacena el nombre del nuevo curso.
  // - mensaje: muestra feedback al usuario (errores o confirmaciones).
  // ----------------------------------------------
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Hook de navegación para redirigir a otras rutas.
  

  // ----------------------------------------------
  // handleSubmit:
  // Maneja el envío del formulario.
  // 1️⃣ Evita el comportamiento por defecto del form.
  // 2️⃣ Valida que el campo nombre no esté vacío.
  // 3️⃣ Llama a la función `crearCurso` del hook `useCursos`.
  // 4️⃣ Muestra un mensaje de confirmación.
  // ----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setMensaje("Ingresá el nombre del curso.");
      return;
    }

    await crearCurso(nombre);
    setMensaje("Curso creado correctamente.");
    setNombre("");
  };

  // ----------------------------------------------
  //  Render:
  // Muestra el formulario para crear un nuevo curso
  // y un botón para volver al panel de administración.
  // ----------------------------------------------
  return (
    <div className="container">
      <h1>Alta de Curso</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: 1°2°, 3°4°,4°5°"
        />
        <button type="submit">Crear Curso</button>
      </form>
      {mensaje && <p>{mensaje}</p>}

      {/*  Botón para volver al panel de administración */}
      <BotonRedirigir 
        textoBoton="IR A PANEL ADMIN" 
        ruta="/menuprincipal" 
      />
    </div>
  );
};

export default AltaCurso;

// ======================================================
//  RESUMEN:
// Este componente se usa exclusivamente para el alta de cursos.
// La lógica de comunicación con Firebase está abstraída en el hook `useCursos`,
// por lo que este archivo se enfoca solo en la parte visual y validaciones.
//
//  Archivos relacionados:
// - useCursos.js → lógica para crear/eliminar cursos.
// - BotonRedirigir.jsx → botón genérico para navegar entre rutas.
// - AltaCurso.css → estilos visuales de este formulario.
//
// ======================================================
