// backend/src/controllers/salaryController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import ExcelJS from 'exceljs';

export const recordSalary = async (req: Request, res: Response) => {
    const { coachId, amount, salaryMonth, paymentMethod, notes } = req.body;
    try {
        const salary = await (prisma as any).coachSalary.create({
            data: {
                coachId: BigInt(coachId),
                amount: amount.toString(), // Prisma Decimal accepts string
                salaryMonth,
                paymentMethod,
                notes,
                paymentDate: new Date(),
                status: 'PAID'
            }
        });
        res.status(201).json(salary);
    } catch (error: any) {
        console.error("Error recording salary:", error);
        res.status(500).json({
            message: 'Error recording salary',
            error: error.message,
            details: error.code // Prisma error codes are helpful
        });
    }
};

export const getAllSalaries = async (req: Request, res: Response) => {
    const { month } = req.query;
    try {
        const filters: any = {};
        if (month) {
            filters.salaryMonth = month as string;
        }

        const salaries = await prisma.coachSalary.findMany({
            where: filters,
            include: {
                coach: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            },
            orderBy: { paymentDate: 'desc' }
        });

        // Format for frontend
        const result = salaries.map((s: any) => ({
            ...s,
            coachName: `${s.coach.user.firstName} ${s.coach.user.lastName}`
        }));

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching salaries', error: error.message });
    }
};

export const exportSalariesExcel = async (req: Request, res: Response) => {
    const { month } = req.query;
    try {
        const filters: any = {};
        if (month) {
            filters.salaryMonth = month as string;
        }

        const salaries = await prisma.coachSalary.findMany({
            where: filters,
            include: {
                coach: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Coach Salaries');

        worksheet.columns = [
            { header: 'Coach Name', key: 'coachName', width: 25 },
            { header: 'Month', key: 'month', width: 15 },
            { header: 'Amount (RWF)', key: 'amount', width: 20 },
            { header: 'Payment Date', key: 'date', width: 20 },
            { header: 'Method', key: 'method', width: 15 },
            { header: 'Notes', key: 'notes', width: 30 }
        ];

        salaries.forEach((s: any) => {
            worksheet.addRow({
                coachName: `${s.coach.user.firstName} ${s.coach.user.lastName}`,
                month: s.salaryMonth,
                amount: Number(s.amount),
                date: s.paymentDate ? s.paymentDate.toLocaleDateString() : 'N/A',
                method: s.paymentMethod,
                notes: s.notes
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=salaries_${month || 'all'}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error: any) {
        console.error("Export Error:", error);
        res.status(500).json({ message: 'Error exporting salaries', error: error.message });
    }
};
