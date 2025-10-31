// ProfeMenu.jsx
/**
 * 📘 Componente: ProfeMenu
 *
 * Descripción:
 * Este componente representa la **pantalla principal del profesor**.
 * Permite **registrar asistencia** seleccionando:
 * - Curso
 * - Materia
 *
 * Props recibidas:
 * - cursos: lista de cursos disponibles.
 * - materias: lista de materias disponibles.
 * - cursoSeleccionado, setCursoSeleccionado: controlan el curso actual.
 * - materiaSeleccionada, setMateriaSeleccionada: controlan la materia actual.
 * - guardarAsistencia: función que guarda la asistencia del profesor en Firestore.
 *
 * Flujo general:
 * 1️⃣ El profesor selecciona su curso y materia.
 * 2️⃣ Al hacer clic en “Confirmar Asistencia”, se llama guardarAsistencia().
 *
 * Ubicación en el proyecto:
 * Se muestra dentro de `MenuPrincipal.jsx` cuando el usuario tiene rol `"profesor"`.
 */

import React from "react";

const ProfeMenu = ({
  cursoSeleccionado,
  setCursoSeleccionado,
  materiaSeleccionada,
  setMateriaSeleccionada,
  cursos,
  materias,
  guardarAsistencia
}) => {
  return (
    <div className="profe-wrapper">
      <div className="profe-container">
        <h1>Bienvenido Profe</h1>
        <h2 className="profe-subtitle">Seleccione su curso y materia:</h2>

        <div className="profe-menu">
          <label className="profe-label">CURSO:</label>
          <select
            className="profe-select"
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.nombre}>
                {curso.nombre}
              </option>
            ))}
          </select>

          <label className="profe-label" style={{ marginLeft: 12 }}>MATERIA:</label>
          <select
            className="profe-select"
            value={materiaSeleccionada}
            onChange={(e) => setMateriaSeleccionada(e.target.value)}
          >
            <option value="">Seleccione una materia</option>
            {materias.map((mat) => (
              <option key={mat.id} value={mat.nombre}>
                {mat.nombre}
              </option>
            ))}
          </select>
        </div>

        <br />
       <button onClick={guardarAsistencia} className="btn-confirmar">
  Confirmar Asistencia
</button>

      </div>
    </div>
  );
};

export default ProfeMenu;
