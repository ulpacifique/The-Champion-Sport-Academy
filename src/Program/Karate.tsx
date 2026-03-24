import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
    IconMapPin,
    IconStar,
    IconCheck,
    IconShield,
    IconWorld,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Header from '../Header/Header';

const KARATE_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/karate.mp4`;
const CLASS_IMAGE_SRC = `${import.meta.env.BASE_URL}athletes/Class.jpg`;

const Karate = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
    };

    const sectionShell = 'py-16 md:py-24 px-4 md:px-8 lg:px-16';
    const maxW = 'max-w-5xl mx-auto';

    const SectionTitle = ({ n, children }: { n: string; children: ReactNode }) => (
        <h2 className="text-2xl md:text-4xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-6 md:mb-8 border-l-4 border-bright-sun-500 pl-4 md:pl-6">
            <span className="text-bright-sun-600 dark:text-bright-sun-400 not-italic mr-2">{n}</span>
            {children}
        </h2>
    );

    return (
        <div className="bg-white dark:bg-cerulean-blue-900 text-cerulean-blue-900 dark:text-white selection:bg-bright-sun-300 selection:text-gray-900 custom-scrollbar transition-colors duration-300">
            <Header />

            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-white/50 dark:bg-cerulean-blue-900/70 z-10" />
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}athletes/karate1.jpeg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="relative z-20 max-w-7xl mx-auto w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight uppercase tracking-tighter decoration-bright-sun-600 dark:decoration-bright-sun-300 underline underline-offset-[20px] decoration-8">
                            Champions Karate
                            <span className="text-bright-sun-600 dark:text-bright-sun-300 italic"> for Life Programme</span>
                        </h1>
                        <div className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs">
                            <IconShield size={16} />
                            <span>Building champions in sport and life through discipline, physical literacy, and excellence</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <main>
                {/* 2. Programme overview + portrait video */}
                <section className={`${sectionShell} relative overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]`}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-bright-sun-600/5 dark:bg-bright-sun-300/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="max-w-7xl mx-auto">
                        <motion.div {...fadeInUp} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
                                <div className="absolute -inset-4 bg-bright-sun-600/10 dark:bg-bright-sun-300/10 blur-[80px] rounded-full lg:block hidden" />
                                <div className="relative w-full max-w-[min(100%,22rem)] sm:max-w-sm">
                                    <div className="rounded-[2rem] overflow-hidden border-[10px] border-gray-50 dark:border-cerulean-blue-900 shadow-2xl bg-black aspect-[9/16] max-h-[min(85vh,720px)]">
                                        <video
                                            className="w-full h-full object-cover"
                                            src={KARATE_VIDEO_SRC}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="metadata"
                                            aria-label="Karate training at The Champions Sports Academy"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <SectionTitle n="2.">Programme Overview</SectionTitle>
                                <h3 className="text-xl font-black text-bright-sun-600 dark:text-bright-sun-300 mb-4 uppercase tracking-tight">Who We Are</h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-medium">
                                    The Champions Sports Academy Karate Programme is a long-term development pathway designed for children, youth, and adults to grow in:
                                </p>
                                <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200 font-semibold mb-6">
                                    <li>Physical literacy</li>
                                    <li>Karate skills (Kihon, Kata, Kumite)</li>
                                    <li>The Champions Values</li>
                                </ol>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-bright-sun-500/50 pl-4">
                                    Built on international coaching standards and Olympic values, the programme supports both recreational participation and competitive excellence.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 3. Philosophy — text left, Class.jpg right */}
                <section className={sectionShell}>
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center"
                        >
                            <div className="min-w-0">
                                <SectionTitle n="3.">Our Philosophy</SectionTitle>
                                <h3 className="text-xl md:text-2xl font-black text-cerulean-blue-900 dark:text-white mb-6">Karate for Sport and Life</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">At The Champions Sports Academy, karate is:</p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        'A martial art (self-defense and discipline)',
                                        'A sport (performance and competition)',
                                        'A tool for education (values and life skills)',
                                    ].map((line) => (
                                        <li key={line} className="flex items-start gap-3">
                                            <IconCheck className="text-bright-sun-600 dark:text-bright-sun-300 shrink-0 mt-1" size={20} />
                                            <span className="text-gray-700 dark:text-gray-200">{line}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 font-medium">We follow a child-centered and long-term approach, respecting:</p>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                                    <li>— Growth and development</li>
                                    <li>— Individual differences</li>
                                    <li>— Safety and well-being</li>
                                </ul>
                            </div>
                            <div className="w-full max-w-xl mx-auto lg:max-w-none lg:justify-self-end">
                                <div className="relative rounded-[2rem] overflow-hidden border-[10px] border-gray-100 dark:border-cerulean-blue-900/80 shadow-2xl aspect-[4/3] bg-gray-100 dark:bg-black/20">
                                    <img
                                        src={CLASS_IMAGE_SRC}
                                        alt="Karate class at The Champions Sports Academy"
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 4. Core values */}
                <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
                    <div className="max-w-7xl mx-auto">
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="4.">Our Core Values</SectionTitle>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: 'Discipline', text: 'Commitment to training and respect for rules', icon: <IconStar size={22} /> },
                                    { title: 'Friendship', text: 'Building positive relationships through sport', icon: <IconStar size={22} /> },
                                    { title: 'Teamwork', text: 'Supporting each other and growing together', icon: <IconStar size={22} /> },
                                    { title: 'Respect', text: 'Respect for self, others, and the dojo', icon: <IconStar size={22} /> },
                                    { title: 'Excellence', text: 'Striving for continuous improvement', icon: <IconStar size={22} /> },
                                ].map((v) => (
                                    <div
                                        key={v.title}
                                        className="p-6 md:p-8 rounded-2xl bg-white dark:bg-cerulean-blue-900/50 border border-gray-100 dark:border-white/10 shadow-sm"
                                    >
                                        <div className="flex items-center gap-2 text-bright-sun-600 dark:text-bright-sun-300 mb-3">
                                            {v.icon}
                                            <h3 className="text-lg font-black uppercase italic tracking-tight">{v.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{v.text}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 5. LTAD */}
                <section className={sectionShell}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="5.">Programme Structure (LTAD Model)</SectionTitle>
                            <h3 className="text-lg font-black mb-4 text-bright-sun-600 dark:text-bright-sun-300 uppercase tracking-wide">Development Stages</h3>
                            <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-gray-700 dark:text-gray-200">
                                {[
                                    'Active Start (Under 6)',
                                    'FUNdamentals (6–9)',
                                    'Learn to Train (8–12)',
                                    'Train to Train (11–16)',
                                    'Train to Compete (15–18)',
                                    'Train to Perform (18+)',
                                    'Active for Life (All ages)',
                                ].map((s) => (
                                    <li key={s} className="flex items-center gap-2">
                                        <IconCheck className="text-bright-sun-600 shrink-0" size={18} />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                            <p className="font-semibold text-cerulean-blue-900 dark:text-white">
                                Each child progresses based on development, not only age.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 6. Streams */}
                <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="6.">Programme Streams</SectionTitle>
                            <div className="space-y-8">
                                {[
                                    {
                                        title: 'Beginner Programme (Ages 4–8)',
                                        items: ['Fun and movement-based karate', 'Discipline and coordination'],
                                    },
                                    {
                                        title: 'Development Programme (Ages 8–13)',
                                        items: ['Technical learning', 'Belt progression', 'Physical literacy'],
                                    },
                                    {
                                        title: 'Youth Competitive Programme (Ages 12–17)',
                                        items: ['Kata & kumite specialization', 'Competition preparation'],
                                    },
                                    {
                                        title: 'Karate for Life Programme (All Ages)',
                                        items: ['Fitness, self-defense, and well-being'],
                                    },
                                    {
                                        title: 'Elite Performance Programme (Selected Athletes)',
                                        items: ['National & international preparation'],
                                    },
                                ].map((block) => (
                                    <div key={block.title} className="border-l-4 border-bright-sun-500 pl-4">
                                        <h3 className="text-lg font-black uppercase italic tracking-tight mb-2">{block.title}</h3>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                                            {block.items.map((i) => (
                                                <li key={i}>{i}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 7. Technical */}
                <section className={sectionShell}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="7.">Technical Areas of Training</SectionTitle>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { h: 'Kihon (Fundamentals)', p: 'Stances, punches, kicks, blocks' },
                                    { h: 'Kata (Forms)', p: 'Technique, rhythm, and expression' },
                                    { h: 'Kumite (Sparring)', p: 'Timing, distance, and strategy' },
                                    { h: 'Bunkai (Application)', p: 'Self-defense and understanding' },
                                ].map((t) => (
                                    <div key={t.h}>
                                        <h3 className="font-black text-bright-sun-600 dark:text-bright-sun-300 mb-2">{t.h}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{t.p}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 8. Belt system */}
                <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="8.">Belt System</SectionTitle>
                            <h3 className="font-black mb-3">Progression Path</h3>
                            <p className="text-gray-700 dark:text-gray-200 mb-8 font-medium">
                                White → Yellow → Orange → Green → Blue → Brown → Black
                            </p>
                            <h3 className="font-black mb-3">Evaluation Criteria</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Technique</li>
                                <li>Discipline and attitude</li>
                                <li>Effort and attendance</li>
                                <li>Knowledge and understanding</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 9. Weekly training */}
                <section className={sectionShell}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="9.">Weekly Training Structure</SectionTitle>
                            <div className="space-y-6">
                                {[
                                    { age: 'Ages 3–7', detail: '2 sessions/week (2 hours) — Fun and karate literacy' },
                                    { age: 'Ages 8–12', detail: '2 sessions/week (120 min)' },
                                    { age: 'Ages 12–17', detail: '3 sessions/week (120 min)' },
                                    { age: 'Competitive Athletes', detail: '4 sessions/week + conditioning' },
                                ].map((row) => (
                                    <div key={row.age} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-6 rounded-2xl bg-white dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10">
                                        <span className="font-black text-cerulean-blue-900 dark:text-white uppercase italic">{row.age}</span>
                                        <span className="text-gray-600 dark:text-gray-300 font-medium">{row.detail}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 10. Competition */}
                <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="10.">Competition Pathway</SectionTitle>
                            <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-200">
                                <li>— Development-focused competitions</li>
                                <li>— National and international opportunities</li>
                                <li>— Selection based on readiness and behavior</li>
                            </ul>
                            <p className="text-gray-600 dark:text-gray-300 italic border-l-4 border-bright-sun-500/60 pl-4">
                                Competition supports development — it does not replace training.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 11. Physical prep */}
                <section className={sectionShell}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="11.">Physical Preparation</SectionTitle>
                            <ul className="space-y-2 mb-4 text-gray-700 dark:text-gray-200">
                                <li>— Strength and conditioning</li>
                                <li>— Flexibility and mobility</li>
                                <li>— Speed and coordination</li>
                            </ul>
                            <p className="text-gray-600 dark:text-gray-300">Integrated with physical literacy programme.</p>
                        </motion.div>
                    </div>
                </section>

                {/* 12. Coaching */}
                <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="12.">Coaching Excellence</SectionTitle>
                            <div className="mb-8 p-6 md:p-8 rounded-2xl bg-cerulean-blue-900 dark:bg-white/5 text-white border border-white/10">
                                <p className="text-bright-sun-300 font-black text-sm uppercase tracking-widest mb-2">Led by</p>
                                <p className="text-2xl md:text-3xl font-black italic mb-2">Noël Nkuranyabahizi</p>
                                <ul className="text-cerulean-blue-100 space-y-1 text-sm md:text-base">
                                    <li>International Elite Sports Coach</li>
                                    <li>4th Dan Black Belt</li>
                                    <li>Former Rwanda National Team Head Coach</li>
                                </ul>
                            </div>
                            <h3 className="font-black mb-3">Coaching Approach</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Certified and educated coaches</li>
                                <li>Safe sport principles</li>
                                <li>Individual development focus</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 13. Safety */}
                <section className={sectionShell}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="13.">Safety &amp; Well-Being</SectionTitle>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                                <li>— Safe training environment</li>
                                <li>— Injury prevention</li>
                                <li>— Child protection policies</li>
                                <li>— Positive coaching methods</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 14. Parents */}
                <section className={`${sectionShell} bg-gray-50/50 dark:bg-white/[0.02]`}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="14.">Parent Information</SectionTitle>
                            <p className="text-gray-700 dark:text-gray-200 mb-6 font-medium">Parents are key partners in development.</p>
                            <p className="text-sm font-black uppercase tracking-widest text-bright-sun-600 dark:text-bright-sun-300 mb-3">We provide</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Progress reports</li>
                                <li>Communication and updates</li>
                                <li>Education on child development in sport</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 15. Why us */}
                <section className={sectionShell}>
                    <div className={maxW}>
                        <motion.div {...fadeInUp}>
                            <SectionTitle n="15.">Why Choose Us</SectionTitle>
                            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200 font-medium">
                                <li>Structured international programme (LTAD)</li>
                                <li>Values-based education</li>
                                <li>Experienced and certified coaches</li>
                                <li>Integration of physical literacy</li>
                                <li>Pathway from beginner to elite</li>
                                <li>Focus on lifelong development</li>
                            </ol>
                        </motion.div>
                    </div>
                </section>

                {/* 16. CTA */}
                <section className={`${sectionShell} pb-32`}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto bg-bright-sun-400 dark:bg-bright-sun-300 rounded-[3rem] p-12 md:p-20 text-center text-gray-900 shadow-[0_40px_100px_rgba(250,204,21,0.25)] relative overflow-hidden"
                    >
                        <SectionTitle n="16.">Call to Action</SectionTitle>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase italic tracking-tighter">
                            Join The Champions Karate Programme Today
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                            <Link
                                to="/register"
                                className="px-10 py-5 bg-cerulean-blue-900 text-white rounded-2xl font-black text-lg hover:scale-[1.02] transition-all shadow-xl uppercase italic"
                            >
                                Register Now
                            </Link>
                            <Link
                                to="/contact"
                                className="px-10 py-5 bg-white/40 backdrop-blur rounded-2xl font-black text-lg border border-cerulean-blue-900/20 hover:bg-white/60 transition-all uppercase italic"
                            >
                                Contact Us
                            </Link>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cerulean-blue-900 font-bold text-sm md:text-base">
                            <span className="inline-flex items-center gap-2">
                                <IconMapPin size={20} />
                                Kigali, Rwanda
                            </span>
                            <a
                                href="https://thechampions250.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:underline"
                            >
                                <IconWorld size={20} />
                                thechampions250.com
                            </a>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
};

export default Karate;
