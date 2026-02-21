// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const requestOTP = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        await prisma.user.update({
            where: { email },
            data: {
                otpCode: otp,
                otpExpiresAt: expiresAt,
            },
        });

        const mailOptions = {
            from: `"Champion Sport Academy" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #facc15; text-align: center;">Champion Sport Academy</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset. Use the following OTP to reset your password. This OTP is valid for 10 minutes.</p>
                    <div style="background-color: #fef9c3; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                        <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #854d0e;">${otp}</span>
                    </div>
                    <p>If you did not request this, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666; text-align: center;">&copy; ${new Date().getFullYear()} Champion Sport Academy. All rights reserved.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'OTP sent to your email' });
    } catch (error: any) {
        console.error('Error in requestOTP:', error);
        res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.otpCode !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                otpCode: null,
                otpExpiresAt: null,
            },
        });

        res.json({ message: 'Password reset successful' });
    } catch (error: any) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phoneNumber, role, address } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { phoneNumber }] }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email or phone number' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phoneNumber,
                role,
                address,
            },
        });

        // If it's a coach, we should probably create a Coach entry as well if the UI sends coach-specific data
        if (role === 'COACH') {
            await prisma.coach.create({
                data: {
                    id: user.id,
                }
            });
        }

        res.status(201).json({
            id: Number(user.id),
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Registration error', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Set user info in session
        (req.session as any).userId = user.id;
        (req.session as any).role = user.role;

        res.json({
            id: Number(user.id),
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Login error', error: error.message });
    }
};

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid'); // default cookie name for express-session
        res.json({ message: 'Logout successful' });
    });
};

export const me = async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;
    if (!userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: BigInt(userId) } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            id: Number(user.id),
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching current user', error: error.message });
    }
};
