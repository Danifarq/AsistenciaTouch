import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const crearUsuario = async ({ usuario, contrasena, rol, ...otrosDatos }) => {
  if (!usuario || !contrasena) {
    console.error("Faltan el correo o la contraseña.");
    return { exito: false, mensaje: "Faltan datos obligatorios." };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, usuario, contrasena);
    const user = userCredential.user;

    await setDoc(doc(db, 'usuarios', user.uid), {
      rol: rol || 'usuario',
      ...otrosDatos
    });
    
    return { exito: true, mensaje: "Usuario creado con éxito." };
  } catch (error) {
    let mensajeError;
    switch (error.code) {
      case 'auth/email-already-in-use':
        mensajeError = "Este correo ya está registrado.";
        break;
      case 'auth/invalid-email':
        mensajeError = "El formato del correo es inválido.";
        break;
      case 'auth/weak-password':
        mensajeError = "La contraseña es muy débil. Debe tener al menos 6 caracteres.";
        break;
      default:
        mensajeError = "Ocurrió un error al crear el usuario. Por favor, inténtelo de nuevo.";
        console.error("Error al crear usuario:", error);
    }
    return { exito: false, mensaje: mensajeError };
  }
};