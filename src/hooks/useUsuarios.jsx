
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const crearUsuario = async ({ usuario, contrasena, rol, ...otrosDatos }) => {
  try {
    // 1. Crea el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, usuario, contrasena);
    const user = userCredential.user;

    // 2. Guarda los datos adicionales en Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      email: usuario,
      rol: rol || 'estudiante', // Asigna 'estudiante' si no se especifica un rol
      uid: user.uid,
      ...otrosDatos // Guarda cualquier otro dato del formulario
    });
    
    return true;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return false;
  }
};