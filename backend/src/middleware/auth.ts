// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[Auth] Checking ${req.method} ${req.originalUrl}`);
    const session = req.session as any;
    console.log('Auth check - Session:', session);
    if (session && session.userId) {
        console.log('Auth check - PASSED, userId:', session.userId);
        return next();
    }
    console.log('Auth check - FAILED: No session or userId');
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
