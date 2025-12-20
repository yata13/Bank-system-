import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLogin() {
  const [employeeId, setEmployeeId] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/employees/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: employeeId, first_name: firstName })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('employee', JSON.stringify(data.employee));
        navigate('/EmployeeDashboard'); // ✅ redirect
      } else {
        alert(data.message || 'Login failed');
      }

    } catch (err) {
      alert('Network error');
      console.error(err);
    }
  };



  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Employee Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="employee-id" style={styles.label}>Employee ID</label>
          <input
            type="text"
            id="employee-id"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter your ID"
            required
            style={styles.input}
          />

          <label htmlFor="first-name" style={styles.label}>First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your First Name"
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Login</button>
          <p style={styles.note}>Only authorized employees can access this portal.</p>
        </form>
      </div>
    </div>
  );
}

// 🎨 Inline styles (you can use CSS or Tailwind instead)
const styles = {
  body: {
    backgroundColor: '#f4f7fa',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: 0
  },
  container: {
    backgroundColor: 'white',
    padding: '2rem 3rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#0a2e5c'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#0a2e5c',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  note: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666'
  }
};
