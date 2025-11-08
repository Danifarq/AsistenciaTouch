// ======================================================
//  GUÍA PARA NUEVOS DESARROLLADORES - AltaMateria.jsx
// ======================================================
//
//  Este componente permite al administrador crear una nueva materia.
// Se conecta con Firebase a través del hook personalizado `useMaterias`.
//
//  DEPENDENCIAS PRINCIPALES:
// - React: manejo del estado y renderizado del componente.
// - useMaterias: contiene la lógica para crear materias en Firestore.
// - useNavigate: para redirigir entre páginas (aunque aquí no se usa directamente).
// - BotonRedirigir: botón reutilizable para volver al panel admin.
// - CSS: define el estilo de la interfaz del alta.
//
// ======================================================

import React, { useState } from "react";
import { crearMateria } from "../hooks/useMaterias";

import BotonRedirigir from '../components/BotonRedirigir';
import '../css/AltaMateria.css';

const AltaMateria = () => {
  // ----------------------------------------------
  //  Estados locales:
  // - nombre: almacena el nombre ingresado de la materia.
  // - mensaje: guarda mensajes de error o confirmación.
  // ----------------------------------------------
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");



  // ----------------------------------------------
  //  handleSubmit:
  // Maneja el evento de envío del formulario.
  // 1️⃣ Evita el comportamiento por defecto del form.
  // 2️⃣ Verifica que se haya ingresado un nombre.
  // 3️⃣ Llama a `crearMateria` para guardar en Firestore.
  // 4️⃣ Limpia el input y muestra un mensaje de éxito.
  // ----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setMensaje("Por favor ingresa un nombre de materia.");
      return;
    }

    await crearMateria(nombre);
    setMensaje("Materia creada correctamente.");
    setNombre("");
  };

  // ----------------------------------------------
  //  Render:
  // Contiene el formulario de creación de materia,
  // los mensajes de validación y el botón para volver
  // al panel principal de administración.
  // ----------------------------------------------
  return (
    <div className="alta-materia-page">
      <div className="alta-materia-box">
        <h1 className="alta-materia-title">Alta de Materia</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la materia"
            className="alta-materia-input"
          />
          <button type="submit" className="alta-materia-btn">Crear Materia</button>
        </form>

        {/*  Muestra un mensaje según el resultado del proceso */}
        {mensaje && (
          <p className={mensaje.includes("correctamente") ? "mensaje-exito" : "mensaje-error"}>
            {mensaje}
          </p>
        )}

        {/*  Botón para regresar al panel admin */}
        <div style={{ marginTop: 15 }}>
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default AltaMateria;

// ======================================================
// RESUMEN:
// Este componente está destinado al alta (creación) de nuevas materias.
// Centraliza la validación del formulario y el envío de datos,
// mientras que la lógica de comunicación con Firebase está abstraída
// en el hook `useMaterias`.
//
// Archivos relacionados:
// - useMaterias.js → lógica de Firestore (crear/eliminar materias).
// - BotonRedirigir.jsx → navegación simple entre pantallas.
// - AltaMateria.css → define el diseño visual del formulario.
//
// ======================================================
