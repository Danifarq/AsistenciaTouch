import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const MATERIAS_COLLECTION = "materias";

export const crearMateria = async (nombre) => {
  try {
    await addDoc(collection(db, MATERIAS_COLLECTION), { nombre });
    console.log("Materia creada con éxito");
  } catch (error) {
    console.error("Error al crear materia:", error);
  }
};

export const obtenerMaterias = async () => {
  const snapshot = await getDocs(collection(db, MATERIAS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const eliminarMateria = async (id) => {
  try {
    await deleteDoc(doc(db, MATERIAS_COLLECTION, id));
    console.log("Materia eliminada");
  } catch (error) {
    console.error("Error al eliminar materia:", error);
  }
};

export const changeMateria = async (id, nuevoNombre) => {
  try {
    const materiaRef = doc(db, MATERIAS_COLLECTION, id);
    await updateDoc(materiaRef, { nombre: nuevoNombre });
    console.log("Materia actualizada con éxito");
  } catch (error) {
    console.error("Error al actualizar materia:", error);
  }
};

export const desactivarMateria = async (id) => {
  try {
    const materiaRef = doc(db, MATERIAS_COLLECTION, id);
    await updateDoc(materiaRef, { activa: false });
    console.log("Materia desactivada con éxito");
  } catch (error) {
    console.error("Error al desactivar materia:", error);
  }
};

export const activarMateria = async (id) => {
  try {
    const materiaRef = doc(db, MATERIAS_COLLECTION, id);
    await updateDoc(materiaRef, { activa: true });
    console.log("Materia activada con éxito");
  } catch (error) {
    console.error("Error al activar materia:", error);
  }
};