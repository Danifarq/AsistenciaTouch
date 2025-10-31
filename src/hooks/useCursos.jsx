import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const CURSOS_COLLECTION = "cursos";

export const crearCurso = async (nombre) => {
  try {
    await addDoc(collection(db, CURSOS_COLLECTION), { nombre });
    console.log("Curso creado correctamente");
  } catch (error) {
    console.error("Error al crear curso:", error);
  }
};

export const obtenerCursos = async () => {
  const snapshot = await getDocs(collection(db, CURSOS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const eliminarCurso = async (id) => {
  try {
    await deleteDoc(doc(db, CURSOS_COLLECTION, id));
    console.log("Curso eliminado");
  } catch (error) {
    console.error("Error al eliminar curso:", error);
  }
};