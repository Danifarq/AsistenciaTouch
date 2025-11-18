import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { usePreceptores } from "../hooks/usePreceptores";   
import '../css/BajaPreceptor.css';
import BotonRedirigir from "../components/BotonRedirigir";

const BajaPreceptor = () => {
  // ✅ El hook debe ir ADENTRO del componente
  const { desactivarPreceptor } = usePreceptores();

  const [preceptores, setPreceptores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchPreceptores = async () => {
      try {
        const q = query(collection(db, "usuarios"), where("rol", "==", "preceptor"));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPreceptores(lista);
        setLoading(false);
      } catch (err) {
        console.error("Error obteniendo preceptores:", err);
        setError("Ocurrió un error al cargar los preceptores.");
        setLoading(false);
      }
    };
    fetchPreceptores();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este preceptor?");
    if (!confirmar) return;

    try {
      await desactivarPreceptor(id); 
      setMensaje("Preceptor eliminado correctamente ✅");
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al eliminar el preceptor.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando preceptores...</p>;
  }

  return (
    <div className="alta-profesor-container">
      <form className="form-container">
        <h1>Baja de Preceptor</h1>

        {error && <p className="mensaje-error">{error}</p>}
        {mensaje && <p className="mensaje-exito">{mensaje}</p>}

        {preceptores.length === 0 ? (
          <p>No hay preceptores registrados.</p>
        ) : (
          <ul className="user-list">
            {preceptores.map((p) => (
              <li key={p.id} className="user-item">
                {p.nombre} {p.apellido} ({p.email})
                <button
                  type="button"
                  className="btn-rojo"
                  onClick={() => handleEliminar(p.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="volver-panel">
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </form>
    </div>
  );
};

export default BajaPreceptor;
