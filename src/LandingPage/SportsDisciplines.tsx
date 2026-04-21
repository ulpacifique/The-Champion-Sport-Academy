import { useState, useEffect, useRef } from "react";
import {
    IconActivity,
    IconShield,
    IconCertificate,
    IconCalendarEvent,
    IconUsers,
    IconTrophy,
    IconMedal,
    IconStar,
    IconClipboardList,
    IconHeart,
    IconRun,
    IconBarbell,
    IconChartBar,
    IconCircleCheck,
    IconBulb,
} from "@tabler/icons-react";

/** Core Services — aligned with CSA flyer (icon + title + short description). */
type PortfolioService = {
    n: number;
    title: string;
    description: string;
    icon: typeof IconActivity;
};

const portfolioServices: PortfolioService[] = [
    {
        n: 1,
        title: "Children & Youth Development through Sport & Physical Literacy",
        description:
            "Structured programmes for children and youth (ages 3–17), developing physical, technical, and life skills.",
        icon: IconRun,
    },
    {
        n: 2,
        title: "Sport Programmes Design & Management",
        description:
            "Professional design, implementation, and management of sport programmes for schools, institutions, and federations.",
        icon: IconClipboardList,
    },
    {
        n: 3,
        title: "Sport Events Organization & Management",
        description:
            "Planning and delivery of competitions, camps, and sport events at local, national, and international levels.",
        icon: IconCalendarEvent,
    },
    {
        n: 4,
        title: "Coaching Programmes & Consultancy in Sport, Social Change and Well-being",
        description:
            "Development of coaches, sport systems, and communities through coaching education, consultancy, mental health, and well-being programmes that use sport as a tool for social impact.",
        icon: IconHeart,
    },
    {
        n: 5,
        title: "Sport Equipment Supply & Development",
        description:
            "Provision and development of sport equipment with a focus on scalable solutions and Made in Rwanda production.",
        icon: IconBarbell,
    },
];

const integrationFlow = [
    "Children & youth development → foundation for lifelong participation",
    "Programme design & management → institutional and federation reach",
    "Events → visibility, talent, and partnerships",
    "Coaching & well-being → social impact and healthy systems",
    "Equipment → access and Made in Rwanda growth",
];

