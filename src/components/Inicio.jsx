import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import BotonRedirigir from "../components/BotonRedirigir";
import '../index.css';

const Inicio = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit =  async  (e) => {
    e.preventDefault();
    setError("");
    try {
      const credencialesUsuario = await signInWithEmailAndPassword(auth, email, contrasenia);
      const usuario = {
        correo: credencialesUsuario.user.email,
        nombre: credencialesUsuario.user.displayName || "",
        uid: credencialesUsuario.user.uid,
      };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setExito("Inicio de sesión correcto");
      setTimeout(() => setExito(""), 2000);
      navigate('/MenuPrincipal');
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      if (err.code === "auth/user-not-found") setError("Usuario no encontrado.");
      else if (err.code === "auth/wrong-password") setError("Contraseña incorrecta.");
      else setError("No se pudo iniciar sesión.");
    }
  };

  return (
    <div className="menu-wrapper">   {/* recuadrito blanco */}
      <div>
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <br />
          <button type="submit">Iniciar sesión</button>
        </form>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        <BotonRedirigir   
          textoBoton="¿No tenés cuenta? Regístrate" 
          ruta="/registro" 
        />
      </div>
    </div>
  );
}

export default Inicio;
