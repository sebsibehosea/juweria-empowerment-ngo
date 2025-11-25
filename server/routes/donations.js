import express from "express";
import db from "../db.js";
import {
    authMiddleware
} from "../middleware/auth.js";

const router = express.Router();

// 🔹 Helper for safe error messages
const safeError = (err) => (err && err.message ? err.message : String(err));

/**
 * GET all donations
 */
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM donations ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("Fetch donations error:", err);
        const isDev = process.env.NODE_ENV !== "production";
        res.status(500).json({
            message: "Error fetching donations",
            detail: isDev ? safeError(err) : undefined,
        });
    }
});

/**
 * POST create a new donation
 */
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            donor_name,
            amount,
            category,
            note
        } = req.body;

        if (!donor_name || !amount || !category) {
            return res.status(400).json({
                message: "Donor name, amount, and category are required.",
            });
        }

        const result = await db.query(
            `INSERT INTO donations (donor_name, amount, category, note)
             VALUES ($1, $2, $3, $4)
             RETURNING *`, [donor_name, amount, category, note || null]
        );

        res.status(201).json({
            message: "Donation created successfully",
            donation: result.rows[0],
        });
    } catch (err) {
        console.error("Error creating donation:", err);
        const isDev = process.env.NODE_ENV !== "production";
        res.status(500).json({
            message: "Error creating donation",
            detail: isDev ? safeError(err) : undefined,
        });
    }
});

/**
 * PATCH update a donation
 */
router.patch("/:id", authMiddleware, async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            donor_name,
            amount,
            category,
            note
        } = req.body;

        const fields = [];
        const vals = [];

        if (donor_name) {
            fields.push(`donor_name = $${fields.length + 1}`);
            vals.push(donor_name);
        }
        if (amount !== undefined) {
            fields.push(`amount = $${fields.length + 1}`);
            vals.push(amount);
        }
        if (category) {
            fields.push(`category = $${fields.length + 1}`);
            vals.push(category);
        }
        if (note !== undefined) {
            fields.push(`note = $${fields.length + 1}`);
            vals.push(note);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                message: "No fields to update."
            });
        }

        vals.push(id);
        const result = await db.query(
            `UPDATE donations SET ${fields.join(", ")} WHERE id = $${vals.length} RETURNING *`,
            vals
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Donation not found."
            });
        }

        res.json({
            message: "Donation updated successfully",
            donation: result.rows[0],
        });
    } catch (err) {
        console.error("Error updating donation:", err);
        const isDev = process.env.NODE_ENV !== "production";
        res.status(500).json({
            message: "Error updating donation",
            detail: isDev ? safeError(err) : undefined,
        });
    }
});

/**
 * DELETE a donation
 */
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const result = await db.query("DELETE FROM donations WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Donation not found."
            });
        }

        res.json({
            message: "Donation deleted successfully",
            donation: result.rows[0],
        });
    } catch (err) {
        console.error("Error deleting donation:", err);
        const isDev = process.env.NODE_ENV !== "production";
        res.status(500).json({
            message: "Error deleting donation",
            detail: isDev ? safeError(err) : undefined,
        });
    }
});

/**
 * GET donation summary (totals / count)
 */
router.get("/summary", async (_req, res) => {
    try {
        const result = await db.query(
            `SELECT
                COALESCE(SUM(amount), 0) AS total_amount,
                COUNT(*) AS count
             FROM donations`
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Fetch summary error:", err);
        const isDev = process.env.NODE_ENV !== "production";
        res.status(500).json({
            message: "Error fetching donation summary",
            detail: isDev ? safeError(err) : undefined,
        });
    }
});

export default router;