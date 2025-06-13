import './index.css'; 
import Inicio from './Inicio';
import Registro from './Registro';

function App() {
  return (
    <div className="container">
      <h1>BIENVENIDO</h1>

      <div className="form-row">
        <label htmlFor="dni">INGRESE DNI:</label>
        <input type="text" id="dni"/>
      </div>

      <div className="form-row">
        <label htmlFor="password">CONTRASEÑA:</label>
        <input type="password" id="password" />
      </div>

      <button>ENVIAR</button>
    </div>
  );
}


export default App;
