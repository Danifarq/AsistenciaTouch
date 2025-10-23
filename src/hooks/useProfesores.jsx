
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const useProfesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);


  const obtenerProfesores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "profesores"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfesores(lista);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
    } finally {
      setCargando(false);
    }
  };


  const agregarProfesor = async (nuevoProfesor) => {
    try {
      const docRef = await addDoc(collection(db, "profesores"), nuevoProfesor);
      setProfesores([...profesores, { id: docRef.id, ...nuevoProfesor }]);
      return docRef.id; 
    } catch (error) {
      console.error("Error al agregar profesor:", error);
      throw error;
    }
  };

  useEffect(() => {
    obtenerProfesores();
  }, []);

  return { profesores, cargando, agregarProfesor };
};
