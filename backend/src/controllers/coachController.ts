// backend/src/controllers/coachController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

export const getAllCoaches = async (req: Request, res: Response) => {
    try {
        const coaches = await prisma.coach.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        role: true,
                        active: true
                    }
                },
                sports: {
                    include: {
                        sport: true
                    }
                }
            }
        });

        // Flattening for DTO consistency
        const result = coaches.map((c: any) => ({
            ...c,
            ...c.user,
            id: c.id // ensure id is the user id
        }));

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching coaches', error: error.message });
    }
};

export const getCoachById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const coachId = BigInt(id as string);

        const coach = await prisma.coach.findUnique({
            where: { id: coachId },
            include: {
                user: true,
                sports: {
                    include: {
                        sport: true
                    }
                },
                programs: true
            }
        });

        if (!coach) return res.status(404).json({ message: 'Coach not found' });

        res.json({
            ...coach,
            ...coach.user,
            id: coach.id
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching coach', error: error.message });
    }
};

export const registerCoach = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phoneNumber, qualifications, yearsOfExperience, specialization, salary, sports } = req.body;

    console.log('Registering coach with data:', { email, firstName, lastName, sports });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 1: Create user and coach without sports
        console.log('Creating user and coach...');
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phoneNumber,
                role: 'COACH',
                coach: {
                    create: {
                        qualifications: qualifications || '',
                        yearsOfExperience: parseInt(yearsOfExperience) || 0,
                        specialization: specialization || '',
                        salary: salary ? parseFloat(salary) : 0
                    }
                }
            }
        });

        console.log('User and coach created:', user.id);

        // Step 2: Handle sports if provided
        if (sports && Array.isArray(sports) && sports.length > 0) {
            console.log('Processing sports:', sports);

            for (const sportName of sports) {
                // Create or find sport
                const sport = await prisma.sport.upsert({
                    where: { name: sportName },
                    update: {},
                    create: { name: sportName, description: sportName }
                });

                console.log('Sport found/created:', sport.name, sport.id);

                // Create junction table entry
                await prisma.coach_sports.create({
                    data: {
                        coach_id: user.id,
                        sport_id: sport.id
                    }
                });

                console.log('Sport linked to coach');
            }
        }

        // Step 3: Fetch the complete coach data with sports
        const completeUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                coach: {
                    include: {
                        sports: {
                            include: {
                                sport: true
                            }
                        }
                    }
                }
            }
        });

        console.log('Coach created successfully');
        res.status(201).json(completeUser);
    } catch (error: any) {
        console.error('Coach registration error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: 'Error registering coach', error: error.message });
    }
};

export const getMyAthletes = async (req: Request, res: Response) => {
    const coachId = (req.session as any).userId;

    console.log('[DEBUG] getMyAthletes - Session userId:', coachId);

    if (!coachId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const cId = BigInt(coachId);

        // 1. Get the coach's sport IDs for broader matching
        const coachSports = await prisma.coach_sports.findMany({
            where: { coach_id: cId },
            select: { sport_id: true }
        });
        const sportIds = coachSports.map(cs => cs.sport_id);

        const athletes = await prisma.child.findMany({
            where: {
                OR: [
                    // Match by formal program enrollment
                    {
                        programs: {
                            some: {
                                program: { coachId: cId }
                            }
                        }
                    },
                    // Match by shared sports (essential or optional)
                    {
                        essentialSports: {
                            some: {
                                sport_id: { in: sportIds }
                            }
                        }
                    },
                    {
                        optionalSports: {
                            some: {
                                sport_id: { in: sportIds }
                            }
                        }
                    }
                ]
            },
            include: {
                parent: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                programs: {
                    include: {
                        program: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                essentialSports: {
                    include: {
                        sport: { select: { name: true } }
                    }
                }
            }
        });

        // Convert BigInt to Number/String for JSON
        const serializedAthletes = athletes.map((a: any) => {
            const names = (a.childName || '').split(' ');
            const firstName = names[0] || '';
            const lastName = names.slice(1).join(' ') || '';

            return {
                ...a,
                id: Number(a.id),
                parentId: Number(a.parentId),
                firstName,
                lastName,
                parentName: a.parent ? `${a.parent.firstName} ${a.parent.lastName}` : (a.parentName || 'N/A'),
                programName: a.programs.length > 0 ? a.programs[0].program.name :
                    (a.essentialSports.length > 0 ? a.essentialSports[0].sport.name : 'No Program')
            };
        });

        res.json(serializedAthletes);
    } catch (error: any) {
        console.error('Error fetching athletes:', error);
        res.status(500).json({ message: 'Error fetching athletes', error: error.message });
    }
};

export const updateCoach = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName, phoneNumber, qualifications, yearsOfExperience, specialization, salary, sports, active } = req.body;

    try {
        const coachId = BigInt(id as string);

        // Update User and Coach details
        const updatedUser = await prisma.user.update({
            where: { id: coachId },
            data: {
                email,
                firstName,
                lastName,
                phoneNumber,
                active: active !== undefined ? active : undefined,
                coach: {
                    update: {
                        qualifications,
                        yearsOfExperience: parseInt(yearsOfExperience) || 0,
                        specialization,
                        salary: salary ? parseFloat(salary) : 0
                    }
                }
            },
            include: {
                coach: true
            }
        });

        // Update Sports if provided
        if (sports && Array.isArray(sports)) {
            // First, remove existing sport connections
            await prisma.coach_sports.deleteMany({
                where: { coach_id: coachId }
            });

            // Then add new ones
            for (const sportName of sports) {
                const sport = await prisma.sport.upsert({
                    where: { name: sportName },
                    update: {},
                    create: { name: sportName, description: sportName }
                });

                await prisma.coach_sports.create({
                    data: {
                        coach_id: coachId,
                        sport_id: sport.id
                    }
                });
            }
        }

        res.json({ message: 'Coach updated successfully', user: updatedUser });
    } catch (error: any) {
        console.error('Error updating coach:', error);
        res.status(500).json({ message: 'Error updating coach', error: error.message });
    }
};

