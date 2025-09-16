import React, {useState} from 'react';
import { auth } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import BotonRedirigir from "../components/BotonRedirigir";
import { crearUsuario } from '../hooks/useUsuarios';
const Registro = (ghildren) => {
    const navigate = useNavigate();
    const[nombre,setNombre] = useState("");
    const[apellido,setApellido] = useState("");
    const[contrasenia,setContrasenia]=useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");
    const handleSubmit = async(e)=>{
        e.preventDefault();
            setError("");
            setExito("");
try{ 
 const resultado = await crearUsuario({
                usuario: email,
                contrasena: contrasenia,
                rol: 'usuario', 
                nombre: nombre,
                apellido: apellido,
            });

            if (resultado) {
                setExito("Usuario creado correctamente");
                console.log("usuario creado:", email); 
                setTimeout(() => {
                    setExito("");
                    navigate('/');
                }, 2000);
            } else {
                setError("No se pudo registrar correctamente");
            }
        } catch (err) {
            console.error("Error al registrar:", err);
        if (err.code === "auth/email-already-in-use") {
            setError("Este correo ya esta registrado. Por favor inicia sesion ");
             } else if (err.code === "auth/weak-password") {
              setError("La contraseña es muy debil. Minimo 6 caracteres por favor");
               } else if (err.code === "auth/invalid-email") {
                setError("El correo es invalido");
                } else {
    setError("No se pudo registrar correctamente");
    }
}
};
    return (
        <div>
        <h1>Crear una cuenta</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                    />
            </div>
            <div>
                <label>Apellido:</label>
                <input 
                    type="text"
                    value={apellido}
                    onChange={(e)=> setApellido(e.target.value)}
                    />
            </div>
            <div>
                <label>Correo electrónico:</label>
                <input
                    type="email"
                    value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Contraseña</label>
                <input
                type='password'
                value={contrasenia}
                onChange={(e)=> setContrasenia(e.target.value)}/>
            </div>
            <button type="submit">Registrarse</button>
            {error && <p className="mensaje-error">{error}</p>}
            {exito && <p className="mensaje-exito">{exito}</p>}

        </form>
        <BotonRedirigir 
        textoBoton="¿Ya tenés cuenta? Iniciar Sesión" 
        ruta="/" 
      />
      </div>
    );

};
export default Registro;