import React from 'react';
import { useNavigate } from 'react-router-dom';
import BotonRedirigir from '../components/BotonRedirigir';
import '../css/Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-fondo">
      <div className="overlay"></div>

      <div className="inicio-contenedor">
        <h1 className="titulo">ASISTENCIA CONFIRMADA</h1>
        <p className="subtexto">Tu asistencia ha sido registrada correctamente.</p>
        <BotonRedirigir textoBoton="IR A MENU PRINCIPAL" ruta="/menuprincipal" />
      </div>
    </div>
  );
};

export default Inicio;
