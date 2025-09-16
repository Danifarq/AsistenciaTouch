import React from 'react';
import  { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 
import Login from '../../components/Login.jsx';
import Inicio from "../../components/Inicio";
import Registro from "../../components/Registro";
import MenuPrincipal from '../../components/MenuPrincipal';
import AltaProfesor from '../../components/AltaProfesor';
// Componente para proteger rutas privadas
const PrivateRoute = ({ children, roleRequired }) => {
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

const Approute = () => {
 return (
 <Routes>
  
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      //* Rutas protegidas que requieren un usuario logueado
      <Route path="/inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
      <Route path="/menuprincipal" element={<PrivateRoute><MenuPrincipal /></PrivateRoute>} />
      
      //*Ejemplo de rutas protegidas por roles
      <Route path="/alta-profesor" element={<PrivateRoute roleRequired="profesor"><AltaProfesor /></PrivateRoute>} />
      //* En caso de que se intente acceder a una ruta inexistente, redirigir al inicio
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
};

export default Approute;