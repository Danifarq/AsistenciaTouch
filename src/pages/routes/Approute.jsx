import React, { useEffect } from 'react';
import  { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../../components/Login.jsx';
import Inicio from "../../components/Inicio";
import Registro from "../../components/Registro";
import MenuPrincipal from '../../components/MenuPrincipal';

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
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} /> 
        <Route path="/MenuPrincipal" element={<MenuPrincipal />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
  );
}

export default Approute;