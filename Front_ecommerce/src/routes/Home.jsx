import React from 'react';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="container">
      <h1>Bem vindo</h1>
      <div className="buttons-container">
        <Link to="/pedidos">
          <button className="action-button">Quero comprar</button>
        </Link>
        <Link to="/produtos">
          <button className="action-button">Quero postar produto</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
