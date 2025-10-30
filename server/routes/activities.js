import express from "express";
import db from "../db.js";
import {
    authMiddleware,
    requireRole
} from "../middleware/auth.js";

const router = express.Router();

// Get all activities (public)
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM activities ORDER BY id DESC", []);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching activities"
        });
    }
});

// Add new activity (admin/volunteer or sub-entry with parentCategory if user is authed)
router.post("/", authMiddleware, async (req, res) => {
    const {
        title,
        description,
        date,
        parentCategory
    } = req.body;
    try {
        const meta = date ? {
            date
        } : null;
        await db.query(
            "INSERT INTO activities (title, description, category, meta, parentCategory) VALUES ($1, $2, $3, $4, $5)",
            [title, description, parentCategory || null, meta ? JSON.stringify(meta) : null, parentCategory || null]
        );
        res.json({
            message: "Activity added successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error adding activity"
        });
    }
});
// Delete an activity by ID (auth required)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await db.query("DELETE FROM activities WHERE id = $1", [req.params.id]);
        res.json({
            message: "Deleted."
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting activity"
        });
    }
});

export default router;