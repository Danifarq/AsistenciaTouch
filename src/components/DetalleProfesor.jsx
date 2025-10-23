
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const DetalleProfesor = () => {
  const { id } = useParams();
  const [profesor, setProfesor] = useState(null);

  useEffect(() => {
    const obtenerProfesor = async () => {
      const docRef = doc(db, "profesores", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfesor(docSnap.data());
      }
    };
    obtenerProfesor();
  }, [id]);

  if (!profesor) return <p>Cargando datos...</p>;

  return (
    <div>
      <h2>Detalle del Profesor</h2>
      <p><strong>Nombre:</strong> {profesor.nombre}</p>
      <p><strong>Materia:</strong> {profesor.materia}</p>
      <p><strong>Email:</strong> {profesor.email}</p>
    </div>
  );
};

export default DetalleProfesor;
