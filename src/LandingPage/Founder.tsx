import { useState, useEffect, useCallback, useRef } from "react";
import { IconPhoto, IconSparkles, IconX, IconChevronLeft, IconChevronRight, IconCircleChevronLeft, IconCircleChevronRight, IconTrophy, IconChevronDown, IconChevronUp, IconUsers, IconUser, IconUserCheck } from "@tabler/icons-react";
import Header from "../Header/Header";
import { motion, AnimatePresence } from "framer-motion";

type FounderTab = "founder" | "team";

const BOARD_MEMBERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const MANAGEMENT_TEAM = [
    { role: "Head Coach", name: "Head Coach" },
    { role: "Manager", name: "Manager" },
    { role: "Secretary", name: "Secretary" },
];

const COACHES = [
    { name: "Coach Kharif", role: "Head Karate Coach", experience: "Expert Trainer", specialty: "Youth Development & Karate", image: `${import.meta.env.BASE_URL}athletes/Khalif.PNG` },
    { name: "Coach Dushime Sharifu", role: "National Team Athlete", experience: "10+ Years", specialty: "Acrobatics & Fitness", image: `${import.meta.env.BASE_URL}athletes/Dushime.jpg` },
    { name: "Coach ABAYISENGA Paremonique", role: "Certified National Coach", experience: "12+ Years", specialty: "Artistic & Rhythmic", image: `${import.meta.env.BASE_URL}athletes/palmonique.jpg` },
    { name: "Coach Pacifique", role: "Instructor", experience: "3+ Years", specialty: "Taekwondo & Gymnastics", image: `${import.meta.env.BASE_URL}athletes/Coach Pacifique.jpg` },
    { name: "Coach Sylvan", role: "Gymnastics Coach", experience: "1 Year", specialty: "Floor & Vault Training", image: `${import.meta.env.BASE_URL}athletes/Coach Sylvan.jpg` },
    { name: "Coach Tracy", role: "Assistant Coach", experience: "3 Years", specialty: "Core Technique & Flexibility", image: `${import.meta.env.BASE_URL}athletes/Coach Tracy.jpg` },
    { name: "Fille", role: "Academy Receptionist", experience: "Admin Expert", specialty: "Student Relations", image: `${import.meta.env.BASE_URL}athletes/Receptionist Fille.jpg` },
    { name: "Mama boy", role: "Safeguarding Officer", experience: "Welfare Guard", specialty: "Safety Oversight", image: `${import.meta.env.BASE_URL}athletes/Safeguarding Officer.jpg` },
];

