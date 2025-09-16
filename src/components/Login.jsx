
import React, { useState } from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase/firebase.jsx'; 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

     // Login por email
    const handleSubmit = (e)=>{
        e.preventDefault();
        alert(`Username: ${username}, Password: ${password}`);
        console.log("Username:", username);
        console.log("Password:", password);
    };
  // Manejador para el login con Google
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Usuario autenticado con Google:", user);
            alert(`¡Bienvenido, ${user.displayName}!`);
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            alert(`Error al iniciar sesión: ${error.message}`);
        }
    };

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e)=> setUsername(e.target.value)} 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)} 
                />
            </div>
            <button type="submit">Login</button>
            </form>
             <div>
                <button onClick={handleGoogleLogin}>
                    Inicia sesión con Google 
                </button>
            </div>
        </div>
    );
};

export default Login;