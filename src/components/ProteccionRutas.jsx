
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProteccionRutas = ({ children, roleRequired }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    // Si no está logueado, redirige al login
    return <Navigate to="/login" />;
  }

  // Verifica el rol si es necesario
  if (roleRequired && userRole !== roleRequired) {
    // Si el rol no coincide, redirige a una página de inicio o muestra un mensaje de error
    return <Navigate to="/inicio" />;
  }

  return children;
};
export default ProteccionRutas;
