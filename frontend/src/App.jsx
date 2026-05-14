import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Import Dashboard

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '15px', background: '#333', color: 'white', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        </nav>

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Use Dashboard Component */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;