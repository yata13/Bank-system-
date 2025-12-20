import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashbord.css';

export default function BranchInfo() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const response = await fetch('/api/branches');
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error loading branches:', error);
      alert('Error loading branches');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="dashboard-header">
        <h1>Branch Information</h1>
        <Link to="/EmployeeDashboard">Back to Dashboard</Link>
      </header>

      <div className="p-8">
        {loading ? (
          <p>Loading branches...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {branches.map(branch => (
              <div key={branch.branch_id} className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-[#ff5e3a]">
                  {branch.branch_name}
                </h3>
                <div className="space-y-2">
                  <p><strong>Address:</strong> {branch.address}</p>
                  <p><strong>City:</strong> {branch.city}</p>
                  <p><strong>State:</strong> {branch.state}</p>
                  <p><strong>ZIP Code:</strong> {branch.zip_code}</p>
                  <p><strong>Phone:</strong> {branch.phone}</p>
                  <p><strong>Created:</strong> {new Date(branch.created).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {branches.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-8">No branches found</p>
        )}
      </div>
    </div>
  );
}