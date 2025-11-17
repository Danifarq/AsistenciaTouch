import React, { useState, useEffect } from "react";
import { crearMateria, activarMateria, obtenerMaterias } from "../hooks/useMaterias";
import BotonRedirigir from '../components/BotonRedirigir';
import '../css/AltaMateria.css';

const AltaMateria = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const cargarMaterias = async () => {
      const listaMaterias = await obtenerMaterias();
      setMaterias(listaMaterias);
    };
    cargarMaterias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim()) {
      setMensaje("⚠️ Por favor ingresa un nombre de materia.");
      return;
    }

    try {
      const materiaExistente = materias.find(
        (mat) => mat.nombre.toLowerCase() === nombre.trim().toLowerCase()
      );

      if (materiaExistente) {
        if (!materiaExistente.activa) {
          await activarMateria(materiaExistente.id);
          setMensaje("✅ La materia ya existía y ha sido activada nuevamente");
          
          const listaActualizada = await obtenerMaterias();
          setMaterias(listaActualizada);
          
          setNombre("");
        } else {
          setMensaje("⚠️ Esta materia ya existe y está activa");
        }
      } else {
        await crearMateria(nombre.trim());
        setMensaje("✅ Materia creada correctamente");
        
        const listaActualizada = await obtenerMaterias();
        setMaterias(listaActualizada);
        
        setNombre("");
      }
    } catch (error) {
      console.error("Error en el proceso:", error);
      setMensaje("❌ Ocurrió un error al procesar la solicitud");
    }
  };

  return (
    <div className="alta-materia-page">
      <div className="alta-materia-box">
        <h1 className="alta-materia-title">Alta de Materia</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la materia"
            className="alta-materia-input"
          />
          <button type="submit" className="alta-materia-btn">
            Crear Materia
          </button>
        </form>

        {mensaje && (
          <p className={
            mensaje.includes("✅") 
              ? "mensaje-exito" 
              : "mensaje-error"
          }>
            {mensaje}
          </p>
        )}

        <div style={{ marginTop: 15 }}>
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default AltaMateria;