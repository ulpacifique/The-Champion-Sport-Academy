import { useState, useEffect, useRef } from "react";
import {
    IconActivity,
    IconArrowRight,
    IconShield,
    IconCertificate,
    IconCalendarEvent,
    IconUsers,
    IconTrophy,
    IconMedal,
    IconAward,
    IconStar,
    IconClipboardList,
    IconHeart,
    IconRun,
    IconBarbell,
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

    const achievements = [
        { title: "National Champions", count: "15", icon: IconTrophy },
        { title: "International Awards", count: "8", icon: IconAward },
        { title: "Certified Coaches", count: "25+", icon: IconCertificate },
        { title: "Community Events", count: "50+", icon: IconMedal },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 pt-20 pb-16 sm:pt-4 sm:pb-20 transition-colors duration-300">
            {/* Hero — What We Do (top); row: Academy (left) | video | Core Services (right) */}
            <section className="relative mb-10 overflow-hidden px-4 sm:px-6 md:mb-12">
                <div className="rounded-[2rem] bg-gray-100/90 dark:bg-cerulean-blue-900/90 px-3 py-6 sm:py-8 md:py-10">
                    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:gap-10">
                        <div
                            className={`inline-flex items-center space-x-2 bg-bright-sun-600/15 dark:bg-bright-sun-300/25 text-bright-sun-700 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/25 dark:border-bright-sun-300/35 font-black uppercase tracking-widest text-xs transition-all duration-700 backdrop-blur-sm ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                        >
                            <IconActivity size={16} />
                            <span>What We Do</span>
                        </div>

                        <div
                            className={`grid w-full items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 lg:gap-10 ${animate ? "opacity-100" : "opacity-0"}`}
                        >
                            <h1
                                className={`order-1 text-balance text-center text-lg font-black uppercase italic leading-snug tracking-tight text-cerulean-blue-900 md:text-right md:text-xl md:leading-tight lg:text-2xl xl:text-3xl dark:text-white transition-all duration-1000 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                            >
                                The Champions Sports Academy
                            </h1>

                            <div
                                className="relative order-2 mx-auto w-full max-w-[min(92vw,380px)] shrink-0 aspect-[9/16] overflow-hidden rounded-[2rem] shadow-[0_25px_80px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/40 dark:ring-white/10 md:mx-0"
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
                        className="relative overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-cerulean-blue-900/30 dark:shadow-none"
                    >
                        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-bright-sun-500/40 bg-bright-sun-500/10 dark:border-bright-sun-400/50 dark:bg-bright-sun-500/15">
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

            {/* Integrated Strategic Positioning */}
            <div className="container mx-auto px-4 max-w-5xl mb-12 md:mb-14">
                <div className="rounded-[2rem] border border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-cerulean-blue-900/40 p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter text-center mb-2">
                        Integrated Strategic Positioning
                    </h2>
                    <p className="text-center text-sm font-black uppercase tracking-widest text-bright-sun-600 dark:text-bright-sun-400 mb-10">
                        How the Services Work Together
                    </p>
                    <ul className="space-y-4 max-w-3xl mx-auto">
                        {integrationFlow.map((line) => (
                            <li
                                key={line}
                                className="flex items-start gap-3 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-cerulean-blue-800/30 px-4 py-3 text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium"
                            >
                                <IconArrowRight className="shrink-0 text-bright-sun-600 dark:text-bright-sun-400 mt-0.5" size={20} />
                                {line}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Competitive Advantage */}
            <div className="container mx-auto px-4 max-w-5xl mb-12 md:mb-14">
                <h2 className="text-2xl md:text-4xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter text-center mb-10">
                    Competitive Advantage of{" "}
                    <span className="text-bright-sun-600 dark:text-bright-sun-300">The Champions Sports Academy</span>
                </h2>
                <ul className="space-y-4">
                    {competitiveAdvantageBullets.map((line) => (
                        <li
                            key={line}
                            className="flex gap-3 text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-bright-sun-500 pl-4 py-1"
                        >
                            <span className="font-medium">{line}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Final Strategic Statement */}
            <div className="container mx-auto px-4 max-w-5xl mb-8 md:mb-10">
                <div className="rounded-[2rem] border-2 border-bright-sun-500/30 bg-gradient-to-br from-bright-sun-50/90 to-white dark:from-cerulean-blue-800/60 dark:to-cerulean-blue-900/80 p-8 md:p-12 text-center shadow-lg dark:shadow-none">
                    <p className="text-xs font-black uppercase tracking-widest text-bright-sun-700 dark:text-bright-sun-300 mb-4">
                        For Investors &amp; Board
                    </p>
                    <h2 className="text-xl md:text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tight mb-6 leading-snug">
                        Final Strategic Statement
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        The Champions Sports Academy operates as a <strong className="text-cerulean-blue-900 dark:text-white">hybrid sport enterprise</strong> that combines:
                    </p>
                    <ul className="text-left max-w-2xl mx-auto space-y-2 text-gray-700 dark:text-gray-300 mb-8 text-sm md:text-base">
                        <li className="flex gap-2">
                            <span className="text-bright-sun-600">•</span>
                            High-impact youth development programmes (social value)
                        </li>
                        <li className="flex gap-2">
                            <span className="text-bright-sun-600">•</span>
                            Professional sport services and consultancy (high-margin revenue)
                        </li>
                        <li className="flex gap-2">
                            <span className="text-bright-sun-600">•</span>
                            Events and equipment business (scalable commercial growth)
                        </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        This integrated model ensures:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Financial sustainability", "National relevance", "Regional and international scalability"].map((t) => (
                            <span
                                key={t}
                                className="inline-block rounded-full border border-bright-sun-500/40 bg-bright-sun-100/80 dark:bg-bright-sun-900/20 px-4 py-2 text-xs font-black uppercase tracking-wider text-cerulean-blue-900 dark:text-white"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div className="container mx-auto px-4 pt-10 pb-14 md:pt-12 md:pb-16">
                <div className="bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-sm dark:shadow-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bright-sun-600/5 dark:bg-bright-sun-300/5 blur-3xl -z-10"></div>

                    <div className="text-center mb-8 md:mb-10">
                        <div className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs">
                            <IconTrophy size={16} />
                            <span>Milestones</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white mb-6 uppercase italic tracking-tighter">Our Achievements</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-wide">
                            Impact that speaks for itself.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((achievement, index) => (
                            <div
                                key={achievement.title}
                                className={`bg-white dark:bg-cerulean-blue-800/40 border border-gray-100 dark:border-white/10 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-[1.05] hover:shadow-xl shadow-sm dark:shadow-none group ${animate ? "opacity-100" : "opacity-0"}`}
                                style={{ animationDelay: `${1000 + index * 200}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 dark:bg-cerulean-blue-900/50 rounded-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                                    <achievement.icon className="text-bright-sun-600 dark:text-bright-sun-300" size={40} />
                                </div>
                                <div className="text-5xl font-black text-cerulean-blue-900 dark:text-white mb-3 italic tracking-tighter">{achievement.count}</div>
                                <div className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">{achievement.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Commitment */}
            <div className="container mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-20">
                <div
                    className={`bg-white dark:bg-cerulean-blue-800 border border-gray-100 dark:border-white/10 rounded-[3.5rem] p-12 md:p-24 text-center transition-all duration-1000 shadow-2xl ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-bright-sun-100 dark:bg-white/10 rounded-3xl mb-12 border border-bright-sun-200 dark:border-white/20 shadow-inner">
                            <IconShield className="text-bright-sun-600 dark:text-bright-sun-300" size={48} />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-8 uppercase italic tracking-tighter">Our Commitment</h2>

                        <p className="text-gray-600 dark:text-gray-200 text-xl md:text-2xl font-medium mb-16 leading-relaxed">
                            At The Champions Sports Academy, we believe sport is more than competition. It is an educational and social force that shapes healthier individuals and stronger communities.
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
                                    className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300 group cursor-pointer shadow-sm"
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
