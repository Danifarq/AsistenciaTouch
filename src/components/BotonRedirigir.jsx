import React from "react";
import { useNavigate } from "react-router-dom";
const BotonRedirigir = ({  textoBoton, ruta }) => {
  const navigate = useNavigate();
   return ( 
    <div style={{ marginTop: "5px" }}>
      
      <button className="boton" onClick={() => navigate(ruta)}>
        {textoBoton}
      </button>

        </div>
       );
};

export default BotonRedirigir;