import React, { useState } from "react";
import { crearMateria } from "../hooks/useMaterias";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from '../components/BotonRedirigir';
import '../css/AltaMateria.css';

const AltaMateria = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

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
        {mensaje && (
          <p className={mensaje.includes("correctamente") ? "mensaje-exito" : "mensaje-error"}>
            {mensaje}
          </p>
        )}
        <div style={{ marginTop: 15 }}>
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default AltaMateria;
