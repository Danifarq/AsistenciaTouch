import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const crearUsuario = async ({ usuario, contrasena, rol, ...otrosDatos }) => {
  if (!usuario || !contrasena) {
    console.error("Faltan el correo o la contraseña.");
    return { exito: false, mensaje: "Faltan datos obligatorios." };
  }

  try {
    // 1️⃣ Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, usuario, contrasena);
    const user = userCredential.user;

    // 2️⃣ Crear documento en Firestore usando el UID como ID del documento
    await setDoc(doc(db, 'usuarios', user.uid), {
      rol: rol || 'usuario',
      ...otrosDatos
    });
    
    // ✅ CAMBIO IMPORTANTE: Ahora retornamos también el UID
    return { 
      exito: true, 
      mensaje: "Usuario creado con éxito.",
      uid: user.uid  // 👈 Agregamos el UID aquí
    };
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

// ======================================================
// RESUMEN DE CAMBIOS:
// 
// 1. Se agregó `uid: user.uid` al objeto de retorno exitoso
// 2. Ahora cuando llames a crearUsuario(), recibirás:
//    { exito: true, mensaje: "...", uid: "abc123..." }
// 3. Este UID es el mismo que se usa como ID del documento
//    en la colección "usuarios"
// 4. Puedes usar este UID para crear documentos relacionados
//    en otras colecciones (como "preceptores")
// ======================================================