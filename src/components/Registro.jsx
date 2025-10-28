import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BotonRedirigir from "../components/BotonRedirigir";
import { crearUsuario } from '../hooks/useUsuarios';

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    try {
      const resultado = await crearUsuario({
        usuario: email,
        contrasena: contrasenia,
        rol: 'usuario',
        nombre,
        apellido,
      });

      if (resultado) {
        setExito("Usuario creado correctamente");
        setTimeout(() => {
          setExito("");
          navigate('/');
        }, 2000);
      } else {
        setError("No se pudo registrar correctamente");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado. Por favor inicia sesión");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña es muy débil. Mínimo 6 caracteres por favor");
      } else if (err.code === "auth/invalid-email") {
        setError("El correo es inválido");
      } else {
        setError("No se pudo registrar correctamente");
      }
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-wrapper"> {/* Cuadrado blanco */}
        <div>
          <h1>Crear una cuenta</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Apellido:</label>
              <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Correo electrónico:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Contraseña:</label>
              <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
            </div>

            {/* ✅ NUEVA SECCIÓN VISUAL */}
            <h2 className="subtitulo-materias">Materias y cursos que enseña:</h2>
            <div className="materia-curso-container">
              <input type="text" placeholder="Materia" className="materia-input" />
              <input type="text" placeholder="Curso" className="curso-input" />
            </div>

            <div className="botones-materias">
              <button type="button">Agregar otra materia</button>
            </div>
            {/* ✅ FIN NUEVA SECCIÓN */}

            <button type="submit">Registrarse</button>

            {error && <p className="mensaje-error">{error}</p>}
            {exito && <p className="mensaje-exito">{exito}</p>}
          </form>

          <BotonRedirigir textoBoton="¿Ya tenés cuenta? Iniciar Sesión" ruta="/" />
        </div>
      </div>
    </div>
  );
};

export default Registro;
