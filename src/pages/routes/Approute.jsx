import Inicio from "../../components/Inicio";
import Registro from "../../components/Registro";
import MenuPrincipal from '../../components/MenuPrincipal';

import React, { useEffect } from 'react';
import  { Routes, Route, useNavigate } from 'react-router-dom';

const Approute = () => {
const navigate = useNavigate();

useEffect(() => {
const handlePopState = () => {
  navigate(window.location.pathname, { replace: true });
  };
window.addEventListener('popstate', handlePopState);
 return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);
  return (
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/MenuPrincipal" element={<MenuPrincipal />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
  );
}

export default Approute;