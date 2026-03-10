// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'champion-academy-jwt-secret';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[Auth] Checking ${req.method} ${req.originalUrl}`);

    // 1. Check Session
    const session = req.session as any;
    if (session && session.userId) {
        console.log('Auth check - Session PASSED, userId:', session.userId);
        return next();
    }

    // 2. Check JWT Token (Fallback)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            console.log('Auth check - JWT PASSED, userId:', decoded.userId);

            // Attach user info to session for downstream middleware or controllers
            // This also helps "restore" the session if it was lost
            if (session) {
                session.userId = decoded.userId;
                session.role = decoded.role;
            }

            return next();
        } catch (error) {
            console.log('Auth check - JWT FAILED:', (error as any).message);
        }
    }

    console.log('Auth check - ALL FAILED: No valid session or token');
    res.status(401).json({ message: 'Unauthorized: Please login' });
};

export const hasRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const session = req.session as any;
        console.log('Role check - Required roles:', roles);
        console.log('Role check - User role:', session?.role);
        if (session && session.role && roles.includes(session.role)) {
            console.log('Role check - PASSED');
            return next();
        }
        console.log('Role check - FAILED');
        res.status(403).json({ message: 'Forbidden: You do not have permission for this action' });
    };
};
