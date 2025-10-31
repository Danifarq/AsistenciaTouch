import React, { useEffect, useState } from "react";
import { obtenerMaterias, eliminarMateria } from "../hooks/useMaterias";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from '../components/BotonRedirigir';
const BajaMateria = () => {
  const [materias, setMaterias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const cargarMaterias = async () => {
    const data = await obtenerMaterias();
    setMaterias(data);
  };

  const handleEliminar = async (id) => {
    await eliminarMateria(id);
    setMensaje("Materia eliminada correctamente.");
    cargarMaterias();
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  return (
    <div className="container">
      <h1>Baja de Materia</h1>
      {materias.map((mat) => (
        <div key={mat.id} className="materia-item">
          <span>{mat.nombre}</span>
          <button onClick={() => handleEliminar(mat.id)}>Eliminar</button>
        </div>
      ))}
      {mensaje && <p>{mensaje}</p>}
     
     <div style={{ marginBottom: 8 }}>
              <BotonRedirigir textoBoton="ir a Panel Admin" ruta="/menuprincipal" />
            </div>
            </div>
  );
};

export default BajaMateria;
