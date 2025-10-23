import React from 'react';
import  { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Login from '../../components/Login.jsx';
import Inicio from "../../components/Inicio";
import Registro from "../../components/Registro";
import MenuPrincipal from '../../components/MenuPrincipal';
import AltaProfesor from '../../components/AltaProfesor';
import ProteccionRutas from "../../components/ProteccionRutas.jsx";
import ListaProfesores from "../../components/ListaProfesores";
import DetalleProfesor from "../../components/DetalleProfesor";

const Approute = () => {
 return (
 <Routes>
     {/* Rutas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      //* Rutas protegidas que requieren un usuario logueado

      <Route path="/inicio" element={<ProteccionRutas><Inicio /></ProteccionRutas>} />
      <Route path="/menuprincipal" element={<ProteccionRutas><MenuPrincipal /></ProteccionRutas>} />
      <Route path="/profesores"element={<RutaProtegida><ListaProfesores /> </RutaProtegida>}/>
      <Route path="/profesor/:id"element={<RutaProtegida><DetalleProfesor /></RutaProtegida>}/>
      //*Ejemplo de rutas protegidas por roles
      <Route path="/alta-profesor" element={<ProteccionRutas roleRequired="profesor"><AltaProfesor /></ProteccionRutas>} />
      //* En caso de que se intente acceder a una ruta inexistente, redirigir al inicio
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
};

export default Approute;