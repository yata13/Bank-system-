import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashbord.css';

export default function CreateAccount() {
  const [customers, setCustomers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: '',
    branch_id: '',
    type_id: '',
    account_number: '',
    balance: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    generateAccountNumber();
  }, []);

  const loadData = async () => {
    try {
      const [customersRes, branchesRes, typesRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/branches'),
        fetch('/api/account-types')
      ]);

      const [customersData, branchesData, typesData] = await Promise.all([
        customersRes.json(),
        branchesRes.json(),
        typesRes.json()
      ]);

      setCustomers(customersData);
      setBranches(branchesData);
      setAccountTypes(typesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generateAccountNumber = () => {
    const accountNumber = Math.floor(10000000 + Math.random() * 90000000);
    setFormData(prev => ({ ...prev, account_number: accountNumber.toString() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          opened: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
        setFormData({
          customer_id: '',
          branch_id: '',
          type_id: '',
          account_number: '',
          balance: '',
          status: 'active'
        });
        generateAccountNumber();
      } else {
        alert(data.message || 'Error creating account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="dashboard-header">
        <h1>Create New Account</h1>
        <Link to="/EmployeeDashboard">Back to Dashboard</Link>
      </header>

      <div className="p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="card p-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Customer</label>
            <select
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              required
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.customer_id} value={customer.customer_id}>
                  {customer.first_name} {customer.last_name} - {customer.email}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Branch</label>
            <select
              name="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              required
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name} - {branch.city}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Account Type</label>
            <select
              name="type_id"
              value={formData.type_id}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              required
            >
              <option value="">Select Account Type</option>
              {accountTypes.map(type => (
                <option key={type.type_id} value={type.type_id}>
                  {type.type_name} - Min Balance: ${type.minimum_balance}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Account Number</label>
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Initial Balance</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="Enter initial balance"
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#ff5e3a] text-white rounded hover:bg-[#e54e2e] disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}