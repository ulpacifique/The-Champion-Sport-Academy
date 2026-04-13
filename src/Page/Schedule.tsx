import { motion } from "framer-motion";
import {
    IconClock,
    IconHome,
    IconMapPin,
    IconPhone,
    IconMail,
    IconSun,
    IconSparkles,
} from "@tabler/icons-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MAPS_URL =
    "https://www.google.com/maps/place/Notre-Dame+des+Anges+Primary+School/@-1.9565098,30.1165394,724m/data=!3m1!1e3!4m6!3m5!1s0x19dca707371711d7:0x1e0a32fbe53778a3!8m2!3d-1.956495!4d30.1191044!16s%2Fg%2F1jkwl0txl";

const PHONE_DISPLAY = "+250 788 876 966";
const PHONE_TEL = "+250788876966";
const EMAIL = "niyonoel@gmail.com";

/** iOS-style spring — snappy, slight overshoot */
const spring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.85 };

const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
};

const itemUp = {
    hidden: { opacity: 0, y: 22, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: spring,
    },
};

type Slot = { day: string; title: string; time?: string; note?: string; icon: typeof IconHome };

const weekdaySlots: Slot[] = [
    {
        day: "Monday – Friday",
        title: "Home classes (individual / group)",
        note: "By appointment",
        icon: IconHome,
    },
];

const weekendSlots: Slot[] = [
    {
        day: "Saturday",
        title: "Weekend training (morning)",
        time: "10:00 AM – 12:00 PM",
        icon: IconSun,
    },
    {
        day: "Saturday",
        title: "Weekend training (afternoon)",
        time: "3:00 PM – 5:00 PM",
        icon: IconSun,
    },
    {
        day: "Sunday",
        title: "Weekend training (morning)",
        time: "10:00 AM – 12:00 PM",
        icon: IconSun,
    },
    {
        day: "Sunday",
        title: "Weekend training (afternoon)",
        time: "3:00 PM – 5:00 PM",
        icon: IconSun,
    },
];

const glassCard =
    "rounded-[1.75rem] border border-white/60 bg-white/55 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-cerulean-blue-900/55 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]";

/** Gentle continuous “breath” — subtle float + scale */
const breatheY = [0, -5, 0] as const;
const breatheScale = [1, 1.018, 1] as const;
const breatheTransition = (delay: number) => ({
    duration: 2.85,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
});

