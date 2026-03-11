import { useState, useEffect, useCallback } from "react";
import { IconPhoto, IconSparkles, IconX, IconChevronLeft, IconChevronRight, IconTrophy, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Header from "../Header/Header";
import { motion, AnimatePresence } from "framer-motion";

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
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
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

    // Gallery data for 18 images
    const galleryImages = Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        src: `${process.env.PUBLIC_URL}/OurFounderGallery/${i + 1}.jpeg`,
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

    return (
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 transition-colors duration-300">
            <Header />
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
                                            src={`${process.env.PUBLIC_URL}/athletes/Noel.jpg`}
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
                                <img src={`${process.env.PUBLIC_URL}/coahing/team2.jfif`} alt="Team coaching" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is an International Elite Sports Coach, coach developer, and sport development leader specializing in multi-sport athlete development, particularly in Karate and Gymnastics.</p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/team rwanda.jpeg`} alt="Team Rwanda" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is the Founder and Chief Executive Officer of The Champions Sports Academy in Kigali, Rwanda, an organization dedicated to promoting physical literacy, Olympic values, and long-term athlete development for children and youth.</p>
                            </div>
                        </div>

                        {/* 3: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/IM1.jfif`} alt="Elite coaching" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>A 4th Dan Black Belt in Karate, Noël served as Head Coach of the Rwanda National Karate Team (2015–2023), where he led national athlete development programmes and prepared athletes for regional and continental competitions.</p>
                            </div>
                        </div>

                        {/* 4: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/in camp.jpg`} alt="In camp" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>His work focuses on elite coaching, grassroots sport development, and coach education, supporting both athletes and coaches through structured development pathways.</p>
                            </div>
                        </div>

                        {/* 5: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/in stade.JPG`} alt="In stade" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is the recipient of the National Sport Coaching Award (2020) from the Rwanda National Olympic and Sports Committee in recognition of his contribution to sport development in Rwanda.</p>
                            </div>
                        </div>

                        {/* 6: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/award.jfif`} alt="Award" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He also received an Olympic Solidarity Scholarship for Coaches, which enabled him to attend the CYSél – Cycle International du Sport d'Elite programme in Lausanne, Switzerland, an advanced international programme for elite sport coaches.</p>
                            </div>
                        </div>

                        {/* 7: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/team.jfif`} alt="Team" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Through his leadership and international engagement, Noël contributes to strengthening coaching systems, athlete development, and values-based sport education.</p>
                            </div>
                        </div>

                        {/* 8: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/graduation.jpg`} alt="Graduation" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>He is currently pursuing a Master's Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese.</p>
                            </div>
                        </div>

                        {/* 9: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/coahing/master sinzi.jpeg`} alt="Master Sinzi" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
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
                                <img src={`${process.env.PUBLIC_URL}/SocialWork/Sport International Symposium.jfif`} alt="Sport International Symposium" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël Nkuranyabahizi is a Professional Social Worker in Sport whose work focuses on the use of sport as a tool for youth development, psychosocial well-being, and positive social change. With a Bachelor's Degree in Social Work, he integrates social work principles with sport coaching and athlete development to support the holistic well-being of children, youth, athletes, and coaches.</p>
                            </div>
                        </div>

                        {/* 2: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/SocialWork/global Dialogue.jfif`} alt="Global dialogue on sport and social development" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Through his professional engagement in the field of sport and social work, he became a member of the Alliance of Social Workers in Sport (ASWIS) based in the United States, an international network dedicated to advancing social work practice in sport environments.</p>
                            </div>
                        </div>

                        {/* 3: words left, photo right */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/SocialWork/member Of Alliance.jfif`} alt="Member of Alliance of Social Workers in Sport" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>Noël has contributed to the global dialogue on sport and social development through international academic presentations. In 2019, he presented at the Social Work in Sport International Symposium in Denver, Colorado, where he delivered a presentation on "The Role of Karate in Improving Children's Self-Esteem," highlighting how martial arts can contribute to confidence building, discipline, and psychosocial development among young participants.</p>
                            </div>
                        </div>

                        {/* 4: photo left, words right */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                            <div className="w-full md:w-2/5 shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/SocialWork/highLevelDegree.jfif`} alt="High level degree and expertise" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3] border border-gray-200 dark:border-white/10" />
                            </div>
                            <div className="flex-1 text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
                                <p>He also presented at the Social Work in Sport International Symposium held at Tulane University in New Orleans, Louisiana, where he shared research on "The Impact of Elite Sport Coaching Activities on the Coaches' Mental Well-being in Rwanda." His work examined the psychological pressures experienced by elite sport coaches and emphasized the importance of supportive systems that protect the mental health and well-being of coaching professionals.</p>
                                <p>Through his work in coaching, youth sport development, and social work in sport, Noël continues to advocate for sport as a powerful platform for education, inclusion, mental well-being, and community development, contributing to both national and international discussions on the social value of sport.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Sport Events Management */}
            <section id="sport-events-management" className="container mx-auto px-4 py-20 md:py-28 scroll-mt-24">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-6 uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                        Sport Events Management
                    </h2>
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>Noël Nkuranyabahizi is a Sport Events Manager and International Elite Sports Coach with significant experience in the organization and management of national and international sport events. He is the Founder and Chief Executive Officer of The Champions Sports Academy in Kigali, Rwanda, where he leads the development of sport programmes, competitions, and youth sport initiatives.</p>
                        <p>He has managed and coordinated major national and international sport events, contributing to event planning, technical coordination, and operational management. Notably, he served as Event Manager for the African Rhythmic Gymnastics Championships held in Rwanda, supporting the successful organization of this continental competition.</p>
                        <p>He is currently pursuing a Master's Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese, further strengthening his expertise in sport event management and Olympic sport systems.</p>
                    </div>
                </div>
            </section>

            {/* Lightbox / Full Screen Preview */}
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
        </div>
    );
};

export default Founder;
