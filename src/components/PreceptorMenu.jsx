// PreceptorMenu.jsx
/**
 * 📘 Componente: PreceptorMenu
 * 
 * Descripción:
 * Este componente representa la **pantalla principal del preceptor**.
 * Permite registrar **ausencias de profesores**, seleccionando:
 * - Profesor
 * - Curso
 * - Materia
 *
 * Props recibidas:
 * - profesores: lista de profesores disponibles (desde Firestore).
 * - cursos: lista de cursos disponibles.
 * - materias: lista de materias disponibles.
 * - cursoSeleccionado, setCursoSeleccionado: controlan el curso actual.
 * - materiaSeleccionada, setMateriaSeleccionada: controlan la materia actual.
 * - profesorSeleccionado, setProfesorSeleccionado: controlan el profesor elegido.
 * - registrarAusencia: función que guarda la ausencia en Firestore.
 *
 * Flujo general:
 * 1️⃣ El preceptor selecciona profesor, curso y materia.
 * 2️⃣ Al presionar "Confirmar ausencia", se ejecuta registrarAusencia().
 *
 * Ubicación en el proyecto:
 * Este componente se carga dentro de `MenuPrincipal.jsx` cuando el usuario logueado tiene rol `"preceptor"`.
 */

import React from "react";

const PreceptorMenu = ({
  profesores,
  cursoSeleccionado,
  setCursoSeleccionado,
  materiaSeleccionada,
  setMateriaSeleccionada,
  profesorSeleccionado,
  setProfesorSeleccionado,
  cursos,
  materias,
  registrarAusencia
}) => {
  return (
    <div className="preceptor-page">
      <div className="preceptor-box">
        <h1 className="preceptor-title">Bienvenido Preceptor</h1>
        <h2>Registrar ausencia de profesor:</h2>

        <div className="preceptor-form">
          <select
            value={profesorSeleccionado}
            onChange={(e) => setProfesorSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un profesor</option>
            {profesores.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>

          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.nombre}>{c.nombre}</option>
            ))}
          </select>

          <select
            value={materiaSeleccionada}
            onChange={(e) => setMateriaSeleccionada(e.target.value)}
          >
            <option value="">Seleccione una materia</option>
            {materias.map((m) => (
              <option key={m.id} value={m.nombre}>{m.nombre}</option>
            ))}
          </select>
        </div>

        <br />
        <button className="preceptor-button" onClick={registrarAusencia}>
          Confirmar ausencia
        </button>
      </div>
    </div>
  );
};

export default PreceptorMenu;
