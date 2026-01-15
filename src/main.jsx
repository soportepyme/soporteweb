
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext'; // Importamos el AuthProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>  {/* Envolvemos la App con el AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
