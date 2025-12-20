import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashbord.css';

export default function TransferMoney() {
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllAccounts();
  }, []);

  const loadAllAccounts = async () => {
    try {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    
    if (!fromAccount || !toAccount || !amount) {
      alert('Please fill all fields');
      return;
    }

    if (fromAccount === toAccount) {
      alert('Cannot transfer to the same account');
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_account_id: parseInt(fromAccount),
          to_account_id: parseInt(toAccount),
          transfer_amount: parseFloat(amount)
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Transfer successful!');
        setFromAccount('');
        setToAccount('');
        setAmount('');
        loadAllAccounts(); // Refresh account balances
      } else {
        alert(data.error || 'Transfer failed');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Network error during transfer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="dashboard-header">
        <h1>Transfer Money</h1>
        <Link to="/EmployeeDashboard">Back to Dashboard</Link>
      </header>

      <div className="p-8 max-w-2xl mx-auto">
        <form onSubmit={handleTransfer} className="card p-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">From Account</label>
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              required
            >
              <option value="">Select source account</option>
              {accounts.map(account => (
                <option key={account.account_id} value={account.account_id}>
                  Account #{account.account_number} - Balance: ${parseFloat(account.balance).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">To Account</label>
            <select
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              required
            >
              <option value="">Select destination account</option>
              {accounts.map(account => (
                <option key={account.account_id} value={account.account_id}>
                  Account #{account.account_number} - Balance: ${parseFloat(account.balance).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to transfer"
              className="w-full p-3 rounded bg-[#1f1f1f] text-white border border-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#ff5e3a] text-white rounded hover:bg-[#e54e2e] disabled:opacity-50"
          >
            {loading ? 'Processing Transfer...' : 'Transfer Money'}
          </button>
        </form>
      </div>
    </div>
  );
}