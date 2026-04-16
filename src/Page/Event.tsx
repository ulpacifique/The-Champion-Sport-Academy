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
/**
 * Gymnastics 2026 hero — dates (update when federation / academy confirms).
 */
const UPCOMING_EVENTS_FLYER_ITEMS = [
    { label: "National Gymnastics Festival", date: "14–15 June 2026", icon: IconTrophy },
    { label: "Summer Camp", date: "7 July – 15 August 2026", icon: IconCalendarEvent },
    { label: "Level Grading & Competition", date: "November 2026", icon: IconSparkles },
] as const;
const SUMMER_CAMP_VIDEOS = [`${BASE}athletes/k1.mp4`, `${BASE}athletes/k2.mp4`, `${BASE}athletes/k3.mp4`] as const;
const ISHOW_VIDEO_SRC = `${BASE}athletes/ishow.mp4`;
/** Transparent PNG — used as a soft watermark behind Upcoming Events (same spirit as the large “2026” motif) */
const GYMNASTICS_SILHOUETTE_SRC = `${BASE}athletes/gymanstics.png`;

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
            {/* Hero — Gymnastics 2026 (white · gold · blue) */}
            <motion.section
                {...fadeUp}
                aria-labelledby="upcoming-events-flyer-heading"
                className="relative z-0 mx-auto mb-10 md:mb-14"
            >
                <div className="relative overflow-hidden rounded-[1.75rem] border border-bright-sun-300/40 bg-gradient-to-br from-white via-bright-sun-50/90 to-cerulean-blue-100/50 shadow-[0_28px_80px_-28px_rgba(34,59,134,0.35),0_0_0_1px_rgba(251,191,36,0.2)] dark:border-bright-sun-400/25 dark:from-cerulean-blue-950 dark:via-cerulean-blue-900 dark:to-[#152a62] dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.55)] md:rounded-[2.25rem]">
                    <div
                        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-bright-sun-400/25 blur-3xl dark:bg-bright-sun-400/15"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-cerulean-blue-400/20 blur-3xl dark:bg-cerulean-blue-500/20"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,transparent_65%)] opacity-60 dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]"
                        aria-hidden
                    />

                    {/* Gymnastics silhouette — faint watermark; transparent areas show the card gradient through */}
                    <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-[length:min(85vw,400px)] bg-[position:left_4%_bottom_6%] bg-no-repeat opacity-[0.13] dark:opacity-[0.3] md:bg-[length:min(42vw,520px)] md:bg-[position:left_6%_bottom_10%]"
                        style={{ backgroundImage: `url('${GYMNASTICS_SILHOUETTE_SRC}')` }}
                        aria-hidden
                    />

                    <div className="relative z-10 grid gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-10 md:p-10 lg:p-12 lg:gap-12">
                        <div className="relative flex flex-col justify-center text-center md:text-left">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cerulean-blue-800 dark:text-bright-sun-200/90 sm:text-[11px]">
                                The Champions Sports Academy
                            </p>
                            <h2
                                id="upcoming-events-flyer-heading"
                                className="mt-3 text-3xl font-black uppercase italic leading-[1.05] tracking-tight text-cerulean-blue-900 dark:text-white sm:text-4xl md:text-[2.65rem] lg:text-[2.85rem]"
                            >
                                Champions{" "}
                                <span className="bg-gradient-to-r from-bright-sun-500 via-bright-sun-600 to-bright-sun-500 bg-clip-text text-transparent dark:from-bright-sun-300 dark:via-bright-sun-400 dark:to-bright-sun-300">
                                    Gymnastics
                                </span>
                                <span className="block text-2xl not-italic text-cerulean-blue-800 dark:text-white/95 sm:text-3xl md:inline md:text-[2.65rem]">
                                    {" "}
                                    Programme
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cerulean-blue-800/85 dark:text-cerulean-blue-100/90 md:mx-0 md:max-w-none md:text-base">
                                Flagship{" "}
                                <span className="font-bold text-bright-sun-700 dark:text-bright-sun-300">2026</span> events —
                                save the dates and join us for festival, camp, and grading.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                                <span className="inline-flex items-center rounded-full border-2 border-white bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cerulean-blue-900 shadow-md shadow-cerulean-blue-900/10 dark:border-bright-sun-400/40 dark:bg-cerulean-blue-950/80 dark:text-white dark:shadow-black/30 sm:text-sm">
                                    Season 2026
                                </span>
                                <span className="hidden text-bright-sun-500 dark:text-bright-sun-400 sm:inline" aria-hidden>
                                    ·
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-bright-sun-700 dark:text-bright-sun-300">
                                    Kigali, Rwanda
                                </span>
                            </div>
                            <p
                                className="pointer-events-none absolute -bottom-2 right-0 hidden select-none text-[6.5rem] font-black leading-none text-bright-sun-200/35 dark:text-bright-sun-400/10 md:block lg:text-[7.5rem]"
                                aria-hidden
                            >
                                2026
                            </p>
                        </div>

                        <div className="relative mx-auto w-full max-w-md pb-1 pt-0.5 md:mx-0 md:max-w-none">
                            <div
                                className="pointer-events-none absolute -inset-4 -z-10 rounded-[1.5rem] bg-gradient-to-br from-bright-sun-300/45 via-white/45 to-cerulean-blue-400/35 opacity-95 blur-3xl dark:from-bright-sun-400/20 dark:via-transparent dark:to-cerulean-blue-500/30"
                                aria-hidden
                            />
                            <div className="relative -translate-y-1 overflow-hidden rounded-xl p-[3px] shadow-[0_26px_55px_-22px_rgba(30,58,138,0.48),0_14px_32px_-18px_rgba(15,23,42,0.22),0_4px_12px_-4px_rgba(251,191,36,0.18)] transition-[transform,box-shadow] duration-300 ease-out sm:rounded-2xl sm:-translate-y-1.5 dark:shadow-[0_32px_64px_-18px_rgba(0,0,0,0.72),0_16px_40px_-20px_rgba(0,0,0,0.55),0_0_48px_-12px_rgba(251,191,36,0.14)] hover:-translate-y-2 hover:shadow-[0_32px_60px_-20px_rgba(30,58,138,0.52),0_18px_36px_-16px_rgba(15,23,42,0.25),0_6px_16px_-4px_rgba(251,191,36,0.22)] dark:hover:shadow-[0_36px_72px_-16px_rgba(0,0,0,0.78),0_0_56px_-8px_rgba(251,191,36,0.18)]">
                                <div
                                    className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[200%] max-w-none -translate-x-1/2 -translate-y-1/2"
                                    aria-hidden
                                >
                                    <div className="h-full w-full origin-center bg-[conic-gradient(from_0deg,#fbbf24_0deg,#0ea5e9_120deg,#f59e0b_220deg,#0369a1_300deg,#fbbf24_360deg)] motion-safe:animate-flyer-border-cw motion-reduce:animate-none dark:bg-[conic-gradient(from_0deg,#fcd34d_0deg,#38bdf8_120deg,#fbbf24_220deg,#0ea5e9_300deg,#fcd34d_360deg)]" />
                                </div>
                                <div className="relative z-10 overflow-hidden rounded-[10px] border border-white/80 bg-white/95 shadow-inner shadow-cerulean-blue-900/5 ring-1 ring-bright-sun-300/30 dark:border-bright-sun-400/25 dark:bg-gradient-to-b dark:from-cerulean-blue-950 dark:to-[#0f1f4d] dark:shadow-black/40 dark:ring-bright-sun-400/15 sm:rounded-[14px]">
                                    <div className="border-b border-bright-sun-400/25 bg-gradient-to-r from-cerulean-blue-900 via-cerulean-blue-800 to-cerulean-blue-900 px-5 py-4 dark:from-cerulean-blue-950 dark:via-[#1a2d6e] dark:to-cerulean-blue-950">
                                        <p className="text-center text-[10px] font-black uppercase tracking-[0.28em] text-bright-sun-200 sm:text-[11px]">
                                            Save the dates
                                        </p>
                                        <p className="mt-1 text-center text-sm font-black uppercase italic tracking-tight text-white sm:text-base">
                                            Upcoming events · 2026
                                        </p>
                                    </div>
                                    <ul className="space-y-2.5 px-4 py-5 sm:px-5 sm:py-6">
                                        {UPCOMING_EVENTS_FLYER_ITEMS.map(({ label, date, icon: Icon }) => (
                                            <li
                                                key={label}
                                                className="group rounded-xl border border-cerulean-blue-100/90 bg-white px-3.5 py-3 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06]"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-bright-sun-400 to-bright-sun-600 text-white shadow-md shadow-bright-sun-600/25 dark:from-bright-sun-500 dark:to-bright-sun-700">
                                                        <Icon size={20} stroke={1.75} aria-hidden />
                                                    </span>
                                                    <div className="min-w-0 flex-1 pt-0.5">
                                                        <p className="text-sm font-black leading-snug text-cerulean-blue-900 dark:text-white sm:text-[15px]">
                                                            {label}
                                                        </p>
                                                        <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg bg-bright-sun-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-bright-sun-800 ring-1 ring-bright-sun-300/40 dark:bg-bright-sun-400/10 dark:text-bright-sun-200 dark:ring-bright-sun-400/30 sm:text-xs">
                                                            <IconCalendarEvent
                                                                size={14}
                                                                className="shrink-0 opacity-90"
                                                                stroke={2}
                                                                aria-hidden
                                                            />
                                                            {date}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-center text-[10px] font-black uppercase tracking-[0.22em] text-cerulean-blue-700 dark:text-bright-sun-300/90 sm:text-xs">
                    Champions Gymnastics · Upcoming Events 2026
                </p>
            </motion.section>

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
