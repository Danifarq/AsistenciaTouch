// Login.jsx
/**
 * Componente de login.
 * Funcionalidades:
 * - Login con correo y contraseña.
 * - Login con Google.
 * - Mensajes dinámicos de error y éxito.
 * - Guarda información de usuario en localStorage.
 *
 * Navegación:
 * - Redirige a MenuPrincipal al iniciar sesión correctamente.
 * - Botón para registrarse si no tiene cuenta.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase.jsx';
import BotonRedirigir from '../components/BotonRedirigir';
import '../css/Login.css';




const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const credencialesUsuario = await signInWithEmailAndPassword(auth, email, contrasenia);
      const usuario = {
        correo: credencialesUsuario.user.email,
        nombre: credencialesUsuario.user.displayName || '',
        uid: credencialesUsuario.user.uid,
      };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setExito('Inicio de sesión correcto');
      setTimeout(() => setExito(''), 2000);
      navigate('/MenuPrincipal');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      if (err.code === 'auth/user-not-found') setError('Usuario no encontrado.');
      else if (err.code === 'auth/wrong-password') setError('Contraseña incorrecta.');
      else setError('No se pudo iniciar sesión.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          correo: user.email,
          nombre: user.displayName,
          uid: user.uid,
        })
      );
      setExito('Inicio de sesión con Google correcto');
      setTimeout(() => setExito(''), 2000);
      navigate('/MenuPrincipal');
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      setError('No se pudo iniciar sesión con Google.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="google-logo"
            />
          </button>
        </form>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        <p className="registrate">
          ¿No tenés cuenta? <BotonRedirigir textoBoton="Regístrate" ruta="/Registro" />
        </p>
      </div>
    </div>
  );
};

export default Login;