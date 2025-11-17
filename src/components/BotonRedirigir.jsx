// ======================================================
//  GUÍA PARA NUEVOS DESARROLLADORES - BotonRedirigir.jsx
// ======================================================
//
//  Componente reutilizable para navegar entre páginas.
// Recibe dos props:
// - textoBoton → texto que se muestra en el botón.
// - ruta → ruta a la que se navegará al hacer click.
//
//  DEPENDENCIAS PRINCIPALES:
// - React Router (`useNavigate`) para cambiar de página.
// - CSS global o propio del botón.
//
// ======================================================

import React from "react";
import { useNavigate } from "react-router-dom";

const BotonRedirigir = ({ textoBoton, ruta }) => {
  const navigate = useNavigate();

  return (
    <span style={{ marginTop: "5px" }}>
      <button className="boton" onClick={() => navigate(ruta)}>
        {textoBoton}
      </button>
    </span>
  );
};

export default BotonRedirigir;
