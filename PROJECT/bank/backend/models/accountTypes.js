import pool from '../database.js'

const TABLE_NAME = 'account_types';

export async function getAllAccountTypes() {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getAccountTypeById(id) {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE type_id = $1`, [id]);
  return rows[0];
}

export async function createAccountType(type_name, description, minimum_balance, interest_rate) {
  const { rows } = await pool.query(
    `INSERT INTO ${TABLE_NAME} (type_name, description, minimum_balance, interest_rate) VALUES ($1, $2, $3, $4) RETURNING type_id`,
    [type_name, description, minimum_balance, interest_rate]
  );
  return rows[0].type_id;
}

export async function updateAccountType(id, column, value) {
  const allowedColumns = ['type_name', 'description', 'minimum_balance', 'interest_rate'];
  if (!allowedColumns.includes(column)) {
    throw new Error(`Invalid column name: ${column}`);
  }
  const { rows } = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = $1 WHERE type_id = $2 RETURNING *`, [value, id]);
  return rows[0];
}

export async function deleteAccountType(id) {
  const { rowCount } = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE type_id = $1`, [id]);
  return rowCount;
}