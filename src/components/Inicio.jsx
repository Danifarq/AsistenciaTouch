import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
    const navigate = useNavigate();
    const[dni,setDni]=useState("");
    const[contraseña,setContraseña]=useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`DNI: ${dni}, Registro: ${contraseña} no encontrados`);
           };
             return (
    <div>
      <h1>Página de Inicio</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>

      <button onClick={() => navigate('/registro')}>
        Ir a Registro
      </button>
    </div>
  );
  
}
export default Inicio;