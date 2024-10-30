import React from 'react';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Venta de tickets</h1>
        <LoginForm />
      </header>
    </div>
  );
}

export default App;