const WHAT_WE_DO_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/${encodeURIComponent("what we do.mp4")}`;

const competitiveAdvantageBullets = [
    "Strong leadership expertise (international coaching, Olympic education, social work in sport)",
    "Proven impact and credibility in Rwanda",
    "Unique integration of: Sport + Education + Well-being; Grassroots + System Development",
    "Alignment with: Olympic values; LTAD frameworks; National and global sport policies",
];

const IMPACT_NUMBERS: { count: string; label: string; icon: typeof IconUsers }[] = [
    { count: "4,300+", label: "Children & Youth Reached", icon: IconUsers },
    { count: "10,000+", label: "Indirect Beneficiaries", icon: IconChartBar },
    { count: "600+", label: "Coaches Trained & Mentored", icon: IconCertificate },
    { count: "223+", label: "Medals Won", icon: IconMedal },
    { count: "18", label: "Trophies Won", icon: IconTrophy },
];

const KEY_ACHIEVEMENT_LINES = [
    "Recognized as a reference academy in Rwanda for youth sport development and coaching excellence",
    "Developed athletes progressing to national teams and high-performance pathways",
    "Successfully organized national competitions, training camps, and major sport events",
    "Contributed to the professionalization of coaching through structured education and certification initiatives",
    "Expanded into a multi-sport academy, integrating karate, gymnastics, and physical literacy",
    "Built strong collaborations with clubs, schools, federations, and international partners",
];

const CONTRIBUTION_BULLETS = [
    "Strengthen youth development pathways and talent identification systems",
    "Promote health, well-being, and values-based education",
    "Enhance coaching capacity and sport programme quality",
    "Support national sport development and economic growth through sport",
];

const INSPIRATION_FOUNDATION_PARAGRAPHS: string[] = [
    "The Champions Sports Academy Ltd was inspired by a transformative experience in 2017 at the Cycle International du Sport d'Élite (CISéL) at Sports Academy Lausanne, made possible through an Olympic Solidarity Scholarship awarded by the International Olympic Committee to Noël Nkuranyabahizi.",
    "This international exposure shaped a vision grounded in excellence, discipline, and impact, and revealed a critical gap in Rwanda—the insufficient presence of an integrated pathway linking youth development, athlete performance, and coach education.",
    "During this experience, Dr. Hicham Montasser, Director of Sports Academy Lausanne, recognized Noël's consistency, commitment, and impactful work behind the scenes, describing him as a “bosseur de l'ombre”. This recognition further reinforced a leadership philosophy centered on dedication, humility, and meaningful impact, and strengthened the ambition to transform knowledge into action.",
    "In response, the Academy was founded in 2017 and evolved into The Champions Sports Academy Ltd—a sports business and social impact company committed to developing youth, enhancing performance, professionalizing coaches, using sport as a tool for positive social change, and ensuring long-term sustainability through a structured business model.",
    "Today, the Academy stands as an integrated multi-sport institution, capable of translating vision into concrete and sustainable results that generate both social and economic impact.",
];

const SportsDisciplines = () => {
    const [animate, setAnimate] = useState(false);
    const heroVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const video = heroVideoRef.current;
        if (!video) return;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        const play = () => video.play().catch(() => {});
        play();
        video.addEventListener("canplay", play);
        return () => video.removeEventListener("canplay", play);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 pt-20 pb-16 sm:pt-4 sm:pb-20 transition-colors duration-300">
            {/* Hero — What We Do (top); row: Academy (left) | video | Core Services (right) */}
            <section className="relative mb-10 overflow-hidden px-4 sm:px-6 md:mb-12">
                <div className="rounded-[2rem] border border-gray-200 bg-gray-100/90 px-3 py-6 shadow-md dark:border-cerulean-blue-700/60 dark:bg-cerulean-blue-900/90 sm:py-8 md:py-10">
                    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:gap-10">
                       

                        <div
                            className={`grid w-full items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 lg:gap-10 ${animate ? "opacity-100" : "opacity-0"}`}
                        >
                            <h2
                                className={`order-1 text-balance text-center text-lg font-black uppercase italic leading-snug tracking-tight text-cerulean-blue-900 md:text-right md:text-xl md:leading-tight lg:text-2xl xl:text-3xl dark:text-white transition-all duration-1000 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                            >
                                The Champions Sports Academy
                            </h2>

                            <div
                                className="relative order-2 mx-auto w-full max-w-[min(92vw,380px)] shrink-0 aspect-[10/11] overflow-hidden rounded-[2rem] border-2 border-cerulean-blue-200 shadow-lg shadow-cerulean-blue-900/10 dark:border-white/35 dark:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.35)] md:mx-0"
                            >
                                <video
                                    ref={heroVideoRef}
                                    src={WHAT_WE_DO_VIDEO_SRC}
                                    className="h-full w-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    autoPlay
                                    preload="auto"
                                    aria-hidden
                                />
                            </div>

                            <h2
                                className={`order-3 text-balance text-center text-lg font-black uppercase italic leading-snug tracking-tight text-bright-sun-600 md:text-left md:text-xl md:leading-tight lg:text-2xl xl:text-3xl dark:text-bright-sun-300 transition-all duration-1000 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                            >
                                Core Services Portfolio
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services — flyer-aligned copy */}
            <div className="container mx-auto px-4 max-w-3xl mb-12 text-center">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 dark:text-white md:text-4xl">
                    Core <span className="text-bright-sun-600 dark:text-bright-sun-300">Services</span>
                </h2>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    The Champions Sports Academy
                </p>
            </div>
            <div className="container mx-auto px-4 max-w-5xl space-y-6 mb-14 md:mb-16">
                {portfolioServices.map((service) => (
                    <article
                        key={service.n}
                        className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-cerulean-blue-700/50 dark:bg-cerulean-blue-900/30 dark:shadow-none"
                    >
                        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cerulean-blue-200/90 bg-cerulean-blue-50/80 dark:border-cerulean-blue-600/45 dark:bg-cerulean-blue-800/35">
                                <service.icon className="text-bright-sun-600 dark:text-bright-sun-300" size={28} stroke={1.75} />
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-bright-sun-600 dark:text-bright-sun-400">
                                    Service {service.n}
                                </p>
                                <h3 className="mt-1 text-lg font-black leading-snug text-cerulean-blue-900 dark:text-white md:text-xl">
                                    {service.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Our Inspiration & Foundation */}
            <div className="container mx-auto max-w-4xl px-4 pb-14 md:pb-16">
                <section className="rounded-[3rem] border-2 border-bright-sun-500 bg-gradient-to-br from-bright-sun-50/80 to-white p-8 shadow-sm dark:border-bright-sun-400 dark:from-cerulean-blue-900/50 dark:to-cerulean-blue-800/25 md:p-12 lg:p-14">
                    <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
                        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-bright-sun-400/60 bg-bright-sun-500/10 dark:border-bright-sun-400 dark:bg-bright-sun-400/10">
                            <IconBulb className="text-bright-sun-600 dark:text-bright-sun-300" size={36} stroke={1.5} aria-hidden />
                        </div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-bright-sun-600 dark:text-bright-sun-300 md:text-4xl lg:text-5xl">
                            Our journey
                        </h1>
                    </div>
                    <div className="space-y-5 text-left text-sm leading-relaxed text-gray-700 dark:text-gray-200 md:space-y-6 md:text-base">
                        {INSPIRATION_FOUNDATION_PARAGRAPHS.map((para, i) => (
                            <p key={i} className="text-pretty first:mt-0">
                                {para}
                            </p>
                        ))}
                    </div>
                </section>
            </div>

            {/* Our Impact in Numbers, Key Achievements, Our Contribution */}
            <div className="container mx-auto max-w-5xl space-y-14 px-4 pt-0 pb-14 md:space-y-20 md:pb-16">
                <section className="relative overflow-hidden rounded-[3rem] border-2 border-bright-sun-500 bg-gray-50 p-8 shadow-sm dark:border-bright-sun-400 dark:bg-cerulean-blue-900/40 dark:shadow-none md:p-12 lg:p-14">
                    <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-bright-sun-600/5 blur-3xl dark:bg-bright-sun-300/5" aria-hidden />
                    <h2 className="mb-10 flex flex-wrap items-center justify-center gap-3 text-center text-2xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 dark:text-white md:text-4xl">
                        <span className="text-3xl md:text-4xl" aria-hidden>
                            🔷
                        </span>
                        Our Impact in Numbers
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {IMPACT_NUMBERS.map((row, index) => (
                            <div
                                key={row.label}
                                className={`group rounded-3xl border-2 border-bright-sun-500 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg dark:border-bright-sun-400 dark:bg-cerulean-blue-800/40 ${animate ? "opacity-100" : "opacity-0"}`}
                                style={{ animationDelay: `${400 + index * 80}ms` }}
                            >
                                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 shadow-inner transition-transform group-hover:scale-105 dark:bg-cerulean-blue-900/50">
                                    <row.icon className="text-bright-sun-600 dark:text-bright-sun-300" size={30} stroke={1.75} />
                                </div>
                                <div className="mb-2 text-3xl font-black italic tracking-tighter text-cerulean-blue-900 dark:text-white md:text-4xl">
                                    {row.count}
                                </div>
                                <div className="text-[11px] font-bold uppercase leading-snug tracking-wider text-gray-500 dark:text-gray-400">{row.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[3rem] border-2 border-bright-sun-500 bg-white p-8 shadow-sm dark:border-bright-sun-400 dark:bg-cerulean-blue-800/30 md:p-12 lg:p-14">
                    <h2 className="mb-8 flex flex-wrap items-center gap-3 text-2xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 dark:text-white md:text-3xl">
                        <span className="text-3xl" aria-hidden>
                            🔷
                        </span>
                        Key Achievements
                    </h2>
                    <ul className="space-y-4 text-left">
                        {KEY_ACHIEVEMENT_LINES.map((line) => (
                            <li key={line} className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200 md:text-base">
                                <IconCircleCheck className="mt-1 shrink-0 text-bright-sun-600 dark:text-bright-sun-400" size={22} stroke={1.75} aria-hidden />
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="rounded-[3rem] border-2 border-bright-sun-500 bg-gray-50/80 p-8 dark:border-bright-sun-400 dark:bg-cerulean-blue-900/35 md:p-12 lg:p-14">
                    <h2 className="mb-6 flex flex-wrap items-center gap-3 text-2xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 dark:text-white md:text-3xl">
                        <span className="text-3xl" aria-hidden>
                            🔷
                        </span>
                        Our Contribution
                    </h2>
                    <p className="mb-6 text-base font-semibold text-cerulean-blue-900 dark:text-white md:text-lg">Through our programmes and services, we:</p>
                    <ul className="space-y-4 text-left">
                        {CONTRIBUTION_BULLETS.map((line) => (
                            <li key={line} className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200 md:text-base">
                                <IconCircleCheck className="mt-1 shrink-0 text-bright-sun-600 dark:text-bright-sun-400" size={22} stroke={1.75} aria-hidden />
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Our Commitment */}
            <div className="container mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-20">
                <div
                    className={`rounded-[3.5rem] border-2 border-bright-sun-500 bg-white p-12 text-center shadow-2xl transition-all duration-1000 dark:border-bright-sun-400 dark:bg-cerulean-blue-800 md:p-24 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-bright-sun-100 dark:bg-white/10 rounded-3xl mb-12 border border-bright-sun-200 dark:border-white/20 shadow-inner">
                            <IconShield className="text-bright-sun-600 dark:text-bright-sun-300" size={48} />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-8 uppercase italic tracking-tighter">Our Commitment</h2>

                        <p className="text-gray-600 dark:text-gray-200 text-xl md:text-2xl font-medium mb-16 leading-relaxed text-balance">
                        Our work aligns with SDG 3 (Good Health and Well-being), SDG 4 (Quality Education), and SDG 8 (Decent Work and Economic Growth), contributing to Rwanda’s Vision 2050 by promoting health, delivering values-based education, and positioning sport as a driver of economic development and sustainable business growth.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { name: "Professionalism", icon: IconStar },
                                { name: "Safeguarding", icon: IconShield },
                                { name: "Inclusion", icon: IconUsers },
                                { name: "Excellence", icon: IconTrophy },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className="rounded-3xl border-2 border-bright-sun-500 bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:scale-105 group cursor-pointer dark:border-bright-sun-400 dark:bg-white/5"
                                >
                                    <item.icon className="text-bright-sun-600 dark:text-bright-sun-300 mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                                    <div className="text-cerulean-blue-900 dark:text-white font-black uppercase tracking-widest text-xs">{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsDisciplines;
