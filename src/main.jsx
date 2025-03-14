import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Asegúrate de que el nombre del archivo esté correcto
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

const container = document.getElementById('root'); // Debe coincidir con el id en index.html
if (!container) {
  throw new Error('Target container is not a DOM element.'); // Para detectar fácilmente si el contenedor no existe
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);