import { useState, useEffect, useCallback } from "react";
import { IconSparkles, IconTrophy, IconChevronDown, IconChevronUp, IconUsers, IconUser, IconUserCheck } from "@tabler/icons-react";
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
    { name: "Mama Bonfils", role: "Safeguarding Officer", experience: "Welfare Guard", specialty: "Safety Oversight", image: `${import.meta.env.BASE_URL}athletes/Safeguarding Officer.jpg` },
];

const COACH_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/coach.mp4`;
const COACHING_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/coaching.mp4`;
const RWANDA_KARATE_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/${encodeURIComponent("Rwanda karate.mp4")}`;
const LEGACY_KARATE_ATHLETE_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/${encodeURIComponent("My Legacy as a Karate Athlete.mp4")}`;
const DEVELOPING_YOUTH_KARATE_VIDEO_SRC = `${import.meta.env.BASE_URL}OurFounderGallery/${encodeURIComponent("Developing Youth throught Karate.mp4")}`;

/** Founder video gallery items (optional caption = longer text under video) */
const FOUNDER_VIDEO_ITEMS: {
    id: string;
    title: string;
    caption?: string;
    src: string;
    layout: "landscape" | "portrait";
}[] = [
    {
        id: "developing-youth",
        title: "Developing Youth through Karate",
        caption:
            "A legacy of developing children through sport and values.\n\nAs an International Elite Sport Coach, I am committed to building skills, character, and confidence—creating champions for life.",
        src: DEVELOPING_YOUTH_KARATE_VIDEO_SRC,
        layout: "landscape",
    },
    {
        id: "coaching",
        title: "Coaching",
        caption:
            "Noël Nkuranyabahizi, International Elite Sports Coach—developing athletes from foundation to elite, nationally and internationally, building champions for sport and life.",
        src: COACHING_VIDEO_SRC,
        layout: "landscape",
    },
    {
        id: "coach",
        title: "Coach in Action",
        caption:
            "Grateful to My Sensei and Coaches\nThank you for your continuous guidance and contribution to my karate journey.\n— Noël Nkuranyabahizi\nWe Are The Champions for Life",
        src: COACH_VIDEO_SRC,
        layout: "landscape",
    },
    {
        id: "legacy",
        title: "My Legacy as a Karate Athlete",
        caption:
            "My Legacy as an Athlete\nProud to have represented the Rwanda National Karate Team and Rwanda National University in both Kata and Kumite.\nGrateful to my coaches and teammates for their support, guidance, and shared journey.\n— Noël Nkuranyabahizi\nWe Are The Champions for Life",
        src: LEGACY_KARATE_ATHLETE_VIDEO_SRC,
        layout: "landscape",
    },
    {
        id: "rwanda-karate",
        title: "Rwanda Karate",
        caption:
            "Certified Karate Coach Development\nSports Science • Values • WKF Rules\nIn partnership with Rwanda Karate Federation (FERWAKA)\n— Noël Nkuranyabahizi\nWe Are The Champions for Life",
        src: RWANDA_KARATE_VIDEO_SRC,
        layout: "landscape",
    },
];

