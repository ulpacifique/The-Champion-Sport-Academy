// backend/src/controllers/progressController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

/**
 * Get all progress records for a specific child
 * GET /progress/:childId
 */
export const getProgressByChild = async (req: Request, res: Response) => {
    try {
        const childIdParam = req.params.childId;
        const childId = BigInt(Array.isArray(childIdParam) ? childIdParam[0] : childIdParam);

        const progressRecords = await prisma.childProgress.findMany({
            where: { childId },
            orderBy: [
                { sportName: 'asc' },
                { skillName: 'asc' }
            ]
        });

        // Convert BigInt to Number for JSON serialization
        const serializedRecords = progressRecords.map((record: any) => ({
            id: Number(record.id),
            childId: Number(record.childId),
            skillName: record.skillName,
            sportName: record.sportName,
            percentage: record.percentage,
            notes: record.notes,
            lastUpdated: record.lastUpdated,
            updatedBy: record.updatedBy
        }));

        res.json(serializedRecords);
    } catch (error: any) {
        console.error('Error fetching progress:', error);
        res.status(500).json({
            message: 'Error fetching progress records',
            error: error.message
        });
    }
};

/**
 * Create or update a progress record
 * POST /progress
 */
export const updateProgress = async (req: Request, res: Response) => {
    try {
        const { id, childId, sportName, skillName, percentage, notes } = req.body;
        const userId = (req as any).user?.id;

        console.log(`[Progress] Update request for child ${childId}:`, { sportName, skillName, percentage, notes });

        // Validation
        if (!childId || !sportName || !skillName || percentage === undefined) {
            console.log("[Progress] Missing required fields");
            return res.status(400).json({
                message: 'Missing required fields: childId, sportName, skillName, percentage'
            });
        }

        // Check if record already exists
        const existingRecord = await prisma.childProgress.findFirst({
            where: {
                childId: BigInt(childId),
                sportName,
                skillName
            }
        });

        let progressRecord;

        if (existingRecord) {
            console.log(`[Progress] Updating existing record ${existingRecord.id}`);
            // Update existing record
            progressRecord = await prisma.childProgress.update({
                where: { id: existingRecord.id },
                data: {
                    percentage: parseInt(percentage),
                    notes: notes || null,
                    lastUpdated: new Date(),
                    updatedBy: userId ? String(userId) : (req.session as any).userId ? String((req.session as any).userId) : null
                }
            });
        } else {
            console.log(`[Progress] Creating new record for child ${childId}`);
            // Create new record
            progressRecord = await prisma.childProgress.create({
                data: {
                    childId: BigInt(childId),
                    sportName,
                    skillName,
                    percentage: parseInt(percentage),
                    notes: notes || null,
                    lastUpdated: new Date(),
                    updatedBy: userId ? String(userId) : (req.session as any).userId ? String((req.session as any).userId) : null
                }
            });
        }

        // Convert BigInt to Number for JSON serialization
        const serializedRecord = {
            id: Number(progressRecord.id),
            childId: Number(progressRecord.childId),
            skillName: progressRecord.skillName,
            sportName: progressRecord.sportName,
            percentage: progressRecord.percentage,
            notes: progressRecord.notes,
            lastUpdated: progressRecord.lastUpdated,
            updatedBy: progressRecord.updatedBy
        };

        res.json(serializedRecord);
    } catch (error: any) {
        console.error('Error updating progress:', error);
        res.status(500).json({
            message: 'Error updating progress record',
            error: error.message
        });
    }
};
