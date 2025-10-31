import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase.jsx';
import BotonRedirigir from '../components/BotonRedirigir';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

    // Lógica de autenticación con correo y contraseña
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

    // Lógica de autenticación con Google
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Usuario autenticado con Google:", user);
            localStorage.setItem('usuario', JSON.stringify({
                correo: user.email,
                nombre: user.displayName,
                uid: user.uid,
            }));
            setExito("Inicio de sesión con Google correcto");
            setTimeout(() => setExito(""), 2000);
            navigate('/MenuPrincipal');
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            setError("No se pudo iniciar sesión con Google.");
        }
    };

    return (
        <div className="menu-wrapper">
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

                <div >
                
                    <button onClick={handleGoogleLogin}>
                        Inicia sesión con Google 
                    </button>
                </div>
                <div >
                 <BotonRedirigir 
                    textoBoton="¿No tenés cuenta? Regístrate" 
                    ruta="/Registro" 
                /></div>
            </div>
        </div>
    );
};

export default Login;