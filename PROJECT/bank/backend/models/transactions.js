import pool from '../database.js'

const TABLE_NAME = 'transactions';

export async function getAllTransactions() {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getTransactionById(id) {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE transaction_id = $1`, [id]);
  return rows[0];
}

export async function createTransaction(account_id, transaction_type, amount, description, timestamps) {
  const { rows } = await pool.query(
    `INSERT INTO ${TABLE_NAME} (account_id, transaction_type, amount, description, timestamps) VALUES ($1, $2, $3, $4, $5) RETURNING transaction_id`,
    [account_id, transaction_type, amount, description, timestamps]
  );
  return rows[0].transaction_id;
}

export async function updateTransaction(id, column, value) {
  const allowedColumns = ['account_id', 'transaction_type', 'amount', 'description', 'timestamps'];
  if (!allowedColumns.includes(column)) {
    throw new Error(`Invalid column name: ${column}`);
  }
  const { rows } = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = $1 WHERE transaction_id = $2 RETURNING *`, [value, id]);
  return rows[0];
}

export async function deleteTransaction(id) {
  const { rowCount } = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE transaction_id = $1`, [id]);
  return rowCount;
}
