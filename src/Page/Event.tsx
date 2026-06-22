import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconCalendarEvent,
    IconFlag,
    IconSparkles,
    IconTrophy,
    IconWorld,
    IconX,
    IconChevronLeft,
    IconChevronRight,
    IconZoomIn,
} from "@tabler/icons-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const BASE = import.meta.env.BASE_URL;
/** Featured alongside National Children Karate Training embed */
const EVENTS_HOSTING_SPOTLIGHT_EMBED =
    "https://www.youtube.com/embed/OdhBViMDGGk?rel=0&modestbranding=1&loop=1&playlist=OdhBViMDGGk&playsinline=1";
const EVENTS_HOSTING_SPOTLIGHT_WATCH = "https://youtu.be/OdhBViMDGGk?si=zPCOfuPcKQ_mffzJ";
const SUMMER_CAMP_VIDEOS = [`${BASE}athletes/k1.mp4`, `${BASE}athletes/k2.mp4`, `${BASE}athletes/k3.mp4`] as const;
const ISHOW_VIDEO_SRC = `${BASE}athletes/ishow.mp4`;
const FLYER_IMAGES = [`${BASE}flyer1.jpeg`, `${BASE}flyer2.jpeg`, `${BASE}flyer3.jpeg`] as const;
/** Transparent PNG — used as a soft watermark behind Upcoming Events (same spirit as the large "2026" motif) */
const GYMNASTICS_SILHOUETTE_SRC = `${BASE}athletes/gymanstics.png`;

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.45 },
};

const sectionTitle =
    "text-2xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 dark:text-white sm:text-3xl md:text-4xl";

// Image Modal Component with proper TypeScript types
interface ImageModalProps {
    src: string;
    alt: string;
    index: number;
    totalImages: number;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
}

const ImageModal = ({
    src,
    alt,
    index,
    totalImages,
    onClose,
    onPrevious,
    onNext
}: ImageModalProps) => {
    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
            if (e.key === 'ArrowRight' && onNext) onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, onPrevious, onNext]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative max-w-6xl w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-14 right-0 text-white/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 z-10 bg-black/20 hover:bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm"
                        aria-label="Close modal"
                    >
                        <IconX size={20} stroke={2} />
                        <span className="hidden sm:inline">Close</span>
                    </button>

                    {/* Image container */}
                    <div className="relative overflow-hidden rounded-2xl bg-cerulean-blue-950/50 shadow-2xl">
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />

                        {/* Bottom info bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                            <div className="flex items-center justify-between text-white">
                                <div>
                                    <p className="text-sm font-medium opacity-90">
                                        Flyer {index + 1} of {totalImages}
                                    </p>
                                    <p className="text-xs opacity-70 mt-1">
                                        Champions Gymnastics · Upcoming Events 2026
                                    </p>
                                </div>

                                {/* Navigation arrows */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onPrevious) onPrevious();
                                        }}
                                        className="rounded-full bg-white/10 hover:bg-white/20 transition-colors p-3 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
                                        disabled={index === 0}
                                        aria-label="Previous image"
                                    >
                                        <IconChevronLeft size={20} stroke={2} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onNext) onNext();
                                        }}
                                        className="rounded-full bg-white/10 hover:bg-white/20 transition-colors p-3 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
                                        disabled={index === totalImages - 1}
                                        aria-label="Next image"
                                    >
                                        <IconChevronRight size={20} stroke={2} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const TypewriterText = ({ text }: { text: string }) => {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        // Slower typing speed: takes ~22 seconds to type out completely.
        // Resets after 35 seconds to give plenty of time to read before restarting.
        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, 35000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div 
            key={animationKey}
            className="text-left whitespace-pre-wrap text-sm sm:text-base font-semibold tracking-wide text-cerulean-blue-900 dark:text-white mb-6 sm:mb-8 md:mb-10 min-h-[2rem] bg-white/60 dark:bg-cerulean-blue-900/60 p-5 sm:p-6 rounded-[1.5rem] shadow-md border border-bright-sun-300/40"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.03 } },
                hidden: {}
            }}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        visible: { opacity: 1, display: "inline" },
                        hidden: { opacity: 0, display: "none" }
                    }}
                >
                    {char}
                </motion.span>
            ))}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-bright-sun-500 ml-1 sm:ml-1.5 align-middle"
            />
        </motion.div>
    );
};

