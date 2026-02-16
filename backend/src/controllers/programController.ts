// backend/src/controllers/programController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllPrograms = async (req: Request, res: Response) => {
    try {
        const programs = await prisma.program.findMany({
            include: {
                sport: true,
                coach: { include: { user: true } },
            }
        });
        res.json(programs);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching programs', error: error.message });
    }
};

export const getActivePrograms = async (req: Request, res: Response) => {
    try {
        const programs = await prisma.program.findMany({
            where: { status: 'ACTIVE' },
            include: {
                sport: true,
                coach: { include: { user: true } },
            }
        });
        res.json(programs);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching active programs', error: error.message });
    }
};

export const getProgramById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const programId = BigInt(id as string);
        const program = await prisma.program.findUnique({
            where: { id: programId },
            include: {
                sport: true,
                coach: { include: { user: true } },
                children: true
            }
        });
        if (!program) return res.status(404).json({ message: 'Program not found' });
        res.json(program);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching program', error: error.message });
    }
};

export const createProgram = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const program = await prisma.program.create({
            data: {
                name: data.name,
                description: data.description,
                sportId: BigInt(data.sportId),
                coachId: data.coachId ? BigInt(data.coachId) : null,
                ageGroup: data.ageGroup,
                skillLevel: data.skillLevel,
                maxParticipants: data.maxParticipants ? parseInt(data.maxParticipants) : null,
                monthlyFee: data.monthlyFee,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                scheduleDays: data.scheduleDays,
                startTime: data.startTime,
                endTime: data.endTime,
                status: data.status || 'ACTIVE',
            }
        });
        res.status(201).json(program);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating program', error: error.message });
    }
};

export const updateProgram = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const programId = BigInt(id as string);
        const program = await prisma.program.update({
            where: { id: programId },
            data: {
                name: data.name,
                description: data.description,
                sportId: data.sportId ? BigInt(data.sportId) : undefined,
                coachId: data.coachId ? BigInt(data.coachId) : undefined,
                ageGroup: data.ageGroup,
                skillLevel: data.skillLevel,
                status: data.status,
                // ... more fields
            }
        });
        res.json(program);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating program', error: error.message });
    }
};

export const deleteProgram = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.program.delete({ where: { id: BigInt(id as string) } });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting program', error: error.message });
    }
};
