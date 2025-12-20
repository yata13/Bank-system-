import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  loginEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../models/employees.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getAllEmployees();
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch employees");
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  try {
    const result = await getEmployeeById(id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch employee by ID");
  }
});

router.post('/', async (req, res) => {
  const { branch_id, first_name, last_name, position, email, phone, hire_date, salary } = req.body;
  try {
    const newId = await createEmployee(branch_id, first_name, last_name, position, email, phone, hire_date, salary);
    res.status(201).json({ message: "Employee created", employee_id: newId });
  } catch (err) {
    res.status(500).send("Failed to create employee");
  }
});

router.post('/login', async (req, res) => {
  const { employee_id, first_name } = req.body;

  if (!employee_id || !first_name) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const employee = await loginEmployee(employee_id, first_name);

    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { column, value } = req.body;
  try {
    const result = await updateEmployee(id, column, value);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to update employee");
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteEmployee(id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).send("Failed to delete employee");
  }
});

export default router;

