import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import EmployeeLogin from './components/Employeelogin.jsx';
import EmployeeDashboard from './components/EmployeeDashboard.jsx';


// import EmployeeDashboard from './components/EmployeeDashboard.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} /> 
      </Routes>
    </Router>
  </StrictMode>
);
