import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import BotonRedirigir from "../components/BotonRedirigir";
import '../css/DetalleProfesor.css'; 
const DetalleProfesor = () => {
  const { id } = useParams();
  const [profesor, setProfesor] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProfesor = async () => {
      const docRef = doc(db, "profesores", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfesor(docSnap.data());
      }
      setCargando(false);
    };
    obtenerProfesor();
  }, [id]);

  if (cargando) return <p>Cargando datos...</p>;
  if (!profesor) return <p>Profesor no encontrado.</p>;

  return (
    <div className="detalle-profesor-page">
      <div className="detalle-profesor-box">
        <h2 className="detalle-profesor-title">Detalle Profesor</h2>

        <div className="detalle-profesor-info">
          <p><strong>Nombre:</strong> {profesor.nombre}</p>
          <p><strong>Materia:</strong> {profesor.materia}</p>
          <p><strong>Correo:</strong> {profesor.email}</p>
        </div>

        <div className="volver-panel">
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default DetalleProfesor;
