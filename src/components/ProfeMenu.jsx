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
        <button className="profe-button" onClick={guardarAsistencia}>
          Confirmar asistencia y continuar
        </button>
      </div>
    </div>
  );
};

export default ProfeMenu;
