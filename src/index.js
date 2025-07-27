import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root once
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your full App (which includes AppLayout, Routes, etc.)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance measuring
reportWebVitals();
