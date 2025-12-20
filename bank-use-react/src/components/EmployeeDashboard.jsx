import React from 'react';
import './dashbord.css';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <Link to="/" className="text-sm text-gray-300 hover:underline">Back to Home</Link>
      </header>

      <div className="dashboard-grid">
        <Link to="/create-account" className="card">Create New Account</Link>
        <Link to="/search-account" className="card">Search Account</Link>
        <Link to="/transfer-money" className="card">Transfer Money</Link>
        <Link to="/view-transactions" className="card">View Transactions</Link>
        <Link to="/branches" className="card">Branch Info</Link>
        <Link to="/customer-search" className="card">Search Customer</Link>
      </div>
    </div>
  );
}
