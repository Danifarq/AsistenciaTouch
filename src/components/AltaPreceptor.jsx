import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import BotonRedirigir from "../components/BotonRedirigir";
import "../css/AltaPreceptor.css";

// HOOKS
import { usePreceptores } from "../hooks/usePreceptores";
import { crearUsuario } from "../hooks/crearUsuario";

const AltaPreceptor = () => {
  const { preceptores, activarPreceptor } = usePreceptores();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // Validación básica
    if (!nombre || !apellido || !email) {
      setError("⚠️ Por favor completa todos los campos.");
      return;
    }

    // Validación de email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("⚠️ Ingresá un correo válido");
      return;
    }

    try {
      // 🔍 VERIFICACIÓN: Buscar si el preceptor ya existe
      const preceptorExistente = preceptores.find(
        (prec) => prec.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (preceptorExistente) {
        if (!preceptorExistente.activo) {
          // ✅ CASO 1: Existe pero está DESACTIVADO → ACTIVAR
          await activarPreceptor(preceptorExistente.id);
          setExito("✅ El preceptor ya existía y ha sido activado nuevamente");
          
          setNombre("");
          setApellido("");
          setEmail("");
        } else {
          // ⚠️ CASO 2: Ya existe y está ACTIVO
          setError("⚠️ Este preceptor ya existe y está activo");
        }
      } else {
        // 🆕 CASO 3: NO existe → CREAR NUEVO
        
        // Generar contraseña temporal
        const contrasenaTemp = `Temp${Math.random().toString(36).slice(-8)}!`;
        
        // 1️⃣ Crear usuario en Firebase Authentication + colección "usuarios"
        const resultado = await crearUsuario({
          usuario: email.trim(),
          contrasena: contrasenaTemp,
          rol: "preceptor",
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim()
        });

        if (!resultado.exito) {
          setError(resultado.mensaje);
          return;
        }

        // 2️⃣ Obtener el UID del usuario creado
        const uid = resultado.uid;

        // 3️⃣ Crear documento en "preceptores" con el MISMO UID
        await setDoc(doc(db, "preceptores", uid), {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          activo: true,
          uid: uid,
          contrasenaTemp: contrasenaTemp  // Guardamos la contraseña temporal
        });

        setExito(`✅ Preceptor agregado correctamente. Contraseña temporal: ${contrasenaTemp}`);
        
        setNombre("");
        setApellido("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error en el proceso:", error);
      setError("❌ Ocurrió un error al procesar la solicitud");
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <h1>Alta de Preceptor</h1>

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

        <button type="submit" className="btn-registrar">
          Agregar Preceptor
        </button>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        <div className="volver-panel">
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </form>
    </div>
  );
};

export default AltaPreceptor;

// ======================================================
// 🎯 VENTAJAS DE ESTA VERSIÓN:
//
// 1. ✅ Usa el hook mejorado con UID
// 2. ✅ Crea cuenta de Auth automáticamente
// 3. ✅ Relaciona usuarios y preceptores por UID
// 4. ✅ No necesita que el admin ingrese contraseña
// 5. ✅ Genera contraseña temporal automática
// 6. ✅ Muestra la contraseña al admin para comunicarla
// 7. ✅ El preceptor puede cambiarla en su primer login
//
// ESTRUCTURA RESULTANTE:
// usuarios/uid123/        ← Mismo UID
// preceptores/uid123/     ← Mismo UID
//
// ======================================================