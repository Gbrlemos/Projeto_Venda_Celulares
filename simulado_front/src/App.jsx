import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Estandes from './pages/Estandes';
import ListaCelulares from './pages/ListaCelulares';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/estandes" element={<Estandes />} />
        <Route path="/listacelulares" element={<ListaCelulares />} />
      </Routes>
    </Router>
  )
}

export default App