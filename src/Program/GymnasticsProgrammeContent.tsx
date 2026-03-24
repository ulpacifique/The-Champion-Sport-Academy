import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconStar } from '@tabler/icons-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const sectionShell = 'py-16 md:py-24 px-4 md:px-8 lg:px-16';
const maxW = 'max-w-5xl mx-auto';

const SectionTitle = ({ n, children }: { n: string; children: ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-6 border-l-4 border-bright-sun-500 pl-4 md:pl-5">
        <span className="text-bright-sun-600 dark:text-bright-sun-400 not-italic mr-2">{n}</span>
        {children}
    </h2>
);

const StageCard = ({
    dotClass,
    title,
    age,
    focus,
    outcomes,
}: {
    dotClass: string;
    title: string;
    age: string;
    focus: string[];
    outcomes: string[];
}) => (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-cerulean-blue-900/30 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
            <span className={`h-3 w-3 rounded-full shrink-0 ${dotClass}`} aria-hidden />
            <h3 className="text-lg md:text-xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tight">{title}</h3>
            <span className="text-sm font-bold text-bright-sun-600 dark:text-bright-sun-300">({age})</span>
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Focus</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 mb-4 text-sm md:text-base">
            {focus.map((f) => (
                <li key={f}>{f}</li>
            ))}
        </ul>
        <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Key outcomes</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm md:text-base">
            {outcomes.map((o) => (
                <li key={o}>{o}</li>
            ))}
        </ul>
    </div>
);

/** Programme copy for Gymnastics page (sections 1–10) */
export const GymnasticsProgrammeContent = ({ instructionImageUrl }: { instructionImageUrl: string }) => (
    <>
        {/* 1. Programme identity */}
        <section className={`${sectionShell} relative overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]`}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-bright-sun-600/5 dark:bg-bright-sun-300/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <motion.div {...fadeInUp}>
                        <SectionTitle n="1.">Programme Identity</SectionTitle>
                        <p className="text-xs font-black uppercase tracking-widest text-bright-sun-600 dark:text-bright-sun-300 mb-2">Programme title</p>
                        <p className="text-xl md:text-2xl font-black text-cerulean-blue-900 dark:text-white mb-8">
                            The Champions Artistic Gymnastics for Life Programme
                        </p>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">Institutional alignment</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            This programme is fully aligned with:
                        </p>
                        <div className="space-y-6 text-gray-700 dark:text-gray-200">
                            <div>
                                <p className="font-black text-cerulean-blue-900 dark:text-white mb-1">Mission</p>
                                <p className="italic text-sm md:text-base leading-relaxed border-l-4 border-bright-sun-500/40 pl-4">
                                    To empower people through inclusive sport, physical literacy, and values-based education programmes that promote excellence,
                                    health, and lifelong well-being.
                                </p>
                            </div>
                            <div>
                                <p className="font-black text-cerulean-blue-900 dark:text-white mb-1">Vision</p>
                                <p className="italic text-sm md:text-base leading-relaxed border-l-4 border-bright-sun-500/40 pl-4">
                                    To become a global hub of inclusive sport and physical literacy that promotes excellence, health, and lifelong well-being.
                                </p>
                            </div>
                            <div>
                                <p className="font-black text-cerulean-blue-900 dark:text-white mb-1">Core values</p>
                                <p className="font-bold text-bright-sun-700 dark:text-bright-sun-300">Discipline • Friendship • Teamwork • Respect • Excellence</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div {...fadeInUp} className="relative group lg:sticky lg:top-28">
                        <div className="absolute -inset-4 bg-bright-sun-600/10 dark:bg-bright-sun-300/10 blur-[80px] rounded-full hidden lg:block" />
                        <div className="relative rounded-[2.5rem] overflow-hidden border-[10px] border-gray-100 dark:border-cerulean-blue-900 shadow-2xl aspect-[4/3]">
                            <img src={instructionImageUrl} alt="Artistic gymnastics training" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* 2. Philosophy */}
        <section className={sectionShell}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="2.">Programme Philosophy</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        The Champions Artistic Gymnastics Programme is a{' '}
                        <strong className="text-cerulean-blue-900 dark:text-white">scientifically grounded, child-centered, and values-based development system</strong>{' '}
                        designed to:
                    </p>
                    <ul className="space-y-3 mb-8">
                        {[
                            'Build physical literacy as the foundation of all sports',
                            'Develop strong, confident, and healthy children',
                            'Promote lifelong participation in sport and physical activity',
                            'Integrate technical development with character education',
                        ].map((line) => (
                            <li key={line} className="flex items-start gap-3">
                                <IconCheck className="text-bright-sun-600 shrink-0 mt-0.5" size={20} />
                                <span className="text-gray-700 dark:text-gray-200">{line}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                        Artistic gymnastics is recognized as an <strong>early specialization sport</strong>, where fundamental skills must be introduced at a young
                        age to allow optimal long-term development.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">At The Champions Sports Academy, however, the approach remains:</p>
                    <blockquote className="border-l-4 border-bright-sun-500 pl-4 italic text-cerulean-blue-900 dark:text-white font-semibold">
                        “Early exposure, progressive development, and lifelong participation.”
                    </blockquote>
                </motion.div>
            </div>
        </section>

        {/* 3. Objectives */}
        <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="3.">Programme Objectives</SectionTitle>
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-black text-bright-sun-600 dark:text-bright-sun-300 mb-3 uppercase tracking-tight text-sm">Physical objectives</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                                <li>Develop strength, flexibility, balance, coordination, and agility</li>
                                <li>Improve posture, body control, and movement efficiency</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-black text-bright-sun-600 dark:text-bright-sun-300 mb-3 uppercase tracking-tight text-sm">Technical objectives</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                                <li>Build strong foundations in floor exercise</li>
                                <li>Progress safely to apparatus work (beam, bars, vault, rings)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-black text-bright-sun-600 dark:text-bright-sun-300 mb-3 uppercase tracking-tight text-sm">Educational objectives</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                                <li>Promote discipline, focus, and responsibility</li>
                                <li>Develop confidence and resilience</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-black text-bright-sun-600 dark:text-bright-sun-300 mb-3 uppercase tracking-tight text-sm">Health &amp; well-being objectives</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                                <li>Encourage active lifestyles</li>
                                <li>Support mental and emotional well-being through sport</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* 4. LTAD */}
        <section className={sectionShell}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="4.">Development Model (LTAD-Based)</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        The programme follows a <strong className="text-cerulean-blue-900 dark:text-white">Long-Term Athlete Development (LTAD)</strong> framework,
                        ensuring:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-200">
                        <li>Age-appropriate training</li>
                        <li>Progressive skill development</li>
                        <li>Athlete-centered coaching</li>
                        <li>Long-term success and sustainability</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-300 mb-10 italic border-l-4 border-bright-sun-500/50 pl-4">
                        LTAD provides clear pathways, structured progression, and athlete-centered planning.
                    </p>
                    <div className="space-y-6">
                        <StageCard
                            dotClass="bg-blue-500"
                            title="Stage 1: Active Start"
                            age="Ages 3–5"
                            focus={['Fun and safe movement exploration', 'Basic motor skills (running, jumping, rolling)']}
                            outcomes={['Enjoyment of physical activity', 'Confidence in movement']}
                        />
                        <StageCard
                            dotClass="bg-emerald-500"
                            title="Stage 2: Fundamentals"
                            age="Ages 6–8"
                            focus={['Basic gymnastics skills on floor', 'Coordination and flexibility development']}
                            outcomes={['Development of physical literacy', 'Introduction to simple apparatus']}
                        />
                        <StageCard
                            dotClass="bg-amber-400"
                            title="Stage 3: Learn to Train"
                            age="Ages 9–11"
                            focus={[
                                'Structured skill learning',
                                'Introduction to apparatus: Girls — Beam & Bars; Boys — Bars & strength-based elements',
                            ]}
                            outcomes={['Technical foundations', 'Body control and discipline']}
                        />
                        <StageCard
                            dotClass="bg-orange-500"
                            title="Stage 4: Train to Train"
                            age="Ages 12–14"
                            focus={['Strength and conditioning', 'Skill refinement and combinations']}
                            outcomes={['Improved performance capacity', 'Consistency in training']}
                        />
                        <StageCard
                            dotClass="bg-red-500"
                            title="Stage 5: Train to Perform"
                            age="Ages 15–17"
                            focus={['Advanced skills and routines', 'Optional competition pathway']}
                            outcomes={['Performance readiness', 'Leadership and mentoring']}
                        />
                    </div>
                </motion.div>
            </div>
        </section>

        {/* 5. Technical structure */}
        <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="5.">Technical Structure</SectionTitle>
                    <div className="mb-10">
                        <h3 className="text-lg font-black text-cerulean-blue-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-cerulean-blue-500" aria-hidden />
                            Core foundation (all children) — Floor exercise (primary focus)
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 mb-4">
                            <li>Fundamental movements</li>
                            <li>Safe landing techniques</li>
                            <li>Strength and flexibility development</li>
                        </ul>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">Floor remains the foundation of all training.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="rounded-2xl p-6 bg-white dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10">
                            <h3 className="font-black text-bright-sun-600 dark:text-bright-sun-300 mb-4">Girls (Women&apos;s Artistic Gymnastics)</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                                <li>Vault</li>
                                <li>Uneven bars</li>
                                <li>Balance beam</li>
                                <li>Floor exercise</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl p-6 bg-white dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10">
                            <h3 className="font-black text-bright-sun-600 dark:text-bright-sun-300 mb-4">Boys (Men&apos;s Artistic Gymnastics)</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                                <li>Floor exercise</li>
                                <li>Pommel horse</li>
                                <li>Rings</li>
                                <li>Vault</li>
                                <li>Parallel bars</li>
                                <li>Horizontal bar</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* 6. Coaching */}
        <section className={sectionShell}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="6.">Coaching Approach</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">The programme is:</p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                        {['Child-centered', 'Coach-driven', 'Science-informed', 'Values-integrated'].map((t) => (
                            <li key={t} className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-100">
                                <IconStar className="text-bright-sun-500 shrink-0" size={18} />
                                {t}
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">Coaches are responsible for:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                        <li>Ensuring safety and progression</li>
                        <li>Adapting training to each child</li>
                        <li>Promoting positive learning environments</li>
                    </ul>
                </motion.div>
            </div>
        </section>

        {/* 7. Assessment */}
        <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="7.">Assessment and Progression</SectionTitle>
                    <p className="font-black text-cerulean-blue-900 dark:text-white mb-4">Assessment system</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 mb-6">
                        <li>Conducted periodically (e.g., April assessment)</li>
                        <li>
                            Based on: technical skills (70%), attendance and engagement (30%)
                        </li>
                    </ul>
                    <p className="font-black text-cerulean-blue-900 dark:text-white mb-2">Assessment areas</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 mb-6">
                        <li>Floor exercise</li>
                        <li>Balance beam (girls)</li>
                    </ul>
                    <p className="font-black text-cerulean-blue-900 dark:text-white mb-2">Outcome</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                        <li>Individual progress report</li>
                        <li>Used for level grading and development planning</li>
                    </ul>
                </motion.div>
            </div>
        </section>

        {/* 8. Values */}
        <section className={sectionShell}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="8.">Integration of Values</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        At The Champions Sports Academy, gymnastics is not only technical training—it is <strong>education through sport</strong>.
                    </p>
                    <p className="font-black text-cerulean-blue-900 dark:text-white mb-4">Values in practice</p>
                    <ul className="space-y-3">
                        {[
                            ['Discipline', 'Commitment to training and effort'],
                            ['Friendship', 'Positive relationships and inclusion'],
                            ['Teamwork', 'Learning and growing together'],
                            ['Respect', 'For self, others, and rules'],
                            ['Excellence', 'Continuous improvement'],
                        ].map(([name, desc]) => (
                            <li key={name} className="flex flex-col sm:flex-row sm:gap-3 border-l-4 border-bright-sun-500/40 pl-4 py-1">
                                <span className="font-black text-bright-sun-600 dark:text-bright-sun-300 shrink-0">{name}:</span>
                                <span className="text-gray-700 dark:text-gray-200">{desc}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>

        {/* 9. Safety */}
        <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="9.">Safety and Well-Being</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">The programme prioritizes:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 mb-6">
                        <li>Safe learning environment</li>
                        <li>Age-appropriate progressions</li>
                        <li>Injury prevention</li>
                        <li>Emotional well-being</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-300">Parents are recognized as key partners in supporting children&apos;s development.</p>
                </motion.div>
            </div>
        </section>

        {/* 10. Impact */}
        <section className={sectionShell}>
            <div className={maxW}>
                <motion.div {...fadeInUp}>
                    <SectionTitle n="10.">Programme Impact</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">This programme contributes to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 mb-10">
                        <li>Development of physically literate children</li>
                        <li>Preparation for all sports</li>
                        <li>Creation of healthy and confident individuals</li>
                        <li>Long-term participation in sport and life</li>
                    </ul>
                    <blockquote className="text-center text-lg md:text-xl font-medium italic text-cerulean-blue-900 dark:text-white leading-relaxed border-y border-bright-sun-500/30 py-8 px-4">
                        The Champions Artistic Gymnastics Programme is a structured, values-driven, and scientifically grounded system that develops children into
                        strong, confident, and disciplined individuals—Champions in Sport and in Life.
                    </blockquote>
                </motion.div>
            </div>
        </section>
    </>
);
