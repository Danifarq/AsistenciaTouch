import React, {useState} from "react";

const Inicio = () => {
    const[dni,setDni]=useState("");
    const[registro,setRegistro]=useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`DNI: ${dni}, Registro: ${registro} no encontrados`);
    };
}
export default Inicio;