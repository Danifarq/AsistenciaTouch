import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from '../components/BotonRedirigir';
const BajaProfesor = () => {
  const [profesores, setProfesores] = useState([]);
  const navigate = useNavigate();

  
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

  //Función para eliminar profesor
  const eliminarProfesor = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este profesor?");
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "profesores", id));
      setProfesores((prev) => prev.filter((p) => p.id !== id));
      alert("Profesor eliminado correctamente ✅");
    } catch (error) {
      console.error("Error al eliminar profesor:", error);
      alert("Ocurrió un error al eliminar el profesor ");
    }
  };

  
  return (
    <div className="baja-profesor-container">
      <h2>Baja de Profesores</h2>
      <p>Seleccioná un profesor para eliminarlo de la base de datos.</p>

      {profesores.length === 0 ? (
        <p>No hay profesores registrados.</p>
      ) : (
        <div className="lista-profesores">
          {profesores.map((prof) => (
            <div key={prof.id} className="profesor-item">
              <p>
                <strong>{prof.nombre}</strong> – {prof.materia} <br />
                <small>{prof.email}</small>
              </p>
              <button
                onClick={() => eliminarProfesor(prof.id)}
                className="btn-eliminar"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

     <BotonRedirigir 
                    textoBoton="IR A PANEL ADMIN" 
                    ruta="/menuprincipal" 
                />
    </div>
  );
};

export default BajaProfesor;
