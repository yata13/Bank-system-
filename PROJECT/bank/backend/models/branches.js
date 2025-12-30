import pool from '../database.js'

const TABLE_NAME = 'branches';

export async function getAllBranches() {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getBranchById(id) {
  const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE branch_id = $1`, [id]);
  return rows[0];
}

export async function createBranch(name, address, city, state, zip, phone) {
  const { rows } = await pool.query(
    `INSERT INTO ${TABLE_NAME} (name, address, city, state, zip_code, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING branch_id`,
    [name, address, city, state, zip, phone]
  );
  return rows[0].branch_id;
}

export async function updateBranch(id, column, value) {
  const allowedColumns = ['branch_name', 'name', 'address', 'city', 'state', 'zip_code', 'phone'];
  if (!allowedColumns.includes(column)) {
    throw new Error(`Invalid column name: ${column}`);
  }
  const { rows } = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = $1 WHERE branch_id = $2 RETURNING *`, [value, id]);
  return rows[0];
}

export async function deleteBranch(id) {
  const { rowCount } = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE branch_id = $1`, [id]);
  return rowCount;
}