const Event = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [carouselActiveIndex, setCarouselActiveIndex] = useState<number>(1);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedImageIndex(null);
    };

    const handlePrevious = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNext = () => {
        if (selectedImageIndex !== null && selectedImageIndex < FLYER_IMAGES.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50/90 via-white to-white font-['Poppins'] transition-colors duration-300 dark:from-cerulean-blue-950 dark:via-cerulean-blue-900 dark:to-cerulean-blue-900">
            <Header />

            <main className="mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-5 md:pb-16 md:pt-24">
                {/* Hero — Gymnastics 2026 (white · gold · blue) */}
                <motion.section
                    {...fadeUp}
                    aria-labelledby="upcoming-events-flyer-heading"
                    className="relative z-0 mx-auto mb-10 md:mb-14 max-w-5xl"
                >
                    <TypewriterText text={`Please note that the Gymnastics Summer Camp 2026 flyer has been updated.

📍 Venue: École Notre Dame des Anges, Remera, Kigali
📅 Programme Period: 30 June – 5 September 2026
📝 Registration & Prepayment: 23 June – 29 June 2026
⏰ Training Schedule: Monday–Friday, 08:00 AM – 12:00 PM
🏅 Weekend Programme: Continues as usual (10:00 AM–12:00 PM and 03:00 PM–05:00 PM)
💳 Payment: Mobile Money 997885 – The Champions Sports Academy

✅ Full 2-month package includes:
* Summer Camp
* Gymnastics Level Grading Test Fee
* Access to weekend sessions when a child misses a weekday training session

🎉 Special 20% discount available for families who pay for the full programme.

Thank you for your understanding and continued support.`} />
                    
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-bright-sun-300/40 bg-gradient-to-br from-white via-bright-sun-50/90 to-cerulean-blue-100/50 shadow-[0_28px_80px_-28px_rgba(34,59,134,0.35),0_0_0_1px_rgba(251,191,36,0.2)] dark:border-bright-sun-400/25 dark:from-cerulean-blue-950 dark:via-cerulean-blue-900 dark:to-[#152a62] dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.55)] md:rounded-[2.25rem]">

                        {/* Decorative blobs */}
                        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-bright-sun-400/25 blur-3xl dark:bg-bright-sun-400/15" aria-hidden />
                        <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-cerulean-blue-400/20 blur-3xl dark:bg-cerulean-blue-500/20" aria-hidden />
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,transparent_65%)] opacity-60 dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]" aria-hidden />

                        {/* Gymnastics silhouette watermark */}
                        <div
                            className="pointer-events-none absolute inset-0 z-[1] bg-[length:min(85vw,400px)] bg-[position:left_4%_bottom_6%] bg-no-repeat opacity-[0.13] dark:opacity-[0.3] md:bg-[length:min(42vw,520px)] md:bg-[position:left_6%_bottom_10%]"
                            style={{ backgroundImage: `url('${GYMNASTICS_SILHOUETTE_SRC}')` }}
                            aria-hidden
                        />

                        <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
                            {/* Images Carousel - 3D Effect */}
                            <div className="relative mx-auto w-full max-w-4xl h-[380px] sm:h-[450px] md:h-[550px] flex items-center justify-center">
                                <div
                                    className="pointer-events-none absolute -inset-4 -z-10 rounded-[1.5rem] bg-gradient-to-br from-bright-sun-300/45 via-white/45 to-cerulean-blue-400/35 opacity-95 blur-3xl dark:from-bright-sun-400/20 dark:via-transparent dark:to-cerulean-blue-500/30"
                                    aria-hidden
                                />
                                
                                {FLYER_IMAGES.map((src, index) => {
                                    let position = 0;
                                    if (index === carouselActiveIndex) {
                                        position = 0;
                                    } else if (index === (carouselActiveIndex + 1) % FLYER_IMAGES.length) {
                                        position = 1;
                                    } else {
                                        position = -1;
                                    }

                                    const isCenter = position === 0;

                                    return (
                                        <motion.div
                                            key={src}
                                            className="absolute w-[75%] sm:w-[60%] md:w-[50%] lg:w-[45%] aspect-[3/4] origin-center cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
                                            style={{ left: 0, right: 0, margin: 'auto' }}
                                            initial={false}
                                            animate={{
                                                x: `${position * 65}%`,
                                                scale: isCenter ? 1 : 0.8,
                                                opacity: isCenter ? 1 : 0.6,
                                                zIndex: isCenter ? 20 : 10,
                                            }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            onClick={() => {
                                                if (isCenter) {
                                                    handleImageClick(index);
                                                } else {
                                                    setCarouselActiveIndex(index);
                                                }
                                            }}
                                            whileHover={{ scale: isCenter ? 1.02 : 0.82 }}
                                        >
                                            <img
                                                src={src}
                                                alt={`Champions Gymnastics Programme upcoming events 2026 flyer ${index + 1}`}
                                                className="h-full w-full object-cover object-center"
                                                loading="lazy"
                                            />

                                            {/* Hover overlay with zoom icon */}
                                            {isCenter && (
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-center justify-center">
                                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-90 hover:scale-100 transition-transform duration-300">
                                                        <IconZoomIn className="w-8 h-8 text-white" stroke={2} />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Image number badge */}
                                            {isCenter && (
                                                <div className="absolute top-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm z-30">
                                                    {index + 1}/{FLYER_IMAGES.length}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
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
                                            preload="none"
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
                                            preload="none"
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

            {/* Modal */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <ImageModal
                        src={FLYER_IMAGES[selectedImageIndex]}
                        alt={`Flyer ${selectedImageIndex + 1}`}
                        index={selectedImageIndex}
                        totalImages={FLYER_IMAGES.length}
                        onClose={handleCloseModal}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Event;