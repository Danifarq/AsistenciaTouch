// ======================================================
//  GUÍA PARA NUEVOS DESARROLLADORES - BajaProfesor.jsx
// ======================================================
//
//  Este componente permite eliminar profesores registrados.
// Borra solo la colección "profesores" en Firestore.
//
//  DEPENDENCIAS PRINCIPALES:
// - React: manejo de estados y renderizado.
// - Firebase Firestore: lectura y eliminación de documentos.
// - BotonRedirigir: navegación de vuelta al panel admin.
// - CSS: estilos de la página.
//
// ======================================================

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import BotonRedirigir from '../components/BotonRedirigir';
import '../css/BajaProfesor.css';

const BajaProfesor = () => {
  const [profesores, setProfesores] = useState([]);

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

  const eliminarProfesor = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este profesor?");
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "profesores", id));
      setProfesores((prev) => prev.filter((p) => p.id !== id));
      alert("Profesor eliminado correctamente ✅");
    } catch (error) {
      console.error("Error al eliminar profesor:", error);
      alert("Ocurrió un error al eliminar el profesor.");
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
                  onClick={() => eliminarProfesor(prof.id)}
                  className="baja-profesor-btn"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="volver-panel">
          <BotonRedirigir textoBoton="ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default BajaProfesor;
