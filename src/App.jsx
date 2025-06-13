import React from 'react';
import './index.css'; 
import Inicio from './Inicio';
import Registro from './Registro';

function App() {
  return (
    <div className="container">
      <h1>BIENVENIDO</h1>
      <label htmlFor="dni">INGRESE DNI:</label>
      <input type="text" id="dni" placeholder="123456789" />
      </div>
  )
}


export default App;
