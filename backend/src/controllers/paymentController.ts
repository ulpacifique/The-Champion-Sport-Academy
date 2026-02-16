// backend/src/controllers/paymentController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const recordPayment = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const payment = await prisma.payment.create({
            data: {
                invoiceNumber: `INV-${Date.now()}`,
                childId: BigInt(data.childId),
                programId: data.programId ? BigInt(data.programId) : null,
                amount: data.amount,
                paymentDate: data.paymentDate ? new Date(data.paymentDate) : new Date(),
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
                status: data.status as any,
                paymentMethod: data.paymentMethod as any,
                transactionId: data.transactionId,
                notes: data.notes,
            }
        });
        res.status(201).json(payment);
    } catch (error: any) {
        res.status(500).json({ message: 'Error recording payment', error: error.message });
    }
};

export const getAllPayments = async (req: Request, res: Response) => {
    const { status, month } = req.query;
    try {
        const filters: any = {};
        if (status) filters.status = status as any;
        if (month) {
            const [year, m] = (month as string).split('-').map(Number);
            filters.paymentDate = {
                gte: new Date(year, m - 1, 1),
                lt: new Date(year, m, 1)
            };
        }

        const payments = await prisma.payment.findMany({
            where: filters,
            include: {
                child: true,
                program: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(payments);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
};

export const getMyChildrenPayments = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.session.userId;
    try {
        const payments = await prisma.payment.findMany({
            where: {
                child: {
                    parentId: userId ? BigInt(userId) : undefined
                }
            },
            include: {
                child: true,
                program: true
            }
        });
        res.json(payments);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching your children payments', error: error.message });
    }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const paymentId = BigInt(id as string);

        const updatedPayment = await prisma.payment.update({
            where: { id: paymentId },
            data: { status: status as any }
        });
        res.json(updatedPayment);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
};