const Schedule = () => (
    <div className="relative min-h-screen overflow-x-hidden bg-[#e8eef5] bg-gradient-to-b from-gray-50/90 via-white to-white font-['Poppins'] transition-colors duration-500 dark:from-cerulean-blue-950 dark:via-cerulean-blue-900 dark:to-cerulean-blue-900">
        {/* Soft mesh — light: airy; dark: site cerulean blues */}
        <div
            className="pointer-events-none fixed inset-0 -z-10 opacity-90 dark:opacity-100"
            aria-hidden
        >
            <div className="absolute -left-1/4 top-0 h-[70vh] w-[90vw] rounded-full bg-gradient-to-br from-sky-200/80 via-bright-sun-200/50 to-transparent blur-3xl dark:from-cerulean-blue-800/35 dark:via-cerulean-blue-900/50 dark:to-cerulean-blue-950/80" />
            <div className="absolute -right-1/4 bottom-0 h-[60vh] w-[80vw] rounded-full bg-gradient-to-tl from-bright-sun-300/40 via-cerulean-blue-200/30 to-transparent blur-3xl dark:from-bright-sun-400/12 dark:via-cerulean-blue-800/25 dark:to-cerulean-blue-950/60" />
        </div>

        <Header />

        <main className="relative mx-auto max-w-lg px-4 pb-20 pt-24 sm:max-w-xl sm:px-5 md:max-w-2xl md:pt-28">
            <motion.header
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={spring}
                className="mb-10 text-center"
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...spring, delay: 0.05 }}
                    className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-bright-sun-400/35 bg-bright-sun-400/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-bright-sun-800 shadow-sm backdrop-blur-md dark:border-bright-sun-300/25 dark:bg-bright-sun-400/10 dark:text-bright-sun-200"
                >
                    <IconSparkles size={14} stroke={1.75} />
                    Karate &amp; Gymnastics
                </motion.div>
                <h1 className="text-3xl font-black tracking-tight text-cerulean-blue-950 dark:text-white sm:text-4xl md:text-[2.35rem]">
                    Session{" "}
                    <span className="bg-gradient-to-r from-bright-sun-500 to-amber-500 bg-clip-text text-transparent dark:from-bright-sun-300 dark:to-bright-sun-400">
                        availability
                    </span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm font-medium text-cerulean-blue-900/70 dark:text-gray-300 md:text-base">
                    Plan your week — home sessions on weekdays, weekend training at École Notre-Dame des Anges.
                </p>
            </motion.header>

            <motion.section
                variants={stagger}
                initial="hidden"
                animate="show"
                className="space-y-4"
            >
                <motion.h2
                    variants={itemUp}
                    className="px-1 text-[11px] font-black uppercase tracking-[0.28em] text-cerulean-blue-800/80 dark:text-bright-sun-300/90"
                >
                    Weekdays
                </motion.h2>
                {weekdaySlots.map((slot) => (
                    <motion.article key={slot.title} variants={itemUp} className="will-change-transform">
                        <motion.div
                            className={`${glassCard} p-5 sm:p-6`}
                            animate={{ y: [...breatheY], scale: [...breatheScale] }}
                            transition={breatheTransition(0)}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-bright-sun-400/90 to-bright-sun-600/80 text-white shadow-lg shadow-bright-sun-500/25 dark:from-bright-sun-400 dark:to-amber-600">
                                    <slot.icon size={24} stroke={1.5} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-black uppercase tracking-wider text-bright-sun-700 dark:text-bright-sun-300">
                                        {slot.day}
                                    </p>
                                    <h3 className="mt-1 text-lg font-bold text-cerulean-blue-950 dark:text-white">
                                        {slot.title}
                                    </h3>
                                    {slot.note && (
                                        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-cerulean-blue-800/85 dark:text-gray-300">
                                            <IconClock size={18} className="shrink-0 text-bright-sun-600 dark:text-bright-sun-400" />
                                            {slot.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.article>
                ))}

                <motion.h2
                    variants={itemUp}
                    className="mt-8 px-1 text-[11px] font-black uppercase tracking-[0.28em] text-cerulean-blue-800/80 dark:text-bright-sun-300/90"
                >
                    Weekend — group training
                </motion.h2>
                {weekendSlots.map((slot, i) => (
                    <motion.article
                        key={`${slot.day}-${slot.title}-${i}`}
                        variants={itemUp}
                        className="will-change-transform"
                    >
                        <motion.div
                            className={`${glassCard} p-4 sm:p-5`}
                            animate={{ y: [...breatheY], scale: [...breatheScale] }}
                            transition={breatheTransition(0.12 * (i + 1))}
                            whileHover={{ scale: 1.025, y: -3 }}
                            whileTap={{ scale: 0.99 }}
                        >
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-widest text-bright-sun-700 dark:text-bright-sun-300">
                                    {slot.day}
                                </p>
                                <h3 className="mt-0.5 text-base font-bold text-cerulean-blue-950 dark:text-white sm:text-lg">
                                    {slot.title}
                                </h3>
                            </div>
                            <div className="shrink-0 rounded-2xl bg-cerulean-blue-900/5 px-3 py-2 text-right dark:bg-white/10">
                                <IconClock size={16} className="mb-1 ml-auto text-bright-sun-600 dark:text-bright-sun-400" />
                                <p className="text-sm font-black tabular-nums text-cerulean-blue-900 dark:text-white">
                                    {slot.time}
                                </p>
                            </div>
                        </div>
                        </motion.div>
                    </motion.article>
                ))}
            </motion.section>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={spring}
                className="mt-10 space-y-4"
            >
                <motion.a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${glassCard} flex items-center gap-4 p-5 transition-shadow hover:shadow-lg dark:hover:shadow-bright-sun-900/10 will-change-transform`}
                    animate={{ y: [...breatheY], scale: [...breatheScale] }}
                    transition={breatheTransition(0.55)}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cerulean-blue-600 to-cerulean-blue-800 text-white shadow-lg">
                        <IconMapPin size={28} stroke={1.5} />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-bright-sun-700 dark:text-bright-sun-300">
                            Weekend venue
                        </p>
                        <p className="mt-1 font-bold text-cerulean-blue-950 dark:text-white">
                            Notre-Dame des Anges Primary School
                        </p>
                        <p className="mt-1 text-sm text-cerulean-blue-800/75 dark:text-gray-400">
                            Open in Google Maps
                        </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-bright-sun-400/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-bright-sun-800 dark:text-bright-sun-200">
                        Maps
                    </span>
                </motion.a>

                <motion.div
                    className={`${glassCard} overflow-hidden p-0 will-change-transform`}
                    animate={{ y: [...breatheY], scale: [...breatheScale] }}
                    transition={breatheTransition(0.75)}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <div className="border-b border-white/40 bg-gradient-to-r from-bright-sun-400/20 to-transparent px-5 py-3 dark:border-white/10 dark:from-bright-sun-400/10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cerulean-blue-900 dark:text-bright-sun-200">
                            Contact — more information
                        </p>
                    </div>
                    <div className="space-y-1 p-5">
                        <a
                            href={`tel:${PHONE_TEL}`}
                            className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-white/50 dark:hover:bg-white/5"
                        >
                            <IconPhone className="text-bright-sun-600 dark:text-bright-sun-400" size={22} />
                            <span className="font-bold text-cerulean-blue-950 dark:text-white">{PHONE_DISPLAY}</span>
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-white/50 dark:hover:bg-white/5"
                        >
                            <IconMail className="text-bright-sun-600 dark:text-bright-sun-400" size={22} />
                            <span className="break-all font-semibold text-cerulean-blue-900 dark:text-gray-200">{EMAIL}</span>
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-10 text-center text-xs text-cerulean-blue-800/50 dark:text-gray-500"
            >
                The Champions Sports Academy · Schedule subject to confirmation
            </motion.p>
        </main>

        <Footer />
    </div>
);

export default Schedule;
