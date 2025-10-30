import express from "express";
import db from "../db.js";
import {
    authMiddleware,
    requireRole
} from "../middleware/auth.js";

const router = express.Router();

// Ensure table exists lazily
async function ensureTable() {
    await db.query(`CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    category TEXT,
    created_at TIMESTAMP DEFAULT now()
  )`);
}

router.get("/", async (_req, res) => {
    try {
        await ensureTable();
        const result = await db.query(`SELECT * FROM resources ORDER BY id DESC`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching resources"
        });
    }
});

router.post("/", authMiddleware, requireRole("admin", "volunteer"), async (req, res) => {
    const {
        title,
        description,
        url,
        category
    } = req.body;
    try {
        await ensureTable();
        await db.query(
            `INSERT INTO resources (title, description, url, category) VALUES ($1, $2, $3, $4)`,
            [title, description || null, url || null, category || null]
        );
        res.json({
            message: "Resource added"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error adding resource"
        });
    }
});

export default router;