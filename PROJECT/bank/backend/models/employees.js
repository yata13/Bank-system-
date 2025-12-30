import pool from '../database.js'

const TABLE_NAME = 'employees';

export async function getAllEmployees() {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getEmployeeById(id) {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE employee_id = $1`, [id]);
  return rows[0];
}

export async function loginEmployee(employee_id, first_name) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM employees WHERE employee_id = $1 AND first_name = $2',
      [employee_id, first_name]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];

  } catch (error) {
    throw error;
  }
}

export async function createEmployee(branch_id, first_name, last_name, position, email, phone, hire_date, salary) {
  const { rows } = await pool.query(
    `INSERT INTO ${TABLE_NAME} (branch_id, first_name, last_name, position, email, phone, hire_date, salary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING employee_id`,
    [branch_id, first_name, last_name, position, email, phone, hire_date, salary]
  );
  return rows[0].employee_id;
}

export async function updateEmployee(id, column, value) {
  const allowedColumns = ['branch_id', 'first_name', 'last_name', 'position', 'email', 'phone', 'hire_date', 'salary'];
  if (!allowedColumns.includes(column)) {
    throw new Error(`Invalid column name: ${column}`);
  }
  const { rows } = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = $1 WHERE employee_id = $2 RETURNING *`, [value, id]);
  return rows[0];
}

export async function deleteEmployee(id) {
  const { rowCount } = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE employee_id = $1`, [id]);
  return rowCount;
}