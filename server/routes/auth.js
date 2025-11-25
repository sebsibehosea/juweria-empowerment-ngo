import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import {
    authMiddleware
} from "../middleware/auth.js";

const router = express.Router();

// Helper for safe error handling
const safeError = (err) => {
    if (!err) return "";
    return err.message || String(err);
};

// ✅ REGISTER
router.post("/register", async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Name, email, and password are required."
                });
        }

        const hashed = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users (name, email, password_hash, role)
             VALUES ($1, $2, $3, $4)`, [name, email, hashed, role || "beneficiary"]
        );

        res.json({
            success: true,
            message: "User registered successfully.",
        });
    } catch (err) {
        console.error("Registration error:", err);

        if (err && err.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already in use.",
            });
        }

        const isDev = process.env.NODE_ENV !== "production";
        res.status(500).json({
            success: false,
            message: "Error registering user.",
            detail: isDev ? safeError(err) : undefined,
        });
    }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
    console.log("Login attempt received:", req.body);
    const {
        email,
        password
    } = req.body;
    try {
        if (!email || !password)
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email and password are required."
                });

        const result = await db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER($1)`, [
            email,
        ]);

        if (result.rows.length === 0)
            return res.status(404).json({
                success: false,
                message: "User not found."
            });

        const user = result.rows[0];
        const storedHash = user.password_hash || user.password;
        const isMatch = await bcrypt.compare(password, storedHash);

        if (!isMatch)
            return res.status(401).json({
                success: false,
                message: "Invalid password."
            });

        const token = jwt.sign({
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET || "dev-secret", {
                expiresIn: "2h"
            }
        );

        res
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 2, // 2 hours
                // secure: true, // enable if using HTTPS
            })
            .status(200)
            .json({
                success: true,
                message: "Login successful.",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
    } catch (err) {
        console.error("Login error:", err);
        const isDev = process.env.NODE_ENV !== "production";
        res.status(500).json({
            success: false,
            message: "Error logging in.",
            detail: isDev ? safeError(err) : undefined,
        });
    }
});

// ✅ UPDATE PROFILE
router.patch("/profile", authMiddleware, async (req, res) => {
    try {
        const {
            name,
            email
        } = req.body;
        if (!name && !email)
            return res.status(400).json({
                success: false,
                message: "No changes submitted."
            });

        if (email) {
            const check = await db.query(
                `SELECT id FROM users WHERE email = $1 AND id <> $2`, [email, req.user.id]
            );
            if (check.rows.length > 0)
                return res.status(409).json({
                    success: false,
                    message: "Email already in use.",
                });
        }

        const fields = [];
        const vals = [];
        if (name) {
            fields.push(`name = $${fields.length + 1}`);
            vals.push(name);
        }
        if (email) {
            fields.push(`email = $${fields.length + 1}`);
            vals.push(email);
        }
        vals.push(req.user.id);

        await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = $${vals.length}`, vals);

        const updated = await db.query(
            `SELECT id, name, email, role, created_at FROM users WHERE id = $1`, [req.user.id]
        );

        res.json({
            success: true,
            message: "Profile updated.",
            user: updated.rows[0],
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating profile.",
            detail: safeError(err),
        });
    }
});

// ✅ CHANGE PASSWORD
router.patch("/password", authMiddleware, async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;
        if (!currentPassword || !newPassword)
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Both current and new password are required."
                });

        const userRes = await db.query(
            `SELECT id, password_hash FROM users WHERE id = $1`, [req.user.id]
        );
        const user = userRes.rows[0];

        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch)
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect.",
            });

        const newHash = await bcrypt.hash(newPassword, 10);
        await db.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [
            newHash,
            req.user.id,
        ]);

        res.json({
            success: true,
            message: "Password updated successfully."
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating password.",
            detail: safeError(err),
        });
    }
});

export default router;