import { db } from "../firebase/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc
} from "firebase/firestore";

const MATERIAS_COLLECTION = "materias";

export const crearMateria = async (nombre) => {
  try {
    await addDoc(collection(db, MATERIAS_COLLECTION), { 
      nombre,
      activa: true
    });
    console.log("Materia creada con éxito");
  } catch (error) {
    console.error("Error al crear materia:", error);
    throw error;
  }
};

export const obtenerMaterias = async () => {
  try {
    const snapshot = await getDocs(collection(db, MATERIAS_COLLECTION));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener materias:", error);
    return [];
  }
};

export const eliminarMateria = async (id) => {
  try {
    await deleteDoc(doc(db, MATERIAS_COLLECTION, id));
    console.log("Materia eliminada");
  } catch (error) {
    console.error("Error al eliminar materia:", error);
    throw error;
  }
};

export const changeMateria = async (id, nuevoNombre) => {
  try {
    const materiaRef = doc(db, MATERIAS_COLLECTION, id);
    await updateDoc(materiaRef, { nombre: nuevoNombre });
    console.log("Materia actualizada con éxito");
  } catch (error) {
    console.error("Error al actualizar materia:", error);
    throw error;
  }
};

export const desactivarMateria = async (id) => {
  try {
    const materiaRef = doc(db, MATERIAS_COLLECTION, id);
    await updateDoc(materiaRef, { activa: false });
    console.log("Materia desactivada con éxito");
  } catch (error) {
    console.error("Error al desactivar materia:", error);
    throw error;
  }
};

export const activarMateria = async (id) => {
  try {
    const materiaRef = doc(db, MATERIAS_COLLECTION, id);
    await updateDoc(materiaRef, { activa: true });
    console.log("Materia activada con éxito");
  } catch (error) {
    console.error("Error al activar materia:", error);
    throw error;
  }
};