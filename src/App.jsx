import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import Employers from './pages/employers';
import Impressoras from './pages/printers';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Employers />} />
            <Route path="/impressoras" element={<Impressoras />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
