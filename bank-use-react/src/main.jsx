import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import EmployeeLogin from './components/EmployeeLogin.jsx';
import EmployeeDashboard from './components/EmployeeDashboard.jsx';
import CustomerSearch from './components/CustomerSearch.jsx';
import AccountSearch from './components/AccountSearch.jsx';
import TransferMoney from './components/TransferMoney.jsx';
import ViewTransactions from './components/ViewTransactions.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import BranchInfo from './components/BranchInfo.jsx';


// import EmployeeDashboard from './components/EmployeeDashboard.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/customer-search" element={<CustomerSearch />} />
        <Route path="/search-account" element={<AccountSearch />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
        <Route path="/view-transactions" element={<ViewTransactions />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/branches" element={<BranchInfo />} />
      </Routes>
    </Router>
  </StrictMode>
);
