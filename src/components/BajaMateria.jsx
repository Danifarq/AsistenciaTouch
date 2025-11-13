// ======================================================
// GUÍA PARA NUEVOS DESARROLLADORES - BajaMateria.jsx
// ======================================================
//
//  Este componente permite al administrador eliminar materias registradas.
// Muestra la lista de materias y permite borrarlas individualmente.
//
// DEPENDENCIAS PRINCIPALES:
// - React: manejo de estados y renderizado.
// - useMaterias: funciones para obtener y eliminar materias en Firestore.
// - React Router: navegación (`useNavigate`).
// - BotonRedirigir: botón reutilizable para volver al panel admin.
// - CSS: estilos específicos para la vista.
//
// ======================================================

import React, { useEffect, useState } from "react";
import { obtenerMaterias, eliminarMateria, desactivarMateria } from "../hooks/useMaterias";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from "../components/BotonRedirigir";
import "../css/BajaMateria.css";

const BajaMateria = () => {
  const [materias, setMaterias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const cargarMaterias = async () => {
    const data = await obtenerMaterias();
    setMaterias(data);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar esta materia?");
    if (!confirmar) return;

    await desactivarMateria(id);
    setMensaje("Materia eliminada correctamente ✅");
    cargarMaterias();

    {/*await eliminarMateria(id);
    setMensaje("Materia eliminada correctamente ✅");
    cargarMaterias();
  */} };

  useEffect(() => {
    cargarMaterias();
  }, []);

  return (
    <div className="baja-materia-page">
      <div className="baja-materia-box">
        <h1 className="baja-materia-title">Baja de materia</h1>

        {materias.length === 0 ? (
          <p>No hay materias registradas.</p>
        ) : (
          <ul className="baja-materia-lista">
            {materias.map((mat) => (
              <li key={mat.id} className="baja-materia-item">
                <span className="materia-nombre">{mat.nombre}</span>
                <button
                  onClick={() => handleEliminar(mat.id)}
                  className="baja-materia-btn"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {mensaje && (
          <p
            className={mensaje.includes("correctamente") ? "mensaje-exito" : "mensaje-error"}
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

export default BajaMateria;
