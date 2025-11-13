// ======================================================
//  GUÍA PARA NUEVOS DESARROLLADORES - AltaPreceptor.jsx
// ======================================================
//
//  Este componente permite al administrador registrar un nuevo preceptor.
// Al enviarse el formulario, se crean dos registros en Firestore:
// 1️⃣ En la colección "usuarios" con rol asignado como "preceptor".
// 2️⃣ En la colección "preceptores" con los mismos datos básicos.
//
//  DEPENDENCIAS PRINCIPALES:
// - React: para manejar el estado y los eventos del formulario.
// - Firebase Firestore: para guardar los datos en la base de datos.
// - BotonRedirigir: componente reutilizable para volver al panel admin.
// - CSS: define el estilo visual del formulario de alta.
//
// ======================================================

import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import BotonRedirigir from "../components/BotonRedirigir";
import "../css/AltaPreceptor.css";
import '../hooks/usePreceptores';

const AltaPreceptor = () => {
  // ----------------------------------------------
  // Estados locales:
  // - nombre, apellido, email → valores del formulario.
  // - error → mensaje si falta algún dato o ocurre un fallo en Firebase.
  // - exito → mensaje de confirmación al crear correctamente.
  // ----------------------------------------------
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // ----------------------------------------------
  //  handleSubmit:
  // Se ejecuta al enviar el formulario.
  // 1️⃣ Limpia mensajes previos.
  // 2️⃣ Valida que todos los campos estén completos.
  // 3️⃣ Agrega un nuevo documento a:
  //     - "usuarios" (para control de roles)
  //     - "preceptores" (colección específica)
  // 4️⃣ Muestra un mensaje de éxito o error.
  // ----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (nombre || apellido || rol == setPreceptores(lista) ) {
      try{ activarPreceptor(id); // Activar en "preceptores"
      setMensaje("Preceptor activado correctamente ✅");
    } catch (error) {
      console.error("Error al activar preceptor:", error);
    }
    if (!nombre || !apellido || !email) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      // Agregar a la colección "usuarios" con rol preceptor
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre,
        apellido,
        email,
        rol: "preceptor",
      });

      // Agregar también a la colección "preceptores" con el ID generado
      await addDoc(collection(db, "preceptores"), {
        id: docRef.id,
        nombre,
        apellido,
        email,
      });

      setExito("Preceptor agregado correctamente.");
      setNombre("");
      setApellido("");
      setEmail("");
    } catch (error) {
      console.error("Error agregando preceptor:", error);
      setError("Ocurrió un error al agregar el preceptor.");
    }
  };
}

  // ----------------------------------------------
  //  Render:
  // Formulario con los campos requeridos, mensajes de estado
  // y botón para regresar al panel de administración.
  // ----------------------------------------------
  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <h1>Alta de Preceptor</h1>

        {/* Campos del formulario */}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Botón principal */}
        <button type="submit" className="btn-registrar">
          Agregar Preceptor
        </button>

        {/* Mensajes de error o éxito */}
        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        {/*  Botón para volver al panel admin */}
        <div className="volver-panel">
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </form>
    </div>
  );
};

export default AltaPreceptor;

// ======================================================
//  RESUMEN:
// Este componente implementa la funcionalidad de alta de preceptores.
// Crea registros sincronizados en "usuarios" y "preceptores" dentro de Firestore.
// Idealmente, debería validarse también si el email ya existe en la base.
//
//  Archivos relacionados:
// - firebase.js → configuración y conexión con Firestore.
// - BotonRedirigir.jsx → componente reutilizable de navegación.
// - AltaPreceptor.css → define estilos visuales de la pantalla.
//
// ====================================================== 