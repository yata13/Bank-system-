import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashbord.css';

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
      alert('Error loading transactions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="dashboard-header">
        <h1>Transaction History</h1>
        <Link to="/EmployeeDashboard">Back to Dashboard</Link>
      </header>

      <div className="p-8">
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1f1f1f]">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Account ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.transaction_id} className="border-b border-gray-700 hover:bg-[#1f1f1f]">
                    <td className="p-4">{transaction.transaction_id}</td>
                    <td className="p-4">{transaction.account_id}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        transaction.transaction_type === 'deposit' ? 'bg-green-600' :
                        transaction.transaction_type === 'withdrawal' ? 'bg-red-600' :
                        'bg-blue-600'
                      }`}>
                        {transaction.transaction_type}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      ${parseFloat(transaction.amount).toFixed(2)}
                    </td>
                    <td className="p-4">{transaction.description}</td>
                    <td className="p-4">{formatDate(transaction.timestamps)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {transactions.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-8">No transactions found</p>
        )}
      </div>
    </div>
  );
}