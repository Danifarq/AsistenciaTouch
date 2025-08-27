import React from "react";
import { useNavigate } from "react-router-dom";
const BotonRedirigir = ({ mensaje, textoBoton, ruta }) => {
  const navigate = useNavigate();
   return ( 
    <div style={{ marginTop: "5px" }}>
      <p>{mensaje}</p>
      <button className="boton" onClick={() => navigate(ruta)}>
        {textoBoton}
      </button>
        </div>
       );
};

export default BotonRedirigir;