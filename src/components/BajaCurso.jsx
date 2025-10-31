import React, { useEffect, useState } from "react";
import { obtenerCursos, eliminarCurso } from "../hooks/useCursos";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from "../components/BotonRedirigir";
import "../css/BajaCurso.css";

const BajaCurso = () => {
  const [cursos, setCursos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const cargarCursos = async () => {
    const data = await obtenerCursos();
    setCursos(data);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este curso?");
    if (!confirmar) return;

    await eliminarCurso(id);
    setMensaje("Curso eliminado correctamente ✅");
    cargarCursos();
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  return (
    <div className="baja-curso-page">
      <div className="baja-curso-box">
        <h1 className="baja-curso-title">Baja de curso</h1>

        {cursos.length === 0 ? (
          <p>No hay cursos registrados.</p>
        ) : (
          <ul className="baja-curso-lista">
            {cursos.map((curso) => (
              <li key={curso.id} className="baja-curso-item">
                <span className="curso-nombre">{curso.nombre}</span>
                <button
                  onClick={() => handleEliminar(curso.id)}
                  className="baja-curso-btn"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {mensaje && (
          <p
            className={
              mensaje.includes("correctamente") ? "mensaje-exito" : "mensaje-error"
            }
          >
            {mensaje}
          </p>
        )}

        <div className="volver-panel">
          <BotonRedirigir textoBoton="ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default BajaCurso;
