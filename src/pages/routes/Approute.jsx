import Inicio from "../../components/Inicio";
import Registro from "../../components/Registro";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





 const Approute = () => {
  return (
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
  );
}

export default Approute;