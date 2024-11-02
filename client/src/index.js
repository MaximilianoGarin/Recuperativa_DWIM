import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/form.css';
import './styles/header.css';
import './styles/toast.css';
import './styles/responsive.css';
import App from './app';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

