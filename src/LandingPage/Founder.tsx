import { useState, useEffect, useCallback } from "react";
import { IconUserCheck, IconMail, IconPhone, IconPhoto, IconSparkles, IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Header from "../Header/Header";
import { motion, AnimatePresence } from "framer-motion";

const Founder = () => {
    const [animate, setAnimate] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Gallery data for 18 images
    const galleryImages = Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        src: `/ourFounderGallery/${i + 1}.jpeg`,
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
        <div className="min-h-screen bg-cerulean-blue-950">
            <Header />
            {/* Founder & CEO Section */}
            <div className="container mx-auto px-4 py-16">
                <div className={`bg-gray-800/30 border border-gray-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-md transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-br from-bright-sun-200 to-bright-sun-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-48 h-48 bg-gradient-to-br from-bright-sun-200 to-bright-sun-300 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-2xl overflow-hidden">
                                <IconUserCheck size={80} className="text-gray-900" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center space-x-2 bg-bright-sun-300/10 text-bright-sun-300 px-3 py-1 rounded-full border border-bright-sun-300/20 mb-4">
                                <IconSparkles size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Visionary Leadership</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Noël Nkuranyabahizi</h2>
                            <div className="text-bright-sun-300 text-xl font-semibold mb-6">Founder & CEO</div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                                Leading the vision of developing <span className="text-bright-sun-300 font-semibold">"Champions for Life"</span> with an unwavering commitment to
                                professionalism, excellence, and sustainable community impact through the transformative power of sport and education.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                <a href="mailto:noel@thechampions.rw" className="flex items-center space-x-2 text-gray-400 hover:text-bright-sun-300 transition-colors group">
                                    <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-bright-sun-300/10 transition-colors">
                                        <IconMail size={20} className="text-bright-sun-300" />
                                    </div>
                                    <span className="font-medium">noel@thechampions.rw</span>
                                </a>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <div className="p-2 bg-gray-800/50 rounded-lg">
                                        <IconPhone size={20} className="text-bright-sun-300" />
                                    </div>
                                    <span className="font-medium">Kigali, Rwanda</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Founder's Journey Gallery */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 text-bright-sun-300 mb-4">
                        <IconPhoto size={24} />
                        <h2 className="text-3xl font-bold tracking-tight">Founder's Journey</h2>
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A visual exploration of the dedication, growth, and impact built over the years. Click any image to view in full screen.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => setSelectedImage(image.id)}
                            className={`group relative bg-gray-800/20 border border-gray-700/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 hover:border-bright-sun-300/40 hover:scale-[1.02] ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 z-20" />

                                {/* View Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/20">
                                    <div className="p-3 bg-bright-sun-300 rounded-full text-cerulean-blue-950 scale-50 group-hover:scale-100 transition-transform duration-500">
                                        <IconPhoto size={24} />
                                    </div>
                                </div>
                            </div>

                            {/* Description Space */}
                            <div className="p-6 relative z-30">
                                <h3 className="text-white font-bold mb-2 group-hover:text-bright-sun-300 transition-colors">
                                    {image.title}
                                </h3>
                                <div className="min-h-[60px] border-l-2 border-bright-sun-300/20 pl-4">
                                    <p className="text-gray-400 text-sm italic leading-relaxed">
                                        {image.description || "Description placeholder — awaiting details..."}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Accent */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-bright-sun-200 to-bright-sun-400 transition-all duration-500 group-hover:w-full" />
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
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-cerulean-blue-950/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[210] border border-white/5"
                            onClick={() => setSelectedImage(null)}
                        >
                            <IconX size={24} />
                        </motion.button>

                        {/* Navigation Controls */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-[210] pointer-events-none">
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all pointer-events-auto border border-white/5 backdrop-blur-md group"
                                onClick={handlePrevious}
                            >
                                <IconChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all pointer-events-auto border border-white/5 backdrop-blur-md group"
                                onClick={handleNext}
                            >
                                <IconChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>

                        {/* Image Display */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <img
                                    src={galleryImages[selectedImage - 1].src}
                                    alt={galleryImages[selectedImage - 1].title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="text-center space-y-2 max-w-2xl px-4">
                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                                    {galleryImages[selectedImage - 1].title}
                                </h3>
                                <div className="h-0.5 w-12 bg-bright-sun-300 mx-auto" />
                                <p className="text-gray-400 text-lg">
                                    {galleryImages[selectedImage - 1].description || "Visual documentation of our growth and legacy."}
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
