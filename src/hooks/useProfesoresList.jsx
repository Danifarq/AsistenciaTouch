
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const useProfesoresList = () => {
  const [profesores, setProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProfesores = async () => {
      try {
        
        const querySnapshot = await getDocs(collection(db, "profesores"));

    
        const lista = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            materias: Array.isArray(doc.data().materias)
              ? doc.data().materias
              : [],
          }))
          .filter((u) => u.rol === "profesor" || u.rol === "usuario");

        setProfesores(lista);
      } catch (error) {
        console.error("Error al obtener profesores:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProfesores();
  }, []);

  return { profesores, cargando };
};
