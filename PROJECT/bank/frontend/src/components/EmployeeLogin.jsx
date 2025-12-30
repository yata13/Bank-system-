import React, { useState, props } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';

export default function EmployeeLogin() {
  const [employeeId, setEmployeeId] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/employees/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: employeeId, first_name: firstName })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('employee', JSON.stringify(data.employee));
        navigate('/EmployeeDashboard', { state: { name: data.employee.first_name } }); // ✅ redirect


      } else {
        alert(data.message || 'Login failed');
      }

    } catch (err) {
      alert('Network error');
      console.error(err);
    }
  };

  return (
    <div >
      <div className='border-div'>
        <h2> <span className='header-color'>Employee</span>   Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="employee-id" >Employee ID</label>
          <input
            type="text"
            id="employee-id"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter your ID"
            required

          />

          <label htmlFor="first-name" >First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your First Name"
            required

          />

          <button type="submit" >Login</button>
          <p >Only authorized employees can access this portal.</p>
        </form>
      </div>
    </div>
  );
}

