import express from 'express';
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
const PORT = 3000;

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to frontend folder
const frontendPath = path.join(__dirname, '..', 'frontend');

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(frontendPath));

// API Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/account-types', accountTypeRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/transfer', transferRouter);

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
