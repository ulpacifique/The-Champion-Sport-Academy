// backend/src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getStats = async (req: Request, res: Response) => {
    try {
        console.log("Fetching dashboard stats...");
        const totalChildren = await prisma.child.count();
        const activeCoaches = await prisma.coach.count();
        const pendingRegistrations = await prisma.child.count({
            where: { registrationStatus: 'PENDING' }
        });

        // Revenue for current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        console.log("Calculating revenue...");
        const revenueResult = await prisma.payment.aggregate({
            where: {
                status: 'PAID',
                paymentDate: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            _sum: {
                amount: true
            }
        });

        // Get coach attendance for this month (simplified)
        console.log("Fetching coach attendance...");
        const coaches = await prisma.coach.findMany({
            include: {
                user: true,
                attendances: {
                    where: {
                        attendanceDate: {
                            gte: startOfMonth,
                            lte: endOfMonth
                        }
                    }
                }
            }
        });

        const coachAttendance = coaches.map((coach: any) => {
            const present = coach.attendances.filter((a: any) => a.present).length;
            const total = coach.attendances.length;
            const rate = total > 0 ? Math.round((present / total) * 100) : 0;
            return {
                id: Number(coach.id),
                name: `Coach ${coach.user.firstName}`,
                sport: coach.specialization || "General",
                rate,
                present,
                total
            };
        });

        const stats = {
            totalAthletes: totalChildren,
            activeCoaches,
            ongoingPrograms: 0, // Fallback
            pendingRegistrations,
            monthlyRevenue: Number(revenueResult._sum.amount || 0),
            athleteGrowth: "+0%",
            revenueGrowth: "+0%",
            attendanceRate: 92,
            coachAttendance,
            revenueChart: [], // Fallback
            recentActivities: [], // Fallback
            upcomingEvents: [] // Fallback
        };

        console.log("Dashboard stats fetched successfully:", stats);
        res.json(stats);
    } catch (error: any) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({
            message: 'Error fetching dashboard stats',
            error: error.message,
            stack: error.stack
        });
    }
};

export const getParentDashboardStats = async (req: Request, res: Response) => {
    try {
        const session = req.session as any;
        const userId = session?.userId;
        const childId = req.query.childId ? BigInt(req.query.childId as string) : null;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Get current week boundaries
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        // Get parent's children or specific child
        const childFilter: any = { parentId: BigInt(userId) };
        if (childId) {
            childFilter.id = childId;
        }

        const children = await prisma.child.findMany({
            where: childFilter,
            include: {
                attendances: {
                    where: {
                        attendanceDate: {
                            gte: startOfWeek,
                            lt: endOfWeek
                        }
                    },
                    include: {
                        program: {
                            include: {
                                sport: true
                            }
                        }
                    }
                },
                progressRecords: {
                    orderBy: { lastUpdated: 'desc' },
                }
            }
        });

        if (children.length === 0 && childId) {
            return res.status(404).json({ message: 'Child not found or not associated with this parent' });
        }

        // Calculate classes this week (attendance count)
        const classesThisWeek = children.reduce((total: number, child: any) => {
            return total + child.attendances.filter((a: any) => a.present).length;
        }, 0);

        // Calculate achievements (unique skills mastered with high percentage)
        // We use a Map to keep the latest percentage for each skill/sport combo
        const achievements = children.reduce((total: number, child: any) => {
            const highProgress = child.progressRecords.filter((p: any) => p.percentage >= 80);
            return total + highProgress.length;
        }, 0);

        // Build recent activities from various sources
        const recentActivities: any[] = [];

        // Add attendance activities
        for (const child of children) {
            for (const attendance of child.attendances.slice(0, 3)) {
                // Type casting to handle the included relations
                const att = attendance as any;
                const sportName = att.program?.sport?.name || 'General';

                recentActivities.push({
                    id: `attendance-${attendance.id}`,
                    title: `${child.childName} attended class`,
                    description: `Attended ${sportName} class`,
                    time: getRelativeTime(attendance.attendanceDate),
                    type: 'class',
                    date: attendance.attendanceDate
                });
            }
        }

        // Add progress update activities
        for (const child of children) {
            for (const progress of child.progressRecords.slice(0, 2)) {
                if (progress.lastUpdated) {
                    recentActivities.push({
                        id: `progress-${progress.id}`,
                        title: 'Progress Updated',
                        description: `${progress.skillName}: ${progress.percentage}%`,
                        time: getRelativeTime(progress.lastUpdated),
                        type: 'progress',
                        date: progress.lastUpdated
                    });
                }
            }
        }

        // Get recent payments
        const payments = await prisma.payment.findMany({
            where: {
                childId: childId ? BigInt(childId) : { in: children.map((c: any) => c.id) }
            },
            orderBy: { paymentDate: 'desc' },
            take: 2
        });

        for (const payment of payments) {
            if (payment.paymentDate) {
                recentActivities.push({
                    id: `payment-${payment.id}`,
                    title: 'Payment Received',
                    description: `${payment.paymentMethod || 'Payment'} - $${payment.amount}`,
                    time: getRelativeTime(payment.paymentDate),
                    type: 'payment',
                    date: payment.paymentDate
                });
            }
        }

        // Sort by date and take most recent
        recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const limitedActivities = recentActivities.slice(0, 4).map(({ date, ...rest }) => rest);

        res.json({
            classesThisWeek,
            achievements,
            recentActivities: limitedActivities
        });
    } catch (error: any) {
        console.error("Parent Dashboard Stats Error:", error);
        res.status(500).json({
            message: 'Error fetching parent dashboard stats',
            error: error.message
        });
    }
};

// Helper function to get relative time
function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
}
