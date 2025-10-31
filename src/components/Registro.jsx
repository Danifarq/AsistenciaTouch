import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonRedirigir from "../components/BotonRedirigir";
import { crearUsuario } from "../hooks/useUsuarios";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("profesor"); // Selector de rol
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
      // Crear usuario en Firebase Auth
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
        console.log("Usuario creado:", email);

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
      <h1>Crear una cuenta</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Seleccioná tu rol:</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="profesor">Profesor</option>
            <option value="preceptor">Preceptor</option>
          </select>
        </div>

        {rol === "profesor" && (
          <>
            <h3>Materias y cursos que enseña</h3>
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

            <button type="button" onClick={agregarMateria} className="btn-agregar">
              Agregar otra materia
            </button>
          </>
        )}

        <button type="submit" className="btn-registrar">
          Registrarse
        </button>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}
      </form>

      <BotonRedirigir textoBoton="¿Ya tenés cuenta? Iniciar Sesión" ruta="/" />
    </div>
  );
};

export default Registro;
