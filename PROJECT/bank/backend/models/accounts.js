import pool from '../database.js'

const TABLE_NAME = "accounts";

async function getAllAccount() {
    try {
        const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`)
        return rows;
    } catch (err) {
        console.error("Error in getAllAccount:", err);
        throw err;
    }
}

async function getByIdAccounts(id) {
    try {
        const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE account_id = $1`, [id])
        return rows[0]
    }
    catch (err) {
        console.error("Error in getByIdAccounts:", err);
        throw err;
    }
}


export async function getAccountsByCustomerId(customer_id) {
    const { rows } = await pool.query(`
    SELECT 
      a.account_number,
      a.balance,
      a.status,
      a.opened,
      b.name as branch_name,
      t.type_name
    FROM accounts a
    JOIN branches b ON a.branch_id = b.branch_id
    JOIN account_types t ON a.type_id = t.type_id
    WHERE a.customer_id = $1
  `, [customer_id]);

    return rows;
}


async function createAccount(customer_id, branch_id, type_id, account_number, balance, status, opened) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO ${TABLE_NAME}(customer_id, branch_id, type_id, account_number, balance, status, opened)
            VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING account_id`,
            [customer_id, branch_id, type_id, account_number, balance, status, opened]
        )
        return rows[0].account_id;
    }
    catch (err) {
        console.error("Error in createAccount:", err);
        throw err;
    }
}


async function updateaccount(id, column, value) {
    try {
        const allowedColumns = ['customer_id', 'branch_id', 'type_id', 'account_number', 'balance', 'status', 'opened', 'is_blocked'];
        if (!allowedColumns.includes(column)) {
            throw new Error(`Invalid column name: ${column}`);
        }
        const query = `UPDATE ${TABLE_NAME} SET ${column} = $1 WHERE account_id = $2 RETURNING *`;
        const { rows } = await pool.query(query, [value, id]);
        return rows[0]
    }
    catch (err) {
        console.error("Error in updateaccount:", err);
        throw err;
    }
}

async function deleteaccount(id) {
    try {
        const { rowCount } = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE account_id = $1`, [id])
        return rowCount;
    } catch (err) {
        console.error("Error in deleteaccount:", err);
        throw err;
    }
}

export { getAllAccount, getByIdAccounts, createAccount, updateaccount, deleteaccount }