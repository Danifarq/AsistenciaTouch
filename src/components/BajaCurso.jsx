// ======================================================
//  GUÍA PARA NUEVOS DESARROLLADORES - BajaCurso.jsx
// ======================================================
//
//  Este componente permite al administrador eliminar cursos existentes.
// Muestra la lista de cursos y permite borrarlos individualmente.
// Utiliza funciones del hook `useCursos` para obtener y eliminar datos.
//
//  DEPENDENCIAS PRINCIPALES:
// - React: manejo del estado y renderizado.
// - useCursos: funciones para obtener y eliminar cursos de Firestore.
// - React Router: navegación entre pantallas (`useNavigate`).
// - BotonRedirigir: botón reutilizable para regresar al panel admin.
// - CSS: estilos específicos de la pantalla de baja de cursos.
//
// ======================================================

import React, { useEffect, useState } from "react";
import { obtenerCursos, eliminarCurso } from "../hooks/useCursos";

import BotonRedirigir from "../components/BotonRedirigir";
import "../css/BajaCurso.css";

const BajaCurso = () => {
  // ----------------------------------------------
  //  Estados locales:
  // - cursos → array con los cursos cargados desde Firestore.
  // - mensaje → feedback al usuario tras eliminar un curso.
  // ----------------------------------------------
  const [cursos, setCursos] = useState([]);
  const [mensaje, setMensaje] = useState("");



  // ----------------------------------------------
  //  cargarCursos:
  // Función que obtiene los cursos desde Firestore
  // usando el hook `obtenerCursos` y actualiza el estado.
  // ----------------------------------------------
  const cargarCursos = async () => {
    const data = await obtenerCursos();
    setCursos(data);
  };

  // ----------------------------------------------
  //  handleEliminar:
  // Función que elimina un curso seleccionado.
  // 1️⃣ Pide confirmación al usuario.
  // 2️⃣ Llama a `eliminarCurso` del hook `useCursos`.
  // 3️⃣ Muestra mensaje de éxito y recarga la lista.
  // ----------------------------------------------
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este curso?");
    if (!confirmar) return;

    await eliminarCurso(id);
    setMensaje("Curso eliminado correctamente ✅");
    cargarCursos();
  };

  // ----------------------------------------------
  //  useEffect:
  // Carga los cursos al montar el componente.
  // ----------------------------------------------
  useEffect(() => {
    cargarCursos();
  }, []);

  // ----------------------------------------------
  //  Renderizado:
  // - Lista de cursos con botón de eliminación.
  // - Mensaje de feedback según resultado.
  // - Botón para volver al panel admin.
  // ----------------------------------------------
  return (
    <div className="baja-curso-page">
      <div className="baja-curso-box">
        <h1 className="baja-curso-title">Baja de curso</h1>

        {/* Lista de cursos o mensaje si no hay cursos */}
        {cursos.length === 0 ? (
          <p>No hay cursos registrados.</p>
        ) : (
          <ul className="baja-curso-lista">
            {cursos.map((curso) => (
              <li key={curso.id} className="baja-curso-item">
                <span className="curso-nombre">{curso.nombre}</span>
                <button
                  onClick={() => handleEliminar(curso.id)}
                  className="baja-curso-btn"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Mensaje de éxito o error */}
        {mensaje && (
          <p
            className={
              mensaje.includes("correctamente") ? "mensaje-exito" : "mensaje-error"
            }
          >
            {mensaje}
          </p>
        )}

        {/*  Botón para volver al panel admin */}
        <div className="volver-panel">
          <BotonRedirigir textoBoton="ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default BajaCurso;

// ======================================================
//  RESUMEN:
// Este componente permite dar de baja cursos existentes.
// Utiliza las funciones `obtenerCursos` y `eliminarCurso` del hook `useCursos`.
// Incluye confirmación antes de borrar y recarga la lista tras la eliminación.
//
//  Archivos relacionados:
// - useCursos.js → contiene la lógica de Firestore para cursos.
// - BotonRedirigir.jsx → navegación simple.
// - BajaCurso.css → estilos de esta pantalla.
//
// ======================================================
