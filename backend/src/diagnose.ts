import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('--- DATABASE DIAGNOSTIC ---');

    // 1. Get all users with role COACH
    const coaches = await prisma.user.findMany({
        where: { role: 'COACH' },
        select: { id: true, email: true, firstName: true }
    });
    console.log(`Found ${coaches.length} users with role COACH:`);
    for (const c of coaches) {
        const coachRecord = await prisma.coach.findUnique({ where: { id: c.id } });
        const programCount = await prisma.program.count({ where: { coachId: c.id } });
        const coachSports = await prisma.coach_sports.findMany({
            where: { coach_id: c.id },
            include: { sport: true }
        });
        console.log(` - User ID: ${c.id}, Email: ${c.email}, Name: ${c.firstName}`);
        console.log(`   - Coach Table Record exists: ${!!coachRecord}`);
        console.log(`   - Sports specialized: ${coachSports.map(s => s.sport.name).join(', ') || 'None'}`);
        console.log(`   - Programs assigned: ${programCount}`);

        if (programCount > 0) {
            const programs = await prisma.program.findMany({
                where: { coachId: c.id },
                include: { _count: { select: { children: true } } }
            });
            programs.forEach(p => {
                console.log(`     - Program: ${p.name}, Enrolled Students: ${p._count.children}`);
            });
        }
    }

    // 2. Check total students and enrollments
    const students = await prisma.child.findMany({
        include: { essentialSports: { include: { sport: true } } }
    });
    console.log(`\nTotal Students: ${students.length}`);
    for (const s of students) {
        console.log(` - Student: ${s.childName}, Sports: ${s.essentialSports.map(es => es.sport.name).join(', ') || 'None'}`);
    }
    const enrollmentCount = await prisma.child_programs.count();
    console.log(`Total Enrollments: ${enrollmentCount}`);

    console.log('--- END DIAGNOSTIC ---');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
