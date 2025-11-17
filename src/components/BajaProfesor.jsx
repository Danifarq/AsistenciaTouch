import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import BotonRedirigir from '../components/BotonRedirigir';
import '../css/BajaProfesor.css';
import { useProfesores } from "../hooks/useProfesores";

const BajaProfesor = () => {
  const [profesores, setProfesores] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const { desactivarProfesor } = useProfesores(); // ✔️ importación correcta

  useEffect(() => {
    const obtenerProfesores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profesores"));
        const lista = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setProfesores(lista);
      } catch (error) {
        console.error("Error al obtener profesores:", error);
      }
    };
    obtenerProfesores();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este profesor?");
    if (!confirmar) return;

    try {
      await desactivarProfesor(id);
      setMensaje("Profesor eliminado correctamente ✅");
    } catch (error) {
      setMensaje("Error al eliminar profesor");
      console.error(error);
    }
  };

  return (
    <div className="baja-profesor-page">
      <div className="baja-profesor-box">
        <h1 className="baja-profesor-title">Baja de profesor</h1>

        {profesores.length === 0 ? (
          <p>No hay profesores registrados.</p>
        ) : (
          <ul className="baja-profesor-lista">
            {profesores.map((prof) => (
              <li key={prof.id} className="baja-profesor-item">
                <span className="profesor-nombre">
                  {prof.nombre || "Profesor sin nombre"}
                </span>
                <button
                  onClick={() => handleEliminar(prof.id)}
                  className="baja-profesor-btn"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {mensaje && <p>{mensaje}</p>}

        <div className="volver-panel">
          <BotonRedirigir textoBoton="ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default BajaProfesor;
