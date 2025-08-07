import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Approute from './pages/routes/Approute';

const App = () => {
  return (
     <Router>
      <Approute />
    </Router>
  );
}
export default App;
