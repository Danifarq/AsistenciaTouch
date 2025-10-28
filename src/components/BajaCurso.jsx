import React, { useEffect, useState } from "react";
import { obtenerCursos, eliminarCurso } from "../hooks/useCursos";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from '../components/BotonRedirigir';
const BajaCurso = () => {
  const [cursos, setCursos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const cargarCursos = async () => {
    const data = await obtenerCursos();
    setCursos(data);
  };

  const handleEliminar = async (id) => {
    await eliminarCurso(id);
    setMensaje("Curso eliminado correctamente.");
    cargarCursos();
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  return (
    <div className="container">
      <h1>Baja de Curso</h1>
      {cursos.map((curso) => (
        <div key={curso.id} className="curso-item">
          <span>{curso.nombre}</span>
          <button onClick={() => handleEliminar(curso.id)}>Eliminar</button>
        </div>
      ))}
      {mensaje && <p>{mensaje}</p>}
     <BotonRedirigir 
                    textoBoton="IR A PANEL ADMIN" 
                    ruta="/menuprincipal" 
                /> </div>
  );
};

export default BajaCurso;
