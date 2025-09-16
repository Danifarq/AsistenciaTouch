
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../firebase/firebase";

export const useProfesoresList = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProfesores = async () => {
      try {
        const q = query(collection(db, 'usuarios'), where("rol", "==", "profesor"));
        const querySnapshot = await getDocs(q);
        const listaProfesores = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProfesores(listaProfesores);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener profesores:", error);
        setLoading(false);
      }
    };
    obtenerProfesores();
  }, []);

  return { profesores, loading };
};