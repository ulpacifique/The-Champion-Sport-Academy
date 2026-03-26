// backend/src/app.ts
import express from 'express';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PostgresStore = pgSession(session);

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // explicitly allow Authorization
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logging middleware
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.originalUrl}`);
    next();
});

// BigInt serialization fix for JSON
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

// Session Configuration
app.use(session({
    store: new PostgresStore({
        conString: process.env.DATABASE_URL,
        tableName: 'session',
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'champion-academy-secret',
    resave: false,
    saveUninitialized: false,
    rolling: true, // Refresh session on every request
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    }
}));

// Basic route
app.get('/', (req, res) => {
    res.send('The Champion Sport Academy Backend (Node.js) is running!');
});

// TODO: Import and use routes here
import authRoutes from './routes/authRoutes';
import childRoutes from './routes/childRoutes';
import coachRoutes from './routes/coachRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import programRoutes from './routes/programRoutes';
import paymentRoutes from './routes/paymentRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import eventRoutes from './routes/eventRoutes';
import galleryRoutes from './routes/galleryRoutes';
import salaryRoutes from './routes/salaryRoutes';
import progressRoutes from './routes/progressRoutes';
import messageRoutes from './routes/messageRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/children', childRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/messages', messageRoutes);

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 404 Handler to debug missing routes
app.use((req, res) => {
    console.log(`[404] Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

export default app;
