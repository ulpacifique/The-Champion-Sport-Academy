// backend/src/controllers/attendanceController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const markAttendance = async (req: Request, res: Response) => {
    const { childId, coachId, programId, attendanceDate, present, notes } = req.body;

    try {
        const attendance = await prisma.attendance.create({
            data: {
                child: childId ? { connect: { id: BigInt(childId) } } : undefined,
                coach: coachId ? { connect: { id: BigInt(coachId) } } : undefined,
                program: programId ? { connect: { id: BigInt(programId) } } : undefined,
                attendanceDate: new Date(attendanceDate),
                present: !!present,
                notes,
            } as any,
        });

        res.status(201).json(attendance);
    } catch (error: any) {
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
};

export const markBulkAttendance = async (req: Request, res: Response) => {
    const attendances = req.body; // Expecting an array of Attendance objects

    try {
        const data = await prisma.$transaction(
            attendances.map((a: any) =>
                prisma.attendance.create({
                    data: {
                        child: a.childId ? { connect: { id: BigInt(a.childId) } } : undefined,
                        coach: a.coachId ? { connect: { id: BigInt(a.coachId) } } : undefined,
                        program: a.programId ? { connect: { id: BigInt(a.programId) } } : undefined,
                        attendanceDate: new Date(a.attendanceDate),
                        present: !!a.present,
                        notes: a.notes,
                    } as any
                })
            )
        );

        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error marking bulk attendance', error: error.message });
    }
};

export const getAttendanceByProgram = async (req: Request, res: Response) => {
    const { programId } = req.params;
    const { date } = req.query;

    try {
        const attendances = await prisma.attendance.findMany({
            where: {
                programId: BigInt(programId as string),
                attendanceDate: date ? new Date(date as string) : undefined
            },
            include: {
                child: true,
                coach: { include: { user: true } }
            }
        });

        res.json(attendances);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching program attendance', error: error.message });
    }
};

export const getAttendanceByChild = async (req: Request, res: Response) => {
    const { childId } = req.params;
    const { fromDate, toDate } = req.query;

    try {
        const attendances = await prisma.attendance.findMany({
            where: {
                childId: BigInt(childId as string),
                attendanceDate: {
                    gte: fromDate ? new Date(fromDate as string) : undefined,
                    lte: toDate ? new Date(toDate as string) : undefined
                }
            },
            include: {
                program: true
            }
        });

        res.json(attendances);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching child attendance', error: error.message });
    }
};

export const getAttendanceByCoach = async (req: Request, res: Response) => {
    const { coachId } = req.params;
    const { fromDate, toDate } = req.query;

    try {
        const attendances = await prisma.attendance.findMany({
            where: {
                coachId: BigInt(coachId as string),
                attendanceDate: {
                    gte: fromDate ? new Date(fromDate as string) : undefined,
                    lte: toDate ? new Date(toDate as string) : undefined
                }
            },
            include: {
                program: true
            }
        });

        res.json(attendances);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching coach attendance', error: error.message });
    }
};