/** 3 columns: 2 videos | 2 videos | 1 video */
const FOUNDER_VIDEO_COLUMNS = [
    FOUNDER_VIDEO_ITEMS.slice(0, 2),
    FOUNDER_VIDEO_ITEMS.slice(2, 4),
    FOUNDER_VIDEO_ITEMS.slice(4, 5),
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
    const [bioExpanded, setBioExpanded] = useState(false);

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

            {/* Video gallery – 3 columns: 2 videos | 2 videos | 1 video */}
            <section className="w-full py-12 md:py-20 bg-gradient-to-b from-gray-50/80 to-white dark:from-cerulean-blue-950/40 dark:to-cerulean-blue-900/30 border-y border-gray-100 dark:border-white/5">
                <div className="px-4 md:px-8 lg:px-12 mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-4xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">
                    From Athlete to Coach Developer:  <span className="text-bright-sun-600 dark:text-bright-sun-300"> The Legacy of My Karate Journey</span>
                    </h2>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                >
                    {FOUNDER_VIDEO_COLUMNS.map((columnItems, colIndex) => (
                        <div
                            key={`founder-video-col-${colIndex}`}
                            className={
                                colIndex === 2
                                    ? "flex flex-col gap-8 lg:gap-10 min-w-0 md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto lg:max-w-none"
                                    : "flex flex-col gap-8 lg:gap-10 min-w-0"
                            }
                        >
                            {columnItems.map((item) => (
                                <div key={item.id} className="w-full min-w-0">
                                    <div className="group rounded-xl overflow-hidden border-2 border-gray-200 dark:border-white/15 shadow-xl bg-black/90 dark:bg-black/60 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10 hover:border-bright-sun-500/40">
                                        <div
                                            className={
                                                item.layout === "landscape"
                                                    ? "aspect-video w-full"
                                                    : "aspect-[9/16] max-h-[min(70vh,520px)] w-full mx-auto flex items-center justify-center bg-black/40"
                                            }
                                        >
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
                                                aria-label={item.caption ?? item.title}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                    <p
                                        className={
                                            item.caption
                                                ? "mt-3 text-left sm:text-center text-xs sm:text-sm md:text-[0.9375rem] font-semibold text-cerulean-blue-900 dark:text-white tracking-normal leading-relaxed whitespace-pre-line px-0.5"
                                                : "mt-3 text-center text-sm md:text-base font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight line-clamp-2 px-1"
                                        }
                                    >
                                        {item.caption ?? item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* 1. Founder's Journey — headline only (photo gallery removed) */}
            <div id="founder-journey" className="container mx-auto px-4 py-20 md:py-28 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 transition-colors duration-300 scroll-mt-24">
                <div className="text-center px-4">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-2 text-cerulean-blue-900 dark:text-white underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4 md:decoration-8 max-w-5xl mx-auto leading-tight">
                            Our Founder:{" "}
                            <span className="text-bright-sun-600 dark:text-bright-sun-300 not-italic block sm:inline mt-2 sm:mt-0">
                                Chief Instructor and Gymnastics Coach
                            </span>
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* 2. Sport Coaching — one photo per row, alternate: words left/photo right, then photo left/words right */}
            <section id="sport-coaching" className="container mx-auto px-4 py-20 md:py-28 scroll-mt-24">
                <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-cerulean-blue-900 to-bright-sun-600 bg-clip-text text-transparent dark:from-white dark:to-bright-sun-300">
  A Triple Professional Identity in Sport Leadership
</h1>
<h1 className="text-3xl md:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-12 border-b-2 border-bright-sun-600 pb-4 inline-block">
  1.International Elite Sports Coach
</h1>

                    <div className="space-y-12 md:space-y-16">
                        {/* 1: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/IM1.jfif`} alt="Team coaching" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is an International Elite Sports Coach, coach developer, and sport development leader specializing in multi-sport athlete development, particularly in Karate and Gymnastics.</p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/championn.jpeg`} alt="Team Rwanda" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is the Founder and Chief Executive Officer of The Champions Sports Academy in Kigali, Rwanda, an organization dedicated to promoting physical literacy, Olympic values, and long-term athlete development for children and youth.</p>
                            </div>
                        </div>

                        {/* 3: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/team rwanda.jpeg`} alt="Elite coaching" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>A 4th Dan Black Belt in Karate, Noël served as Head Coach of the Rwanda National Karate Team (2015–2023), where he led national athlete development programmes and prepared athletes for regional and continental competitions.</p>
                            </div>
                        </div>

                        {/* 4: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/team.jfif`} alt="In camp" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>His work focuses on elite coaching, grassroots sport development, and coach education, supporting both athletes and coaches through structured development pathways.</p>
                            </div>
                        </div>

                        {/* 5: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/award.jfif`} alt="In stade" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is the recipient of the National Sport Coaching Award (2020) from the Rwanda National Olympic and Sports Committee in recognition of his contribution to sport development in Rwanda.</p>
                            </div>
                        </div>

                        {/* 6: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/International olyompics.jpeg`} alt="Award" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He also received an Olympic Solidarity Scholarship for Coaches, which enabled him to attend the CYSél – Cycle International du Sport d'Elite programme in Lausanne, Switzerland, an advanced international programme for elite sport coaches.</p>
                            </div>
                        </div>

                        {/* 7: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/developing.jpeg`} alt="Team" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Through his leadership and international engagement, Noël contributes to strengthening coaching systems, athlete development, and values-based sport education.</p>
                            </div>
                        </div>

                        {/* 8: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}coahing/IN.jpeg`} alt="Graduation" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is currently pursuing a Master's Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese.</p>
                            </div>
                        </div>

                        {/* 9: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            
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
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-12 border-b-2 border-bright-sun-600 pb-4 inline-block">
                        2.Professional Social Worker in Sport
                    </h2>

                    <div className="space-y-12 md:space-y-16">
                        {/* 1: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}SocialWork/global Dialogue.jfif`} alt="Sport International Symposium" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is a Professional Social Worker in Sport whose work focuses on the use of sport as a tool for youth development, psychosocial well-being, and positive social change. With a Bachelor's Degree in Social Work, he integrates social work principles with sport coaching and athlete development to support the holistic well-being of children, youth, athletes, and coaches.</p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}SocialWork/Sport International Symposium.jfif`} alt="Global dialogue on sport and social development" className="w-full rounded-2xl shadow-xl object-cover aspect-[3/3] border border-gray-200 dark:border-white/10" />
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
                                <img src={`${import.meta.env.BASE_URL}SocialWork/highLevelDegree.jfif`} alt="High level degree and expertise" className="w-full rounded-2xl shadow-xl object-cover aspect-[2/3] border border-gray-200 dark:border-white/10" />
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
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-12 border-b-2 border-bright-sun-600 pb-4 inline-block">
                        3.Sport Events Management
                    </h2>

                    <div className="space-y-12 md:space-y-16">
                        {/* 1: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT3.jfif`} alt="Sport events" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is a Sport Events Manager and International Elite Sports Coach with significant experience in the organization and management of national and international sport events. </p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/metre.jpeg`} alt="Event organisation" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He has managed and coordinated major national and international sport events, contributing to event planning, technical coordination, and operational management. Notably, he served as Event Manager for the African Rhythmic Gymnastics Championships held in Rwanda, supporting the successful organization of this continental competition.</p>
                            </div>
                        </div>

                        {/* 3: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/masterDegree.jpeg`} alt="Event management" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is currently pursuing a Master's Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese, further strengthening his expertise in sport event management and Olympic sport systems.</p>
                            </div>
                        </div>

                        {/* 4: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENT8.jfif`} alt="Sport events at CSA" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Event planning, technical coordination, and operational management are at the heart of delivering successful competitions and programmes for athletes and communities.</p>
                            </div>
                        </div>

                        {/* 5: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${import.meta.env.BASE_URL}Events/EVENTS.jfif`} alt="Championships and competitions" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
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
                                <img src={`${import.meta.env.BASE_URL}Events/kk.jpeg`} alt="Events at The Champions" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Through sport events, The Champions Sports Academy builds bridges between communities, athletes, and the broader sport system.Excellence in sport event management—supporting athletes, coaches, and the next generation of leaders in sport</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