export const deleteCoach = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const coachId = BigInt(id as string);

        // Check for dependencies (like Programs) that would prevent deletion
        const activePrograms = await prisma.program.count({
            where: { coachId: coachId }
        });

        if (activePrograms > 0) {
            return res.status(400).json({
                message: `Cannot delete coach. They are assigned to ${activePrograms} programs. Reassign or delete the programs first.`
            });
        }

        // Delete dependencies in order
        // 1. Coach Skills/Sports (Many-to-Many)
        await prisma.coach_sports.deleteMany({
            where: { coach_id: coachId }
        });

        // 2. Coach Details
        await prisma.coach.delete({
            where: { id: coachId }
        });

        // 3. User Account
        await prisma.user.delete({
            where: { id: coachId }
        });

        res.json({ message: 'Coach deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting coach:', error);
        res.status(500).json({ message: 'Error deleting coach', error: error.message });
    }
};

export const getDashboardStats = async (req: Request, res: Response) => {
    const coachId = (req.session as any).userId;
    if (!coachId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const cId = BigInt(coachId);

        // 1. Basic Counts
        const programCount = await prisma.program.count({ where: { coachId: cId } });

        // 1. Get the coach's sport IDs for broader matching
        const coachSports = await prisma.coach_sports.findMany({
            where: { coach_id: cId },
            select: { sport_id: true }
        });
        const sportIds = coachSports.map(cs => cs.sport_id);

        // 2. Athlete Count (distinct children across coach's programs OR matching sports)
        const athleteCount = await prisma.child.count({
            where: {
                OR: [
                    {
                        programs: {
                            some: {
                                program: { coachId: cId }
                            }
                        }
                    },
                    {
                        essentialSports: {
                            some: {
                                sport_id: { in: sportIds }
                            }
                        }
                    },
                    {
                        optionalSports: {
                            some: {
                                sport_id: { in: sportIds }
                            }
                        }
                    }
                ]
            }
        });

        // 3. Upcoming Classes for Today
        const today = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = days[today.getDay()];

        const upcomingClasses = await prisma.program.findMany({
            where: {
                coachId: cId,
                status: 'ACTIVE',
                scheduleDays: {
                    contains: todayName
                }
            },
            take: 5,
            orderBy: { startTime: 'asc' }
        });

        // 4. Skills Assessed & Performance
        // We get all progress records for children visible to this coach
        const progressRecords = await prisma.childProgress.findMany({
            where: {
                child: {
                    OR: [
                        {
                            programs: {
                                some: {
                                    program: { coachId: cId }
                                }
                            }
                        },
                        {
                            essentialSports: {
                                some: {
                                    sport_id: { in: sportIds }
                                }
                            }
                        },
                        {
                            optionalSports: {
                                some: {
                                    sport_id: { in: sportIds }
                                }
                            }
                        }
                    ]
                }
            }
        });

        const skillsAssessedCount = progressRecords.length;
        const performance = progressRecords.length > 0
            ? (progressRecords.reduce((acc: number, curr: any) => acc + curr.percentage, 0) / progressRecords.length).toFixed(1) + '%'
            : '0%';

        res.json({
            programCount,
            athleteCount,
            upcomingClassesCount: upcomingClasses.length,
            upcomingClasses: upcomingClasses.map((cls: any) => ({
                id: cls.id.toString(),
                name: cls.name,
                startTime: cls.startTime,
                endTime: cls.endTime,
                currentParticipants: cls.currentParticipants
            })),
            skillsAssessedCount,
            performance
        });
    } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
}
