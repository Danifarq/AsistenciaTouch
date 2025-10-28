import React, { useState } from "react";
import { crearMateria } from "../hooks/useMaterias";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from '../components/BotonRedirigir';
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
    <div className="container">
      <h1>Alta de Materia</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la materia"
        />
        <button type="submit">Crear Materia</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    <div style={{ marginBottom: 8 }}>
              <BotonRedirigir textoBoton="ir a Panel Admin" ruta="/menuprincipal" /></div>
              </div>
  );
};

export default AltaMateria;
