import express from "express";
import db from "../db.js";
import {
    authMiddleware,
    requireRole
} from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM donations ORDER BY id DESC", []);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching donations"
        });
    }
});

router.post("/", authMiddleware, requireRole('admin', 'volunteer'), async (req, res) => {
    const {
        donor_name,
        amount,
        campaign_id
    } = req.body;
    try {
        await db.query(
            "INSERT INTO donations (donor_name, amount, campaign_id) VALUES ($1, $2, $3)",
            [donor_name, amount, campaign_id || null]
        );
        res.json({
            message: "Donation added successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error adding donation"
        });
    }
});

// Public pledge endpoint (no auth)
router.post("/pledge", async (req, res) => {
    const {
        donor_name,
        email,
        amount,
        campaign_id
    } = req.body;
    const isDev = process.env.NODE_ENV !== 'production';
    try {
        const numericAmount = Number(amount);
        if (!numericAmount || numericAmount <= 0) {
            return res.status(400).json({
                message: "Invalid amount"
            });
        }
        await db.query(
            "INSERT INTO donations (donor_name, email, amount, campaign_id) VALUES ($1, $2, $3, $4)",
            [donor_name || null, email || null, numericAmount, campaign_id || null]
        );
        res.json({
            message: "Donation pledge recorded"
        });
    } catch (err) {
        console.error("Donation pledge error:", err);
        res.status(500).json({
            message: "Error recording donation pledge",
            detail: isDev ? (err ? .message || String(err)) : undefined
        });
    }
});

// Summary endpoint
router.get("/summary", async (_req, res) => {
    try {
        const total = await db.query("SELECT COALESCE(SUM(amount),0) AS total_amount, COUNT(*) AS count FROM donations", []);
        res.json(total.rows[0]);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching donation summary"
        });
    }
});

export default router;