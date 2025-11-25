// server/middleware/auth.js
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    try {
        // ✅ Safely extract token (no optional chaining)
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(" ")[1] : null;

        if (!token) {
            return res.status(401).json({
                error: "No token provided"
            });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({
            error: "Invalid or expired token"
        });
    }
}

export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                error: "Forbidden"
            });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: "Insufficient role"
            });
        }
        next();
    };
}