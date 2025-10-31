// Registro.jsx
/**
 * 📘 Componente: Registro
 *
 * Descripción:
 * Pantalla de **registro de nuevos usuarios** del sistema.
 * Permite crear cuentas de tipo:
 * - Profesor
 * - Preceptor
 *
 * Funcionalidades:
 * - Crea usuario en Firebase Authentication (con `crearUsuario`).
 * - Guarda los datos del usuario en Firestore según su rol:
 *   → En "profesores" si es profesor.
 *   → En "preceptores" si es preceptor.
 * - Muestra mensajes de error o éxito.
 *
 * Estado interno:
 * - nombre, apellido, email, contrasenia: datos del usuario.
 * - rol: tipo de usuario.
 * - materias: array de objetos { materia, curso } (solo si el rol es profesor).
 * - error, exito: feedback visual.
 *
 * Flujo general:
 * 1️⃣ El usuario completa el formulario.
 * 2️⃣ Se valida y se envía la información.
 * 3️⃣ Se crea la cuenta en Firebase y se agrega a Firestore.
 * 4️⃣ Se redirige a la página principal tras registrarse.
 *
 * Hooks usados:
 * - useNavigate: para redirigir después del registro.
 * - useState: para manejar el estado de los campos del formulario.
 *
 * Notas para desarrolladores:
 * - Este componente usa el hook `crearUsuario` (definido en `useUsuarios.js`).
 * - Si se agrega un nuevo rol (por ejemplo, "admin"), se debe extender la lógica del `handleSubmit`.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from "../components/BotonRedirigir";
import { crearUsuario } from "../hooks/useUsuarios";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "../css/Registro.css"; // Asegurate de importar el CSS

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("profesor");
  const [materias, setMaterias] = useState([{ materia: "", curso: "" }]);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const agregarMateria = () => {
    setMaterias([...materias, { materia: "", curso: "" }]);
  };

  const handleMateriaChange = (index, campo, valor) => {
    const nuevasMaterias = [...materias];
    nuevasMaterias[index][campo] = valor;
    setMaterias(nuevasMaterias);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    try {
      const resultado = await crearUsuario({
        usuario: email,
        contrasena: contrasenia,
        rol,
        nombre,
        apellido,
        materias: rol === "profesor" ? materias : [],
      });

      if (resultado) {
        if (rol === "profesor") {
          await addDoc(collection(db, "profesores"), {
            nombre,
            apellido,
            email,
            materias,
            rol,
          });
        } else if (rol === "preceptor") {
          await addDoc(collection(db, "preceptores"), {
            nombre,
            apellido,
            email,
            rol,
          });
        }

        setExito("Usuario creado correctamente");

        setTimeout(() => {
          setExito("");
          navigate("/");
        }, 2000);
      } else {
        setError("No se pudo registrar correctamente");
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado. Por favor, iniciá sesión.");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña es muy débil. Mínimo 6 caracteres.");
      } else if (err.code === "auth/invalid-email") {
        setError("El correo es inválido.");
      } else {
        setError("No se pudo registrar correctamente.");
      }
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <h1>Crear una cuenta</h1>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        />

        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="profesor">Profesor</option>
          <option value="preceptor">Preceptor</option>
        </select>

        {rol === "profesor" && (
          <>
            <h3>Materias y cursos</h3>
            {materias.map((item, index) => (
              <div key={index} className="materia-curso">
                <input
                  type="text"
                  placeholder="Materia"
                  value={item.materia}
                  onChange={(e) =>
                    handleMateriaChange(index, "materia", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Curso (ej: 3°1, 4°2)"
                  value={item.curso}
                  onChange={(e) =>
                    handleMateriaChange(index, "curso", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button type="button" className="btn-agregar" onClick={agregarMateria}>
              Agregar otra materia
            </button>
          </>
        )}

        <button type="submit" className="btn-registrar">
          Registrarse
        </button>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        <BotonRedirigir textoBoton="¿Ya tenés cuenta? Iniciar Sesión" ruta="/" />
      </form>
    </div>
  );
};

export default Registro;
