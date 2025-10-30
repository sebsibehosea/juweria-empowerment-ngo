import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import {
    authMiddleware
} from "../middleware/auth.js";

const router = express.Router();

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
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }
        const hashed = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)`, [name, email, hashed, role || "beneficiary"]
        );

        res.json({
            message: "User registered successfully"
        });
    } catch (err) {
        console.error("Registration error:", err);
        if (err ? .code === '23505') {
            return res.status(409).json({
                message: "Email already in use"
            });
        }
        const isDev = process.env.NODE_ENV !== 'production';
        res.status(500).json({
            message: "Error registering user",
            detail: isDev ? (err ? .message || String(err)) : undefined
        });
    }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const result = await db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER($1)`, [email]);

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "User not found"
            });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({
            message: "Invalid password"
        });

        if (!process.env.JWT_SECRET) {
            console.warn("JWT_SECRET is not set; using a fallback for development.");
        }
        const token = jwt.sign({
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET || 'dev-secret', {
                expiresIn: "2h" // 2 hours validity
            }
        );
        // Set cookie for 2 hours, in addition to sending as JSON
        res
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 2, // 2 hours
                // secure: true, // uncomment when using HTTPS in production!
            })
            .json({
                token,
                user
            });
    } catch (err) {
        console.error("Login error:", err);
        const isDev = process.env.NODE_ENV !== 'production';
        res.status(500).json({
            message: "Error logging in",
            detail: isDev ? (err ? .message || String(err)) : undefined
        });
    }
});

// PATCH /api/auth/profile - update name/email
router.patch("/profile", authMiddleware, async (req, res) => {
    try {
        const {
            name,
            email
        } = req.body;
        if (!name && !email) return res.status(400).json({
            message: "No changes submitted."
        });

        // Check for duplicate email if changing email
        if (email) {
            const check = await db.query(`SELECT id FROM users WHERE email = $1 AND id <> $2`, [email, req.user.id]);
            if (check.rows.length > 0) {
                return res.status(409).json({
                    message: "Email already in use by another user."
                });
            }
        }

        const fields = [];
        const vals = [];
        if (name) {
            fields.push("name = $" + (fields.length + 1));
            vals.push(name);
        }
        if (email) {
            fields.push("email = $" + (fields.length + 1));
            vals.push(email);
        }
        vals.push(req.user.id);

        await db.query(`UPDATE users SET ${fields.join(', ')} WHERE id = $${vals.length} RETURNING *`, vals);
        const result = await db.query(`SELECT id, name, email, role, created_at FROM users WHERE id = $1`, [req.user.id]);
        res.json({
            user: result.rows[0],
            message: "Profile updated."
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating profile",
            detail: err.message
        });
    }
});

// PATCH /api/auth/password - change password
router.patch("/password", authMiddleware, async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;
        if (!currentPassword || !newPassword) return res.status(400).json({
            message: "Both current and new password are required."
        });
        const userRes = await db.query(`SELECT id, password_hash FROM users WHERE id = $1`, [req.user.id]);
        const user = userRes.rows[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) return res.status(401).json({
            message: "Current password is incorrect."
        });
        const newHash = await bcrypt.hash(newPassword, 10);
        await db.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [newHash, req.user.id]);
        res.json({
            message: "Password updated successfully."
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating password",
            detail: err.message
        });
    }
});

export default router;