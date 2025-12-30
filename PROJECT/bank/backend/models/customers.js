import pool from '../database.js'

const TABLE_NAME = 'customers';

export async function getAllCustomers() {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getCustomerById(id) {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE customer_id = $1`, [id]);
  return rows[0];
}

export async function createCustomer(first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN) {
  const { rows } = await pool.query(
    `INSERT INTO ${TABLE_NAME} (first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING customer_id`,
    [first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN]
  );
  return rows[0].customer_id;
}

export async function updateCustomer(id, column, value) {
  const allowedColumns = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'zip_code', 'DOB', 'SSN'];
  if (!allowedColumns.includes(column)) {
    throw new Error(`Invalid column name: ${column}`);
  }
  const { rows } = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = $1 WHERE customer_id = $2 RETURNING *`, [value, id]);
  return rows[0];
}

export async function deleteCustomer(id) {
  const { rowCount } = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE customer_id = $1`, [id]);
  return rowCount;
}