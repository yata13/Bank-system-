import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashbord.css';

export default function AccountSearch() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const customer = localStorage.getItem('selectedCustomer');
    if (customer) {
      setSelectedCustomer(JSON.parse(customer));
    }
  }, []);

  const loadAccounts = async () => {
    if (!selectedCustomer) {
      alert('Please select a customer first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/accounts/customer/${selectedCustomer.customer_id}`);
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error('Error loading accounts:', error);
      alert('Error loading accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCustomer) {
      loadAccounts();
    }
  }, [selectedCustomer]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="dashboard-header">
        <h1>Customer Accounts</h1>
        <Link to="/EmployeeDashboard">Back to Dashboard</Link>
      </header>

      <div className="p-8">
        {!selectedCustomer ? (
          <div className="text-center">
            <p className="mb-4">No customer selected</p>
            <Link to="/customer-search" className="px-6 py-3 bg-[#ff5e3a] text-white rounded hover:bg-[#e54e2e]">
              Search Customer
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-[#1f1f1f] rounded">
              <h3>Customer: {selectedCustomer.first_name} {selectedCustomer.last_name}</h3>
              <p>Email: {selectedCustomer.email}</p>
            </div>

            {loading ? (
              <p>Loading accounts...</p>
            ) : (
              <div className="grid gap-4">
                {accounts.map(account => (
                  <div key={account.account_id} className="card p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Account #{account.account_number}</h3>
                        <p className="text-gray-300">Type: {account.type_name}</p>
                        <p className="text-gray-300">Branch: {account.branch_name}</p>
                        <p className="text-gray-300">Status: {account.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          ${parseFloat(account.balance).toFixed(2)}
                        </p>
                        <p className="text-gray-400">Balance</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {accounts.length === 0 && !loading && (
              <p className="text-center text-gray-400 mt-8">No accounts found for this customer</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}