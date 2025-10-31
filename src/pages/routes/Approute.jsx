import React from 'react';
import  { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Login from '../../components/Login.jsx';
import Inicio from "../../components/Inicio";
import Registro from "../../components/Registro";
import MenuPrincipal from '../../components/MenuPrincipal';
import AltaProfesor from '../../components/AltaProfesor';
import BajaProfesor from '../../components/BajaProfesor.jsx'
import ProteccionRutas from "../../components/ProteccionRutas.jsx";
import ListaProfesores from "../../components/ListaProfesores";
import DetalleProfesor from "../../components/DetalleProfesor";
import AltaMateria from '../../components/AltaMateria.jsx';
import BajaMateria from '../../components/BajaMateria.jsx';
import AltaCurso from '../../components/AltaCurso.jsx';
import BajaCurso from '../../components/BajaCurso.jsx';
import AltaPreceptor from '../../components/AltaPreceptor.jsx';
import BajaPreceptor from '../../components/BajaPreceptor.jsx';
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
      <Route path="/profesores"element={<ProteccionRutas><ListaProfesores /> </ProteccionRutas>}/>
      <Route path="/profesor/:id"element={<ProteccionRutas><DetalleProfesor /></ProteccionRutas>}/>
      
      //*Ejemplo de rutas protegidas por roles
      <Route path="/alta-profesor" element={<ProteccionRutas roleRequired="admin"><AltaProfesor /></ProteccionRutas>} />
      <Route path="/baja-profesor" element={<ProteccionRutas roleRequired="admin"><BajaProfesor /></ProteccionRutas>} />
      <Route path="/alta-materia" element={<ProteccionRutas roleRequired="admin"><AltaMateria /></ProteccionRutas>} />
      <Route path="/baja-materia" element={<ProteccionRutas roleRequired="admin"><BajaMateria /></ProteccionRutas>} />
      <Route path="/alta-curso" element={<ProteccionRutas roleRequired="admin"><AltaCurso /></ProteccionRutas>} />
      <Route path="/baja-curso" element={<ProteccionRutas roleRequired="admin"><BajaCurso /></ProteccionRutas>} />
      <Route path="/alta-preceptor" element={<ProteccionRutas roleRequired="admin"><AltaPreceptor/></ProteccionRutas>} />
      <Route path="/baja-preceptor" element={<ProteccionRutas roleRequired="admin"><BajaPreceptor/></ProteccionRutas>} />
      
      //* En caso de que se intente acceder a una ruta inexistente, redirigir al inicio
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
};

export default Approute;