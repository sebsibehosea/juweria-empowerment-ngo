import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
    readFile
} from "fs/promises";
import path from "path";
import {
    fileURLToPath
} from "url";
import db from "./db.js";

import activitiesRoutes from "./routes/activities.js";
import donationsRoutes from "./routes/donations.js";
import authRoutes from "./routes/auth.js";
import hygieneRoutes from "./routes/hygiene.js";
import resourcesRoutes from "./routes/resources.js";

// ✅ Load environment variables first
dotenv.config();

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/hygiene", hygieneRoutes);
app.use("/api/resources", resourcesRoutes);

// ✅ Health check route (useful for debugging)
app.get("/", (req, res) => {
    res.json({
        message: "API running successfully 🚀"
    });
});

// ✅ Use environment port
// Force a stable port to avoid mismatches with the frontend/dev tooling
const PORT = 5000;

async function ensureSchema() {
    try {
        const initPath = path.join(__dirname, "sql", "init.sql");
        const sql = await readFile(initPath, "utf8");
        if (sql.trim()) {
            await db.query(sql);
            console.log("[DB] Base schema ensured via init.sql");
        }
    } catch (err) {
        console.warn("[DB] Skipped init.sql bootstrap:", err.message);
    }
    await db.query(`ALTER TABLE activities ADD COLUMN IF NOT EXISTS parent_category TEXT`);
    await db.query(`ALTER TABLE donations ADD COLUMN IF NOT EXISTS category TEXT`);
    await db.query(`ALTER TABLE donations ADD COLUMN IF NOT EXISTS note TEXT`);
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
}

app.listen(PORT, async () => {
    try {
        await ensureSchema();
        // Test DB connection
        await db.query("SELECT NOW()");
        console.log(`✅ Database connected successfully`);
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
    console.log(`🚀 Server running on port ${PORT}`);
});