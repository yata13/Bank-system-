import express from "express";
import pool from "../database.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { from_account_id, to_account_id, transfer_amount } = req.body;
    try {
        const { rows } = await pool.query("CALL transfer_money($1, $2, $3)", [
            from_account_id,
            to_account_id,
            transfer_amount,
        ]);
        res.json({ success: true, result: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "Transfer failed" });
    }
});


export default router;