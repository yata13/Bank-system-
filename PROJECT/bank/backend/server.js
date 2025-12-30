import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import accountRoutes from './routes/accounts.js';
import branchRoutes from './routes/branches.js';
import employeeRoutes from './routes/employees.js';
import customerRoutes from './routes/customers.js';
import accountTypeRoutes from './routes/accountType.js';
import transactionRoutes from './routes/transactions.js';
import transferRouter from './routes/transfer.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/account-types', accountTypeRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/transfer', transferRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
