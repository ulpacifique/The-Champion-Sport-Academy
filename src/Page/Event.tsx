import { motion } from "framer-motion";
import {
    IconCalendarEvent,
    IconFlag,
    IconSparkles,
    IconTrophy,
    IconWorld,
} from "@tabler/icons-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const BASE = import.meta.env.BASE_URL;
/** Featured alongside National Children Karate Training embed */
const EVENTS_HOSTING_SPOTLIGHT_EMBED =
    "https://www.youtube.com/embed/OdhBViMDGGk?rel=0&modestbranding=1&loop=1&playlist=OdhBViMDGGk&playsinline=1";
const EVENTS_HOSTING_SPOTLIGHT_WATCH = "https://youtu.be/OdhBViMDGGk?si=zPCOfuPcKQ_mffzJ";
const UPCOMING_EVENTS_FLYER_SRC = `${BASE}${encodeURIComponent("upcoming events.jpeg")}`;
const SUMMER_CAMP_VIDEOS = [`${BASE}athletes/k1.mp4`, `${BASE}athletes/k2.mp4`, `${BASE}athletes/k3.mp4`] as const;
const ISHOW_VIDEO_SRC = `${BASE}athletes/ishow.mp4`;

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.45 },
};

const sectionTitle =
    "text-2xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 dark:text-white sm:text-3xl md:text-4xl";

