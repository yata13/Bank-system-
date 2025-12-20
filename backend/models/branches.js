import pool from '../database.js'

const TABLE_NAME = 'branches';

export async function getAllBranches() {
  const [rows] = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getBranchById(id) {
  const [row] = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE branch_id = ?`, [id]);
  return row;
}

export async function createBranch(branch_name, address, city, state, zip, phone) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE_NAME} (branch_name, address, city, state, zip_code, phone) VALUES (?, ?, ?, ?, ?, ?)`,
    [branch_name, address, city, state, zip, phone]
  );
  return result.insertId;
}

export async function updateBranch(id, column, value) {
  const [result] = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = ? WHERE branch_id = ?`, [value, id]);
  return result;
}

export async function deleteBranch(id) {
  const [result] = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE branch_id = ?`, [id]);
  return result;
}