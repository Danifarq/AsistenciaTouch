
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase.jsx';
import BotonRedirigir from '../components/BotonRedirigir';
import '../index.css';

const Inicio = () => {
  const navigate = useNavigate();

  // Función para el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Usuario autenticado con Google:', user);
      localStorage.setItem('usuario', JSON.stringify({
        correo: user.email,
        nombre: user.displayName,
        uid: user.uid,
      }));
      navigate('/MenuPrincipal');
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      alert('No se pudo iniciar sesión con Google.');
    }
  };

  return (
    <div className="menu-wrapper">
      <div>
        <h1>¡Bienvenido!</h1>
        <p>Inicia sesión para continuar</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleGoogleLogin}>
            Inicia sesión con Google 
          </button>
        </div>

        <BotonRedirigir 
          textoBoton="¿No tenés cuenta? Regístrate" 
          ruta="/registro" 
        />
      </div>
    </div>
  );
};

export default Inicio;