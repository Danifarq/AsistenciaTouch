import React, {useState} from 'react';

const Registro = () => {
    const[nombre,setNombre] = useState("");
    const[apellido,setApellido] = useState("");
    const[dni,setDni] = useState(""); 
    const[contraseña,setContraseña]=useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert(`Nombre: ${nombre}, Apellido: ${apellido}, DNI: ${dni}, contraseña: ${contraseña} sin rellenar`);
        console.log("Nombre:",nombre);
        console.log("Apellido:",apellido);
        console.log("Dni:",dni);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                    />
            </div>
            <div>
                <label>apellido:</label>
                <input 
                    type="text"
                    value={apellido}
                    onChange={(e)=> setApellido(e.target.value)}
                    />
            </div>
            <div>
                <label>dni:</label>
                <input 
                    type="text"
                    value={dni}
                    onChange={(e)=> setDni(e.target.value)}
                    />
            </div>
            <div>
                <label>contraseña</label>
                <input
                type='password'
                value={contraseña}
                onChange={(e)=> setContraseña(e.target.value)}/>
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}
export default Registro;