const Event = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/90 via-white to-white font-['Poppins'] transition-colors duration-300 dark:from-cerulean-blue-950 dark:via-cerulean-blue-900 dark:to-cerulean-blue-900">
        <Header />

        <main className="mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-5 md:pb-16 md:pt-24">
            {/* Gymnastics2026 flyer — hero spotlight */}
            <motion.figure
                {...fadeUp}
                className="relative z-0 mx-auto mb-8 max-w-[min(100%,20rem)] sm:max-w-sm md:mb-10 md:max-w-md"
            >
                <div
                    className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-bright-sun-400/35 via-bright-sun-300/10 to-cerulean-blue-500/25 opacity-90 blur-xl dark:from-bright-sun-400/20 dark:via-bright-sun-300/5 dark:to-cerulean-blue-400/15"
                    aria-hidden
                />
                {/* Rotating conic gradient behind a thin ring — inner layer spins clockwise only (translate stays on outer, avoids transform clash) */}
                <div className="relative overflow-hidden rounded-xl p-[3px] sm:rounded-2xl">
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[200%] max-w-none -translate-x-1/2 -translate-y-1/2"
                        aria-hidden
                    >
                        <div
                            className="h-full w-full origin-center bg-[conic-gradient(from_0deg,#fbbf24_0deg,#0ea5e9_120deg,#f59e0b_220deg,#0369a1_300deg,#fbbf24_360deg)] motion-safe:animate-flyer-border-cw motion-reduce:animate-none dark:bg-[conic-gradient(from_0deg,#fcd34d_0deg,#38bdf8_120deg,#fbbf24_220deg,#0ea5e9_300deg,#fcd34d_360deg)]"
                        />
                    </div>
                    <div className="relative z-10 overflow-hidden rounded-[10px] border border-bright-sun-400/35 bg-cerulean-blue-950/5 shadow-[0_20px_50px_-18px_rgba(15,23,42,0.3),0_0_0_1px_rgba(251,191,36,0.12)] ring-1 ring-bright-sun-300/20 dark:border-bright-sun-300/35 dark:bg-black/25 dark:shadow-[0_20px_50px_-14px_rgba(0,0,0,0.6)] dark:ring-bright-sun-400/12 sm:rounded-[14px]">
                        <img
                            src={UPCOMING_EVENTS_FLYER_SRC}
                            alt="The Champions Sport Academy — Champions Gymnastics Programme, upcoming events 2026: National Gymnastics Festival, Summer Camp, and Level Grading &amp; Competition"
                            className="block w-full object-contain"
                            decoding="async"
                            fetchPriority="high"
                        />
                    </div>
                </div>
                <figcaption className="mt-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-bright-sun-700 dark:text-bright-sun-300 sm:text-xs">
                    Champions Gymnastics — Upcoming Events 2026
                </figcaption>
            </motion.figure>

            {/* Sports Events Organization & Management — required copy */}
            <motion.section {...fadeUp} className="relative mb-10 overflow-hidden rounded-[1.75rem] border border-cerulean-blue-100/80 bg-gradient-to-br from-white via-white to-bright-sun-50/40 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.12)] dark:border-white/10 dark:from-cerulean-blue-900/90 dark:via-cerulean-blue-900/70 dark:to-bright-sun-900/20 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.45)] sm:p-7 md:mb-12 md:rounded-[2rem] md:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-bright-sun-400/25 blur-3xl dark:bg-bright-sun-400/10" aria-hidden />
                <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-cerulean-blue-400/15 blur-3xl dark:bg-white/5" aria-hidden />

                <div className="relative flex flex-col gap-4 md:gap-5">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-bright-sun-500/25 bg-bright-sun-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-bright-sun-700 dark:border-bright-sun-300/30 dark:bg-bright-sun-300/10 dark:text-bright-sun-200">
                        <IconSparkles size={14} className="shrink-0" stroke={1.75} />
                        Events &amp; programmes
                    </div>
                    <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-cerulean-blue-900 dark:text-white sm:text-4xl md:text-[2.75rem]">
                        Sports Events{" "}
                        <span className="bg-gradient-to-r from-bright-sun-600 to-bright-sun-500 bg-clip-text text-transparent dark:from-bright-sun-300 dark:to-bright-sun-400">
                            Organization &amp; Management
                        </span>
                    </h1>
                    <p className="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200 md:text-lg">
                        We organize, host, and manage high-quality sports events at national, regional, and international levels. Our services include
                        competitions, camps, coaching clinics, and educational programmes—designed to promote excellence, talent development, and social impact
                        through sport.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1 text-xs font-bold uppercase tracking-wide text-cerulean-blue-800/90 dark:text-cerulean-blue-100/90">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 shadow-sm ring-1 ring-cerulean-blue-900/5 dark:bg-white/10 dark:ring-white/10">
                            <IconTrophy size={16} className="text-bright-sun-600 dark:text-bright-sun-300" stroke={1.5} />
                            Competitions
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 shadow-sm ring-1 ring-cerulean-blue-900/5 dark:bg-white/10 dark:ring-white/10">
                            <IconCalendarEvent size={16} className="text-bright-sun-600 dark:text-bright-sun-300" stroke={1.5} />
                            Camps &amp; clinics
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 shadow-sm ring-1 ring-cerulean-blue-900/5 dark:bg-white/10 dark:ring-white/10">
                            <IconWorld size={16} className="text-bright-sun-600 dark:text-bright-sun-300" stroke={1.5} />
                            National to international
                        </span>
                    </div>
                </div>
            </motion.section>

            <div className="space-y-10 md:space-y-12">
                {/* Summer Camp */}
                <motion.section {...fadeUp} className="relative">
                    <div className="mb-5 flex flex-col gap-2 sm:mb-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-bright-sun-600 dark:text-bright-sun-300">
                                The Champions Sports Academy
                            </p>
                            <h2 className={sectionTitle}>
                                The Champions <span className="text-bright-sun-600 dark:text-bright-sun-300">Summer Camp</span>
                            </h2>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-cerulean-blue-100/90 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-cerulean-blue-900/40 md:p-5">
                        <p className="mb-4 text-center text-sm font-black uppercase tracking-tight text-cerulean-blue-800 dark:text-cerulean-blue-100 md:mb-5 md:text-base">
                            The Champions National Children Karate Training
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 md:gap-4">
                            {SUMMER_CAMP_VIDEOS.map((src, index) => (
                                <div
                                    key={src}
                                    className="group relative mx-auto w-full max-w-[min(100%,280px)] overflow-hidden rounded-xl border-2 border-cerulean-blue-200/90 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-1 ring-cerulean-blue-900/5 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-white/15 dark:shadow-black/30 dark:ring-white/5 sm:max-w-none"
                                >
                                    <div className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                                    <video
                                        src={src}
                                        controls
                                        playsInline
                                        preload="metadata"
                                        className="mx-auto block max-h-[min(70vh,480px)] w-full bg-black object-contain sm:max-h-[min(75vh,520px)]"
                                        aria-label={`National children karate training clip ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mx-auto mt-6 max-w-5xl md:mt-8">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:gap-8">
                                <div className="min-w-0">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-1 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/30 dark:ring-white/5">
                                        <iframe
                                            className="absolute inset-0 h-full w-full border-0"
                                            src="https://www.youtube.com/embed/Ayj1lSBqvbs?rel=0&modestbranding=1&loop=1&playlist=Ayj1lSBqvbs"
                                            title="The Champions National Children Karate Training — YouTube"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="mt-3 text-center">
                                        <a
                                            href="https://youtu.be/Ayj1lSBqvbs?si=Gw3mf1hjAuXck7sC"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                                        >
                                            Open on YouTube
                                        </a>
                                    </p>
                                </div>
                                <div className="min-w-0">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-1 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/30 dark:ring-white/5">
                                        <iframe
                                            className="absolute inset-0 h-full w-full border-0"
                                            src={EVENTS_HOSTING_SPOTLIGHT_EMBED}
                                            title="The Champions Sports Academy — events spotlight"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="mt-3 text-center">
                                        <a
                                            href={EVENTS_HOSTING_SPOTLIGHT_WATCH}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                                        >
                                            Open on YouTube
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Events Hosting */}
                <motion.section {...fadeUp} className="relative">
                    <div className="mb-5 sm:mb-6">
                        <h2 className={`${sectionTitle} text-center`}>
                            The Champions <span className="text-bright-sun-600 dark:text-bright-sun-300">Events Hosting</span>
                        </h2>
                        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-gray-600 dark:text-gray-400">
                            From national showcases to international standards—experience our hosting in action.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                        {/* National */}
                        <div className="flex flex-col overflow-hidden rounded-2xl border border-cerulean-blue-100 bg-white/70 shadow-md dark:border-white/10 dark:bg-cerulean-blue-900/50">
                            <div className="flex items-center gap-2 border-b border-cerulean-blue-100/80 bg-gradient-to-r from-bright-sun-500/10 to-transparent px-4 py-3 dark:border-white/10 dark:from-bright-sun-400/10">
                                <IconFlag className="text-bright-sun-600 dark:text-bright-sun-300" size={22} stroke={1.5} />
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-cerulean-blue-900 dark:text-white md:text-xl">
                                    National Level
                                </h3>
                            </div>
                            <div className="p-3 md:p-4">
                                <div className="overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-inner dark:border-white/15">
                                    <video
                                        src={ISHOW_VIDEO_SRC}
                                        controls
                                        playsInline
                                        preload="metadata"
                                        className="mx-auto block max-h-[min(70vh,520px)] w-full bg-black object-contain"
                                        aria-label="National level sports event hosting"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* International */}
                        <div className="flex flex-col overflow-hidden rounded-2xl border border-cerulean-blue-100 bg-white/70 shadow-md dark:border-white/10 dark:bg-cerulean-blue-900/50">
                            <div className="flex items-center gap-2 border-b border-cerulean-blue-100/80 bg-gradient-to-r from-cerulean-blue-500/10 to-transparent px-4 py-3 dark:border-white/10 dark:from-white/5">
                                <IconWorld className="text-bright-sun-600 dark:text-bright-sun-300" size={22} stroke={1.5} />
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-cerulean-blue-900 dark:text-white md:text-xl">
                                    International Level
                                </h3>
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-4 p-5 md:p-6">
                                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:text-base">
                                    We bring international best practices to every event—coordination with federations, technical standards, and athlete-centred
                                    experiences that reflect Rwanda&apos;s place on the global sport map.
                                </p>
                                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bright-sun-500" />
                                        Cross-border competitions and training exchanges
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bright-sun-500" />
                                        Alignment with international rules and safe sport
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bright-sun-500" />
                                        Programmes that build pathways for elite and grassroots athletes
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>

        <Footer />
    </div>
);

export default Event;
