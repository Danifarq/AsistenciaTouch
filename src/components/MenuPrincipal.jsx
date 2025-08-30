import React, { useState } from "react";
import "../index.css";

const MenuPrincipal = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const cursos = ["6° 2°", "1° 3°", "1° 2°"];

  return (
    <div className="menu-principal-container">
      <label className="curso-label">CURSO:</label>
      <select
        className="curso-select"
        value={cursoSeleccionado}
        onChange={(e) => setCursoSeleccionado(e.target.value)}
      >
        <option value="">Seleccione un curso</option>
        {cursos.map((curso, index) => (
          <option key={index} value={curso}>
            {curso}
          </option>
        ))}
      </select>
    
    </div>
  );
};

export default MenuPrincipal;
