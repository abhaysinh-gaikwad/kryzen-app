// src/main.jsx (or src/index.jsx)
import React from 'react';
import ReactDOM from 'react-dom'; // Correct import
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot for concurrent mode

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
