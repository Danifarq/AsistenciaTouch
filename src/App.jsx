import './index.css'; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Registro from './components/Registro';

const App = () => {
  return (
       <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}
export default App;
