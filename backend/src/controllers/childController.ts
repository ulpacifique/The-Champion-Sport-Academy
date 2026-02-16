// backend/src/controllers/childController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const registerChild = async (req: Request, res: Response) => {
    const { childName, age, gender, sport, belt, level, parentName, parentPhone, parentEmail } = req.body;
    // @ts-ignore
    const userId = req.session.userId;
    // @ts-ignore
    const userRole = req.session.role;

    try {
        let parentData = {};
        if (userId) {
            const parentUser = await prisma.user.findUnique({ where: { id: BigInt(userId) } });
            if (parentUser) {
                parentData = {
                    parent: { connect: { id: BigInt(userId) } },
                    parentName: `${parentUser.firstName} ${parentUser.lastName}`,
                    parentEmail: parentUser.email,
                    parentPhone: parentUser.phoneNumber,
                };
            }
        } else {
            parentData = {
                parentName,
                parentPhone,
                parentEmail,
            };
        }

        const isManagerOrAdmin = userRole === 'MANAGER' || userRole === 'ADMIN';

        // First create with a temp ID to satisfy unique constraint
        const tempChild = await prisma.child.create({
            data: {
                childName,
                childId: `TEMP-${Date.now()}`, // Temporary ID
                age: parseInt(age),
                gender,
                registrationStatus: isManagerOrAdmin ? 'ACTIVE' : 'PENDING',
                belt,
                level,
                ...parentData,
                // Handling sport
                essentialSports: sport ? {
                    create: {
                        sport: {
                            connectOrCreate: {
                                where: { name: sport } as any,
                                create: { name: sport, active: true }
                            }
                        }
                    }
                } : undefined as any
            } as any,
            include: {
                essentialSports: true,
                programs: true
            }
        });

        // Immediately update childId to match the auto-increment ID (e.g. "1", "2")
        const child = await prisma.child.update({
            where: { id: tempChild.id },
            data: { childId: tempChild.id.toString() },
            include: {
                essentialSports: true,
                programs: true
            }
        });

        res.status(201).json(child);
    } catch (error: any) {
        res.status(500).json({ message: 'Error registering child', error: error.message });
    }
};

export const getAllChildren = async (req: Request, res: Response) => {
    const { age, gender, programId, registrationStatus } = req.query;

    try {
        const filters: any = {};
        if (age) filters.age = parseInt(age as string);
        if (gender) filters.gender = gender as string;
        if (registrationStatus) filters.registrationStatus = registrationStatus as string;
        if (programId) {
            filters.programs = {
                some: { id: BigInt(programId as string) }
            };
        }

        const children = await prisma.child.findMany({
            where: filters,
            include: {
                essentialSports: {
                    include: { sport: true }
                },
                optionalSports: {
                    include: { sport: true }
                },
                programs: {
                    include: { program: true }
                },
            }
        });

        res.json(children);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching children', error: error.message });
    }
};

export const getMyChildren = async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;

    try {
        const children = await prisma.child.findMany({
            where: { parentId: userId ? BigInt(userId) : undefined },
            include: {
                essentialSports: {
                    include: { sport: true }
                },
                programs: {
                    include: { program: true }
                },
                progressRecords: true
            }
        });

        const childrenWithProgress = children.map((child: any) => {
            const totalRecords = child.progressRecords.length;
            const avgProgress = totalRecords > 0
                ? Math.round(child.progressRecords.reduce((sum: number, p: any) => sum + p.percentage, 0) / totalRecords)
                : 0;

            return {
                ...child,
                id: Number(child.id),
                parentId: child.parentId ? Number(child.parentId) : null,
                averageProgress: avgProgress
            };
        });

        res.json(childrenWithProgress);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching your children', error: error.message });
    }
};

export const getChildById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const childId = BigInt(id as string);

        const child = await prisma.child.findUnique({
            where: { id: childId },
            include: {
                essentialSports: {
                    include: { sport: true }
                },
                optionalSports: {
                    include: { sport: true }
                },
                programs: {
                    include: { program: true }
                },
                payments: true,
                attendances: true,
                progressRecords: true
            }
        });

        if (!child) return res.status(404).json({ message: 'Child not found' });

        const totalRecords = child.progressRecords.length;
        const avgProgress = totalRecords > 0
            ? Math.round(child.progressRecords.reduce((sum: number, p: any) => sum + p.percentage, 0) / totalRecords)
            : 0;

        res.json({
            ...child,
            id: Number(child.id),
            parentId: child.parentId ? Number(child.parentId) : null,
            averageProgress: avgProgress
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching child', error: error.message });
    }
};

export const updateChild = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const childId = BigInt(id as string);

        const updatedChild = await prisma.child.update({
            where: { id: childId },
            data: {
                childName: data.childName,
                age: data.age ? parseInt(data.age) : undefined,
                gender: data.gender,
                belt: data.belt,
                level: data.level,
                // ... more fields
            }
        });
        res.json(updatedChild);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating child', error: error.message });
    }
};

export const deleteChild = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const childId = BigInt(id as string);

        await prisma.child.delete({ where: { id: childId } });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting child', error: error.message });
    }
};

export const approveChild = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const childId = BigInt(id as string);

        const child = await prisma.child.update({
            where: { id: childId },
            data: { registrationStatus: 'ACTIVE' }
        });
        res.json(child);
    } catch (error: any) {
        res.status(500).json({ message: 'Error approving child', error: error.message });
    }
};

export const rejectChild = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const childId = BigInt(id as string);

        const child = await prisma.child.update({
            where: { id: childId },
            data: { registrationStatus: 'REJECTED' }
        });
        res.json(child);
    } catch (error: any) {
        res.status(500).json({ message: 'Error rejecting child', error: error.message });
    }
};