const COACH_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/coach.mp4`;
const COACHING_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/coaching.mp4`;
const RWANDA_KARATE_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/${encodeURIComponent("Rwanda karate.mp4")}`;
const LEGACY_KARATE_ATHLETE_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/${encodeURIComponent("My Legacy as a Karate Athlete.mp4")}`;
const DEVELOPING_YOUTH_KARATE_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/${encodeURIComponent("Developing Youth throught Karate.mp4")}`;

/** Netflix-style row: title, src, layout for Founder video gallery */
const FOUNDER_VIDEO_ITEMS: {
    id: string;
    title: string;
    src: string;
    layout: "landscape" | "portrait";
}[] = [
    { id: "coach", title: "Coach in Action", src: COACH_VIDEO_SRC, layout: "landscape" },
    { id: "coaching", title: "Coaching", src: COACHING_VIDEO_SRC, layout: "landscape" },
    { id: "rwanda-karate", title: "Rwanda Karate", src: RWANDA_KARATE_VIDEO_SRC, layout: "landscape" },
    { id: "legacy", title: "My Legacy as a Karate Athlete", src: LEGACY_KARATE_ATHLETE_VIDEO_SRC, layout: "landscape" },
    { id: "developing-youth", title: "Developing Youth through Karate", src: DEVELOPING_YOUTH_KARATE_VIDEO_SRC, layout: "landscape" },
];

const FOUNDER_BIO = [
    "Noël Nkuranyabahizi is the Founder and Chief Executive Officer of The Champions Sports Academy and an International Elite Sports Coach. A former elite karate athlete and Head Coach of the Rwanda National Karate Team (2015–2023), he received the National Sport Coaching Award (2020) from the Rwanda National Olympic and Sports Committee in recognition of his outstanding contribution to sport development in Rwanda.",
    "He became the first karate coach in the world to receive an Olympic Solidarity Scholarship for Coaches after karate was included in the Olympic Games programme. This prestigious scholarship enabled him to attend the CYSél – Cycle International du Sport d'Elite programme in Lausanne, Switzerland, an advanced international coaching programme for elite sport coaches.",
    "His coaching expertise focuses particularly on Karate and Gymnastics, where he works across children's sport development, high-performance athlete preparation, and coach education, contributing to the development of athletes and coaches at both national and international levels.",
    "His professional engagement extends internationally in coach education, Olympic education, sport event management, and sport for youth development.",
    "Noël is also a Professional Social Worker in Sport and an active member of the Alliance of Social Workers in Sport. He has participated and presented at international symposiums in the United States, including events held in Denver (2019) and New Orleans (2023).",
    "He is currently pursuing a Master's Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese.",
];

const Founder = () => {
    const [animate, setAnimate] = useState(false);
    const [activeTab, setActiveTab] = useState<FounderTab>("founder");
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [bioExpanded, setBioExpanded] = useState(false);
    const founderVideoRowRef = useRef<HTMLDivElement>(null);
    const [videoRowScrollEdge, setVideoRowScrollEdge] = useState({ atStart: true, atEnd: false });

    const updateFounderVideoRowScroll = useCallback(() => {
        const el = founderVideoRowRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const pad = 2;
        setVideoRowScrollEdge({
            atStart: scrollLeft <= pad,
            atEnd: scrollLeft + clientWidth >= scrollWidth - pad,
        });
    }, []);

    const scrollFounderVideos = useCallback((direction: "left" | "right") => {
        const el = founderVideoRowRef.current;
        if (!el) return;
        const delta = Math.round(el.clientWidth * 0.75);
        el.scrollBy({ left: direction === "left" ? -delta : delta, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    // Gallery data for 18 images
    const galleryImages = Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        src: `${import.meta.env.BASE_URL}OurFounderGallery/${i + 1}.jpeg`,
        title: `Moment ${i + 1}`
    }));

    const handlePrevious = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedImage(prev => (prev !== null ? (prev === 1 ? galleryImages.length : prev - 1) : null));
    }, [galleryImages.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedImage(prev => (prev !== null ? (prev === galleryImages.length ? 1 : prev + 1) : null));
    }, [galleryImages.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;
            if (e.key === "Escape") setSelectedImage(null);
            if (e.key === "ArrowLeft") handlePrevious();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, handlePrevious, handleNext]);

    useEffect(() => {
        if (activeTab !== "founder") return;
        const el = founderVideoRowRef.current;
        if (!el) return;
        const run = () => updateFounderVideoRowScroll();
        run();
        el.addEventListener("scroll", run, { passive: true });
        window.addEventListener("resize", run);
        const ro = new ResizeObserver(run);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", run);
            window.removeEventListener("resize", run);
            ro.disconnect();
        };
    }, [activeTab, updateFounderVideoRowScroll]);

    return (
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 transition-colors duration-300">
            <Header />

            {/* Tabs: Our Founder | Team */}
            <div className="sticky top-20 z-50 bg-white/95 dark:bg-cerulean-blue-900/95 backdrop-blur border-b border-gray-200 dark:border-white/10">
                <div className="container mx-auto px-4 py-4 flex gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab("founder")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-sm transition-all ${activeTab === "founder" ? "bg-bright-sun-500 dark:bg-bright-sun-400 text-gray-900 shadow-lg" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"}`}
                    >
                        <IconSparkles size={20} />
                        Our Founder
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("team")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-sm transition-all ${activeTab === "team" ? "bg-bright-sun-500 dark:bg-bright-sun-400 text-gray-900 shadow-lg" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"}`}
                    >
                        <IconUsers size={20} />
                        Board of Directors & Team
                    </button>
                </div>
            </div>

            {activeTab === "founder" && (
            <>
            {/* Founder & CEO Section */}
            <div className="container mx-auto px-4 py-32">
                <div className={`bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-20 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="relative group shrink-0 flex flex-col items-center">
                            {/* Outer ring + shadow stack for depth */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-bright-sun-400/30 dark:bg-bright-sun-300/20 blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700" aria-hidden />
                                <div className="relative w-72 sm:w-80 aspect-square rounded-full p-2 bg-gradient-to-br from-bright-sun-400 to-bright-sun-600 dark:from-bright-sun-300 dark:to-bright-sun-500 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.02]">
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-cerulean-blue-900/80 bg-white dark:bg-cerulean-blue-900 shadow-inner">
                                        <img
                                            src={`${import.meta.env.BASE_URL}athletes/Noel.jpg`}
                                            alt="Noël Nkuranyabahizi"
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 rounded-full ring-inset ring-1 ring-black/5 dark:ring-white/10 pointer-events-none" aria-hidden />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-full pointer-events-none" aria-hidden />
                                    </div>
                                </div>
                            </div>
                            {/* Achievement pill under the photo */}
                            <div className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-bright-sun-400/90 dark:bg-bright-sun-300/90 text-gray-900 font-bold text-sm uppercase tracking-wider shadow-lg border border-bright-sun-500/30 dark:border-bright-sun-200/50">
                                <IconTrophy size={20} className="text-cerulean-blue-900 shrink-0" />
                                <span>National Coaching Award 2020</span>
                            </div>
                        </div>

                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-8 font-black uppercase tracking-widest text-xs">
                                <IconSparkles size={16} />
                                <span>Visionary Leadership</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-cerulean-blue-900 dark:text-white mb-4 leading-none uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">Noël Nkuranyabahizi</h1>
                            <div className="text-bright-sun-600 dark:text-bright-sun-300 text-2xl font-black mb-10 uppercase tracking-widest italic tracking-tighter">Founder & CEO</div>

                            <div className="max-w-4xl mb-12">
                                <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium">
                                <p className="border-l-8 border-bright-sun-600 dark:border-bright-sun-300 pl-8 italic">
                                        {FOUNDER_BIO[0]}
                                    </p>
                                    <AnimatePresence initial={false}>
                                        {bioExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-6 overflow-hidden"
                                            >
                                                {FOUNDER_BIO.slice(1).map((para, i) => (
                                                    <p key={i}>{para}</p>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setBioExpanded((v) => !v)}
                                    className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border-2 border-cerulean-blue-900/30 dark:border-white/30 bg-white dark:bg-white/10 text-cerulean-blue-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 transition-all"
                                >
                                    {bioExpanded ? (
                                        <>
                                            Read Less
                                            <IconChevronUp size={20} className="text-bright-sun-600 dark:text-bright-sun-300" />
                                        </>
                                    ) : (
                                        <>
                                            Read More
                                            <IconChevronDown size={20} className="text-bright-sun-600 dark:text-bright-sun-300" />
                                        </>
                                    )}
                                </button>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>

            {/* Video gallery – Netflix-style horizontal row (scroll + snap); scrollbar hidden, circle-chevron controls */}
            <section className="w-full py-12 md:py-20 bg-gradient-to-b from-gray-50/80 to-white dark:from-cerulean-blue-950/40 dark:to-cerulean-blue-900/30 border-y border-gray-100 dark:border-white/5">
                <style>{`
                    .founder-video-row { scrollbar-width: none; -ms-overflow-style: none; }
                    .founder-video-row::-webkit-scrollbar { display: none; }
                `}</style>
                <div className="px-4 md:px-8 lg:px-12 mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <h2 className="text-2xl md:text-4xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">
                        Stories <span className="text-bright-sun-600 dark:text-bright-sun-300">&amp; Videos</span>
                    </h2>
                    <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0" role="group" aria-label="Scroll videos">
                        <button
                            type="button"
                            onClick={() => scrollFounderVideos("left")}
                            disabled={videoRowScrollEdge.atStart}
                            className="p-1 rounded-full text-cerulean-blue-900 dark:text-white bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-white/15 shadow-md hover:bg-bright-sun-100 dark:hover:bg-bright-sun-400/20 hover:border-bright-sun-400 disabled:opacity-35 disabled:pointer-events-none transition-all active:scale-95"
                            aria-label="Scroll videos left"
                        >
                            <IconCircleChevronLeft size={40} stroke={1.5} className="text-bright-sun-600 dark:text-bright-sun-300" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollFounderVideos("right")}
                            disabled={videoRowScrollEdge.atEnd}
                            className="p-1 rounded-full text-cerulean-blue-900 dark:text-white bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-white/15 shadow-md hover:bg-bright-sun-100 dark:hover:bg-bright-sun-400/20 hover:border-bright-sun-400 disabled:opacity-35 disabled:pointer-events-none transition-all active:scale-95"
                            aria-label="Scroll videos right"
                        >
                            <IconCircleChevronRight size={40} stroke={1.5} className="text-bright-sun-600 dark:text-bright-sun-300" />
                        </button>
                    </div>
                </div>
                <motion.div
                    ref={founderVideoRowRef}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="founder-video-row flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden pb-6 pl-4 md:pl-8 lg:pl-12 pr-4 md:pr-8 lg:pr-12 scroll-smooth snap-x snap-mandatory"
                >
                    {FOUNDER_VIDEO_ITEMS.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-[78vw] sm:w-[55vw] md:w-[38vw] lg:w-[28vw] xl:w-[24vw] max-w-md snap-start"
                        >
                            <div className="group rounded-xl overflow-hidden border-2 border-gray-200 dark:border-white/15 shadow-xl bg-black/90 dark:bg-black/60 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl hover:z-10 hover:border-bright-sun-500/40">
                                <div className={item.layout === "landscape" ? "aspect-video w-full" : "aspect-[9/16] max-h-[min(70vh,520px)] w-full mx-auto flex items-center justify-center bg-black/40"}>
                                    <video
                                        className={
                                            item.layout === "landscape"
                                                ? "w-full h-full object-cover"
                                                : "w-full h-full max-h-[min(70vh,520px)] object-contain"
                                        }
                                        src={item.src}
                                        controls
                                        playsInline
                                        preload="metadata"
                                        aria-label={item.title}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                            <p className="mt-3 text-center text-sm md:text-base font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight line-clamp-2 px-1">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* 1. Founder's Journey (past) */}
            <div id="founder-journey" className="container mx-auto px-4 py-32 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 transition-colors duration-300 scroll-mt-24">
                <div className="text-center mb-24 px-4">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic text-cerulean-blue-900 dark:text-white underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8 flex items-center justify-center gap-4">
                            <IconPhoto size={48} className="text-bright-sun-600 dark:text-bright-sun-300" />
                            Founder's <span className="text-bright-sun-600 dark:text-bright-sun-300">Journey</span>
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">
                            Visual proof of the dedication, growth, and impact built over the years.
                        </p>
                    </motion.div>
                </div>

                <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-[1600px] mx-auto px-4 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-700`}>
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => setSelectedImage(image.id)}
                            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-cerulean-blue-900 border-4 border-white dark:border-cerulean-blue-900 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                            style={{ transitionDelay: `${index * 30}ms` }}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <div className="p-3 bg-bright-sun-300 rounded-full text-cerulean-blue-900 shadow-xl">
                                    <IconPhoto size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Sport Coaching — one photo per row, alternate: words left/photo right, then photo left/words right */}
            <section id="sport-coaching" className="container mx-auto px-4 py-20 md:py-28 scroll-mt-24">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-12 uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                        International Elite Sports Coach
                    </h2>

                    <div className="space-y-12 md:space-y-16">
                        {/* 1: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/team2.jfif`} alt="Team coaching" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is an International Elite Sports Coach, coach developer, and sport development leader specializing in multi-sport athlete development, particularly in Karate and Gymnastics.</p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/team rwanda.jpeg`} alt="Team Rwanda" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is the Founder and Chief Executive Officer of The Champions Sports Academy in Kigali, Rwanda, an organization dedicated to promoting physical literacy, Olympic values, and long-term athlete development for children and youth.</p>
                            </div>
                        </div>

                        {/* 3: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/IM1.jfif`} alt="Elite coaching" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>A 4th Dan Black Belt in Karate, Noël served as Head Coach of the Rwanda National Karate Team (2015–2023), where he led national athlete development programmes and prepared athletes for regional and continental competitions.</p>
                            </div>
                        </div>

                        {/* 4: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/in camp.jpg`} alt="In camp" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>His work focuses on elite coaching, grassroots sport development, and coach education, supporting both athletes and coaches through structured development pathways.</p>
                            </div>
                        </div>

                        {/* 5: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/in stade.JPG`} alt="In stade" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is the recipient of the National Sport Coaching Award (2020) from the Rwanda National Olympic and Sports Committee in recognition of his contribution to sport development in Rwanda.</p>
                            </div>
                        </div>

                        {/* 6: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/award.jfif`} alt="Award" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He also received an Olympic Solidarity Scholarship for Coaches, which enabled him to attend the CYSél – Cycle International du Sport d'Elite programme in Lausanne, Switzerland, an advanced international programme for elite sport coaches.</p>
                            </div>
                        </div>

                        {/* 7: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/team.jfif`} alt="Team" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Through his leadership and international engagement, Noël contributes to strengthening coaching systems, athlete development, and values-based sport education.</p>
                            </div>
                        </div>

                        {/* 8: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/graduation.jpg`} alt="Graduation" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is currently pursuing a Master's Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese.</p>
                            </div>
                        </div>

                        {/* 9: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/master sinzi.jpeg`} alt="Master Sinzi" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Meet the people and moments behind our academy—team sessions, awards, and the path to mastery.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            

            {/* 3. Professional Social Worker in Sport — one photo per row, alternate left/right (photos from SocialWork) */}
            <section id="social-worker-in-sport" className="container mx-auto px-4 py-20 md:py-28 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 scroll-mt-24">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-12 uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                        Professional Social Worker in Sport
                    </h2>

                    <div className="space-y-12 md:space-y-16">
                        {/* 1: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}SocialWork/Sport International Symposium.jfif`} alt="Sport International Symposium" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is a Professional Social Worker in Sport whose work focuses on the use of sport as a tool for youth development, psychosocial well-being, and positive social change. With a Bachelor's Degree in Social Work, he integrates social work principles with sport coaching and athlete development to support the holistic well-being of children, youth, athletes, and coaches.</p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}SocialWork/global Dialogue.jfif`} alt="Global dialogue on sport and social development" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Through his professional engagement in the field of sport and social work, he became a member of the Alliance of Social Workers in Sport (ASWIS) based in the United States, an international network dedicated to advancing social work practice in sport environments.</p>
                            </div>
                        </div>

                        {/* 3: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}SocialWork/member Of Alliance.jfif`} alt="Member of Alliance of Social Workers in Sport" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël has contributed to the global dialogue on sport and social development through international academic presentations. In 2019, he presented at the Social Work in Sport International Symposium in Denver, Colorado, where he delivered a presentation on "The Role of Karate in Improving Children's Self-Esteem," highlighting how martial arts can contribute to confidence building, discipline, and psychosocial development among young participants.</p>
                            </div>
                        </div>

                        {/* 4: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}SocialWork/highLevelDegree.jfif`} alt="High level degree and expertise" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
                                <p>He also presented at the Social Work in Sport International Symposium held at Tulane University in New Orleans, Louisiana, where he shared research on "The Impact of Elite Sport Coaching Activities on the Coaches' Mental Well-being in Rwanda." His work examined the psychological pressures experienced by elite sport coaches and emphasized the importance of supportive systems that protect the mental health and well-being of coaching professionals.</p>
                                <p>Through his work in coaching, youth sport development, and social work in sport, Noël continues to advocate for sport as a powerful platform for education, inclusion, mental well-being, and community development, contributing to both national and international discussions on the social value of sport.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Sport Events Management — images from public/Events */}
            <section id="sport-events-management" className="container mx-auto px-4 py-20 md:py-28 scroll-mt-24">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-12 uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                        Sport Events Management
                    </h2>

                    <div className="space-y-12 md:space-y-16">
                        {/* 1: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT.jfif`} alt="Sport events" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is a Sport Events Manager and International Elite Sports Coach with significant experience in the organization and management of national and international sport events. He is the Founder and Chief Executive Officer of The Champions Sports Academy in Kigali, Rwanda, where he leads the development of sport programmes, competitions, and youth sport initiatives.</p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT 1.jfif`} alt="Event organisation" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He has managed and coordinated major national and international sport events, contributing to event planning, technical coordination, and operational management. Notably, he served as Event Manager for the African Rhythmic Gymnastics Championships held in Rwanda, supporting the successful organization of this continental competition.</p>
                            </div>
                        </div>

                        {/* 3: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT3.jfif`} alt="Event management" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is currently pursuing a Master's Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese, further strengthening his expertise in sport event management and Olympic sport systems.</p>
                            </div>
                        </div>

                        {/* 4: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT5.jfif`} alt="Sport events at CSA" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Event planning, technical coordination, and operational management are at the heart of delivering successful competitions and programmes for athletes and communities.</p>
                            </div>
                        </div>

                        {/* 5: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT8.jfif`} alt="Championships and competitions" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>From local programmes to continental events like the African Rhythmic Gymnastics Championships, the academy contributes to sport development at every level.</p>
                            </div>
                        </div>

                        {/* 6: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT9.jfif`} alt="Olympic and sport events" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Olympic values and event management expertise combine to create lasting impact in youth sport and elite competition.</p>
                            </div>
                        </div>

                        {/* 7: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENTS.jfif`} alt="Events at The Champions" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Through sport events, The Champions Sports Academy builds bridges between communities, athletes, and the broader sport system.</p>
                            </div>
                        </div>

                        {/* 8: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/Romeo Image_14.JPG`} alt="Sport events moment" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Excellence in sport event management—supporting athletes, coaches, and the next generation of leaders in sport.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox / Full Screen Preview (founder tab only) */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-cerulean-blue-900/98 backdrop-blur-2xl p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[210] border border-white/10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <IconX size={28} />
                        </motion.button>

                        {/* Navigation Controls */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-[210] pointer-events-none">
                            <motion.button
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-5 bg-white/5 hover:bg-white/10 rounded-[2rem] text-white transition-all pointer-events-auto border border-white/10 backdrop-blur-xl group"
                                onClick={handlePrevious}
                            >
                                <IconChevronLeft size={40} className="group-hover:-translate-x-2 transition-transform" />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-5 bg-white/5 hover:bg-white/10 rounded-[2rem] text-white transition-all pointer-events-auto border border-white/10 backdrop-blur-xl group"
                                onClick={handleNext}
                            >
                                <IconChevronRight size={40} className="group-hover:translate-x-2 transition-transform" />
                            </motion.button>
                        </div>

                        {/* Image Display */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center gap-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[75vh] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40">
                                <img
                                    src={galleryImages[selectedImage - 1].src}
                                    alt={galleryImages[selectedImage - 1].title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="text-center space-y-4 max-w-3xl px-6">
                                <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    {galleryImages[selectedImage - 1].title}
                                </h3>
                                <div className="h-1 w-20 bg-bright-sun-300 mx-auto rounded-full" />
                                <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs">
                                    The Champion Sport Academy Legacy
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            </>
            )}

            {activeTab === "team" && (
            <div className="container mx-auto px-4 py-16 md:py-24">
                {/* Board of Directors – 8 people (A–H), parents with a role in The Champions Sports Academy */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-2 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                        Board of Directors
                    </h2>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
                        {BOARD_MEMBERS.map((name, index) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-gray-50 dark:bg-cerulean-blue-800/40 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center shadow-sm"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bright-sun-500/20 dark:bg-bright-sun-400/20 border-2 border-bright-sun-500 dark:border-bright-sun-400 flex items-center justify-center">
                                    <IconUser className="text-bright-sun-600 dark:text-bright-sun-300" size={28} />
                                </div>
                                <span className="text-xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight">{name}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Management Team – Head Coach, Manager, Secretary */}
                <section>
                    <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-2 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                        Management Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        {MANAGEMENT_TEAM.map((member, index) => (
                            <motion.div
                                key={member.role}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-cerulean-blue-800/40 border-2 border-cerulean-blue-700 dark:border-cerulean-blue-500 rounded-2xl p-8 text-center shadow-lg"
                            >
                                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-bright-sun-500/20 dark:bg-bright-sun-400/20 border-2 border-bright-sun-500 dark:border-bright-sun-400 flex items-center justify-center">
                                    <IconUser className="text-bright-sun-600 dark:text-bright-sun-300" size={36} />
                                </div>
                                <h3 className="text-xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight mb-1">{member.role}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{member.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Coaches – moved from About Us */}
                <section className="mt-20">
                    <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-2 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                        Coaches
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24 mt-14">
                        {COACHES.map((coach, index) => (
                            <motion.div
                                key={coach.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.06 }}
                                className="group relative text-center"
                            >
                                <div className="relative mb-10 w-full aspect-square max-w-[280px] mx-auto">
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-[8px] border-white dark:border-cerulean-blue-900 shadow-2xl transition-all duration-700 group-hover:shadow-bright-sun-600/20">
                                        <img
                                            src={coach.image}
                                            alt={coach.name}
                                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-3xl bg-bright-sun-400 dark:bg-bright-sun-300 shadow-xl flex items-center justify-center text-gray-900 transition-all duration-500 group-hover:rotate-12 z-10 border-4 border-white dark:border-cerulean-blue-900">
                                        <IconUserCheck size={32} />
                                    </div>
                                </div>
                                <span className="text-bright-sun-600 dark:text-bright-sun-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-1">
                                    {coach.role}
                                </span>
                                <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter italic leading-none group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors duration-500 mb-2">
                                    {coach.name}
                                </h3>
                                <div className="flex flex-col text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 space-y-1">
                                    <span>{coach.specialty}</span>
                                    <span className="text-bright-sun-600 dark:text-bright-sun-300 italic tracking-tight text-xs">{coach.experience} EXPERIENCE</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
            )}
        </div>
    );
};

export default Founder;
