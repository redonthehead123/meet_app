import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import * as atatus from 'atatus-spa';
atatus.config('fdf34e13bf7c4de4bca365b88b466f46').install();
atatus.notify(new Error('Test Atatus Setup'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)