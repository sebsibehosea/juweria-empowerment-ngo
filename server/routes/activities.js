import express from "express";
import db from "../db.js";
import {
    authMiddleware
} from "../middleware/auth.js";

const router = express.Router();

// Get all activities (public)
router.get("/", async (req, res) => {
    try {
        const result = await db.query(
            `SELECT id,
                    slug,
                    title,
                    description,
                    category,
                    parent_category AS "parentCategory",
                    meta,
                    created_at
             FROM activities
             ORDER BY id DESC`
        );
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
        parentCategory,
        category
    } = req.body;
    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required."
        });
    }
    try {
        const meta = date ? {
            date
        } : null;
        const parentValue = parentCategory || null;
        const categoryValue = category || parentValue;
        await db.query(
            `INSERT INTO activities (title, description, category, parent_category, meta)
             VALUES ($1, $2, $3, $4, $5)`, [
                title,
                description,
                categoryValue,
                parentValue,
                meta ? JSON.stringify(meta) : null,
            ]
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