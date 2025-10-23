import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfesores } from "../hooks/useProfesores";

const AltaProfesor = () => {
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { agregarProfesor } = useProfesores();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !materia.trim() || !email.trim()) {
      setMensaje("Completa todos los campos");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMensaje("Ingresá un correo válido");
      return;
    }

    try {
      const id = await agregarProfesor({ nombre, materia, email });
      setMensaje("Profesor agregado");
      // Limpiar formulario
      setNombre(""); setMateria(""); setEmail("");
      // Redirigir al detalle del profesor recién agregado
      navigate(`/profesor/${id}`);
    } catch {
      setMensaje(" Error al guardar profesor");
    }
  };

  return (
    <div className="p-4">
      <h2>Alta de Profesor</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input type="text" placeholder="Materia" value={materia} onChange={e => setMateria(e.target.value)} />
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AltaProfesor;
