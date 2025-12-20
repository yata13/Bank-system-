import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './dashbord.css';

export default function CustomerSearch() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const searchCustomers = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      
      const filtered = data.filter(customer => 
        customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setCustomers(filtered);
    } catch (error) {
      console.error('Error searching customers:', error);
      alert('Error searching customers');
    } finally {
      setLoading(false);
    }
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    localStorage.setItem('selectedCustomer', JSON.stringify(customer));
    alert(`Customer ${customer.first_name} ${customer.last_name} selected and stored in localStorage`);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="dashboard-header">
        <h1>Search Customer</h1>
        <Link to="/EmployeeDashboard">Back to Dashboard</Link>
      </header>

      <div className="p-8">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="flex-1 p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              onKeyPress={(e) => e.key === 'Enter' && searchCustomers()}
            />
            <button
              onClick={searchCustomers}
              disabled={loading}
              className="px-6 py-3 bg-[#ff5e3a] text-white rounded hover:bg-[#e54e2e] disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {selectedCustomer && (
          <div className="mb-6 p-4 bg-green-800 rounded">
            <h3>Selected Customer: {selectedCustomer.first_name} {selectedCustomer.last_name}</h3>
            <p>Email: {selectedCustomer.email}</p>
          </div>
        )}

        <div className="grid gap-4">
          {customers.map(customer => (
            <div key={customer.customer_id} className="card p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {customer.first_name} {customer.last_name}
                </h3>
                <p className="text-gray-300">Email: {customer.email}</p>
                <p className="text-gray-300">Phone: {customer.phone}</p>
                <p className="text-gray-300">Address: {customer.address}, {customer.city}</p>
              </div>
              <button
                onClick={() => selectCustomer(customer)}
                className="px-4 py-2 bg-[#ff5e3a] text-white rounded hover:bg-[#e54e2e]"
              >
                Select
              </button>
            </div>
          ))}
        </div>

        {customers.length === 0 && searchTerm && !loading && (
          <p className="text-center text-gray-400 mt-8">No customers found</p>
        )}
      </div>
    </div>
  );
}