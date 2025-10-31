import React, { useState } from "react";
import { crearCurso } from "../hooks/useCursos";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from '../components/BotonRedirigir';
const AltaCurso = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setMensaje("Ingresá el nombre del curso.");
      return;
    }

    await crearCurso(nombre);
    setMensaje("Curso creado correctamente.");
    setNombre("");
  };

  return (
    <div className="container">
      <h1>Alta de Curso</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: 1°2°, 3°4°,4°5°"
        />
        <button type="submit">Crear Curso</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      <BotonRedirigir 
                    textoBoton="IR A PANEL ADMIN" 
                    ruta="/menuprincipal" 
                /></div>
  );
};
