import { useState, useEffect, useCallback } from "react";
import { IconMail, IconPhone, IconPhoto, IconSparkles, IconX, IconChevronLeft, IconChevronRight, IconUserCheck, IconAward, IconTrophy, IconMapPin } from "@tabler/icons-react";
import Header from "../Header/Header";
import { motion, AnimatePresence } from "framer-motion";

const Founder = () => {
    const [animate, setAnimate] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
        title: `Moment ${i + 1}`,
        description: "" // Space left for user to provide descriptions
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
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-950 transition-colors duration-300">
            <Header />
            {/* Founder & CEO Section */}
            <div className="container mx-auto px-4 py-32">
                <div className={`bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-20 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="relative group shrink-0">
                            <div className="absolute -inset-6 bg-bright-sun-600/20 dark:bg-bright-sun-300/20 rounded-full blur-[100px] opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative w-80 aspect-[3/4] rounded-[3rem] overflow-hidden border-[12px] border-white dark:border-cerulean-blue-900 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                <img
                                    src={`${process.env.PUBLIC_URL}/athletes/Noel.jpg`}
                                    alt="Noël Nkuranyabahizi"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/40 to-transparent"></div>
                            </div>
                            {/* Floating Achievement Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-bright-sun-400 dark:bg-bright-sun-300 p-6 rounded-3xl shadow-2xl border-4 border-white dark:border-cerulean-blue-900 z-20 group-hover:rotate-6 transition-transform">
                                <IconTrophy size={32} className="text-gray-900" />
                            </div>
                        </div>

                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-8 font-black uppercase tracking-widest text-xs">
                                <IconSparkles size={16} />
                                <span>Visionary Leadership</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-cerulean-blue-900 dark:text-white mb-4 leading-none uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">Noël Nkuranyabahizi</h1>
                            <div className="text-bright-sun-600 dark:text-bright-sun-300 text-2xl font-black mb-10 uppercase tracking-widest italic tracking-tighter">Founder & CEO</div>

                            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-4xl font-medium">
                                <p className="border-l-8 border-bright-sun-600 dark:border-bright-sun-300 pl-8 italic">
                                    Noël Nkuranyabahizi is the Founder and Chief Executive Officer of The Champions Sports Academy and an International Elite Sports Coach. A former elite karate athlete and Head Coach of the Rwanda National Karate Team (2015–2023), he received the National Sport Coaching Award (2020) from the Rwanda National Olympic and Sports Committee in recognition of his outstanding contribution to sport development in Rwanda.
                                </p>
                                <p>
                                    He became the first karate coach in the world to receive an Olympic Solidarity Scholarship for Coaches after karate was included in the Olympic Games programme. This prestigious scholarship enabled him to attend the CYSél – Cycle International du Sport d’Elite programme in Lausanne, Switzerland, an advanced international coaching programme for elite sport coaches.
                                </p>
                                <p>
                                    His coaching expertise focuses particularly on Karate and Gymnastics, where he works across children’s sport development, high-performance athlete preparation, and coach education, contributing to the development of athletes and coaches at both national and international levels.
                                </p>
                                <p>
                                    His professional engagement extends internationally in coach education, Olympic education, sport event management, and sport for youth development.
                                </p>
                                <p>
                                    Noël is also a Professional Social Worker in Sport and an active member of the Alliance of Social Workers in Sport. He has participated and presented at international symposiums in the United States, including events held in Denver (2019) and New Orleans (2023).
                                </p>
                                <p>
                                    He is currently pursuing a Master’s Degree in Olympic Studies, Olympic Education, Organization and Management of Olympic Events at the International Olympic Academy and the University of Peloponnese.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-12 pt-8 border-t border-gray-200 dark:border-white/5">
                                <a href="mailto:noel@thechampions.rw" className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 hover:text-bright-sun-600 dark:hover:text-bright-sun-300 transition-colors group">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-cerulean-blue-800 rounded-2xl group-hover:scale-110 transition-transform">
                                        <IconMail size={24} className="text-bright-sun-600 dark:text-bright-sun-300" />
                                    </div>
                                    <span className="font-black uppercase tracking-widest text-sm italic">noel@thechampions.rw</span>
                                </a>
                                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-cerulean-blue-800 rounded-2xl">
                                        <IconMapPin size={24} className="text-bright-sun-600 dark:text-bright-sun-300" />
                                    </div>
                                    <span className="font-black uppercase tracking-widest text-sm italic">Kigali, Rwanda</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Founder's Journey Gallery */}
            <div className="container mx-auto px-4 py-32 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 transition-colors duration-300">
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

                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8 max-w-[1600px] mx-auto px-4">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => setSelectedImage(image.id)}
                            className={`group relative bg-white dark:bg-cerulean-blue-900 border-[8px] border-white dark:border-cerulean-blue-900 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 hover:scale-[1.03] shadow-2xl ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {/* Image Container */}
                            <div className="aspect-square overflow-hidden relative">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950 via-transparent to-transparent opacity-60 z-10" />

                                {/* View Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                    <div className="p-5 bg-bright-sun-300 rounded-full text-cerulean-blue-950 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                                        <IconPhoto size={32} />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-8 relative z-20">
                                <h3 className="text-cerulean-blue-900 dark:text-white font-black mb-2 text-xl italic tracking-tighter uppercase transition-colors">
                                    {image.title}
                                </h3>
                                <div className="border-l-4 border-bright-sun-500/30 dark:border-bright-sun-300/30 pl-4 py-2">
                                    <p className="text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest leading-loose">
                                        {image.description || "The Legacy of Excellence"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Full Screen Preview */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-cerulean-blue-950/98 backdrop-blur-2xl p-4 md:p-10"
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
                                    {galleryImages[selectedImage - 1].description || "The Champion Sport Academy Legacy"}
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
