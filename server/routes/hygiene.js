import express from "express";
import db from "../db.js";
import {
    authMiddleware,
    requireRole
} from "../middleware/auth.js";

const router = express.Router();

// List hygiene distributions
router.get("/", authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT id, donor_name, email, amount, campaign_id, created_at FROM donations ORDER BY id DESC`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching hygiene distributions"
        });
    }
});

// Create hygiene package distribution record
router.post("/", authMiddleware, requireRole("admin", "volunteer"), async (req, res) => {
    const {
        location,
        beneficiary_count,
        package_type,
        notes
    } = req.body;
    try {
        await db.query(
            `CREATE TABLE IF NOT EXISTS hygiene_distributions (
         id SERIAL PRIMARY KEY,
         location TEXT NOT NULL,
         beneficiary_count INTEGER NOT NULL,
         package_type TEXT,
         notes TEXT,
         created_at TIMESTAMP DEFAULT now()
       )`
        );
        await db.query(
            `INSERT INTO hygiene_distributions (location, beneficiary_count, package_type, notes)
       VALUES ($1, $2, $3, $4)`,
            [location, beneficiary_count, package_type || null, notes || null]
        );
        res.json({
            message: "Hygiene distribution recorded"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating hygiene record"
        });
    }
});

export default router;