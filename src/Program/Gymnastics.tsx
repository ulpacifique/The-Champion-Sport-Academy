import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    IconCalendar,
    IconMapPin,
    IconCheck,
    IconShield,
    IconLeaf,
    IconFriends,
    IconHeartHandshake,
    IconTrophy,
    IconAward,
    IconChevronRight,
    IconPhoto,
    IconX,
    IconChevronLeft
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header/Header';
import { coreValuesData } from '../Data/coreValues';
import { galleryAPI } from '../api/galleryAPI';
import { ASSET_BASE_URL } from '../Services/Api';

const Gymnastics = () => {
    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    // Gymnastics programs data
    const programs = [
        {
            title: "Weekend Training (Ages 3-17)",
            description: "Fundamental movement skills and physical literacy in a fun, safe environment",
            features: ["Basic Movement Skills", "Balance & Coordination", "Social Development", "Body Awareness"],
            icon: <IconHeartHandshake size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL}/athletes/team.JPG`
        },
        {
            title: "Private Home Classes",
            description: "Developing gymnastics skills, strength, and flexibility through personalized training",
            features: ["Personalized Attention", "Strength Development", "Flexibility", "Rapid Progress"],
            icon: <IconTrophy size={24} />,
            schedule: "Mon - Fri: Available by appointment",
            image: `${process.env.PUBLIC_URL}/athletes/athlete-2.jpg`
        },
        {
            title: "Advanced Gymnastics",
            description: "Competitive training and advanced skill development for performance-oriented athletes",
            features: ["Advanced Techniques", "Competition Prep", "Strength Conditioning", "Mental Training"],
            icon: <IconAward size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL}/athletes/athlete-1.jpg`
        }
    ];


    // Gallery State
    const [galleryImages, setGalleryImages] = useState<any[]>([]);
    const [loadingGallery, setLoadingGallery] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const [gymnasticsPhotos, generalPhotos] = await Promise.all([
                    galleryAPI.getImagesByCategory('GYMNASTICS'),
                    galleryAPI.getImagesByCategory('GENERAL')
                ]);

                const allPhotos = [...gymnasticsPhotos, ...generalPhotos]
                    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

                setGalleryImages(allPhotos);
            } catch (error) {
                console.error("Failed to fetch gallery images", error);
            } finally {
                setLoadingGallery(false);
            }
        };

        fetchGallery();
    }, []);

    const handlePrevious = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex(prev => (prev !== null ? (prev === 0 ? galleryImages.length - 1 : prev - 1) : null));
    }, [galleryImages.length, selectedImageIndex]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex(prev => (prev !== null ? (prev === galleryImages.length - 1 ? 0 : prev + 1) : null));
    }, [galleryImages.length, selectedImageIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === "Escape") setSelectedImageIndex(null);
            if (e.key === "ArrowLeft") handlePrevious();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImageIndex, handlePrevious, handleNext]);

    // Core Values (shared data + local icons)
    const valueIcons = [
        <IconShield size={24} key="d" />,
        <IconFriends size={24} key="f" />,
        <IconHeartHandshake size={24} key="t" />,
        <IconLeaf size={24} key="r" />,
        <IconTrophy size={24} key="e" />,
    ];
    const coreValues = coreValuesData.map((v, i) => ({ ...v, icon: valueIcons[i] }));

    return (
        <div className="bg-white dark:bg-cerulean-blue-900 text-cerulean-blue-900 dark:text-white selection:bg-bright-sun-300 selection:text-gray-900 custom-scrollbar transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-white/50 dark:bg-cerulean-blue-900/70 z-10"></div>
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/athletes/Champions.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                <div className="relative z-20 max-w-7xl mx-auto w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs">
                            <IconAward size={16} />
                            <span>The Champions Gymnastics</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight uppercase tracking-tighter decoration-bright-sun-600 dark:decoration-bright-sun-300 underline underline-offset-[20px] decoration-8">
                            The Champions  <span className="text-bright-sun-600 dark:text-bright-sun-300 italic">Gymnastics</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <main>
                {/* About Section */}
                <section className="py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-bright-sun-600/5 dark:bg-bright-sun-300/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div {...fadeInUp}>
                                <span className="text-bright-sun-600 dark:text-bright-sun-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Holistic Development</span>
                                <h2 className="text-4xl md:text-6xl font-black mb-8 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                                    Developing <span className="text-bright-sun-600 dark:text-bright-sun-300">Champions</span> For Life
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium transition-colors">
                                    The Champions Sports Academy is a leading values-driven institution dedicated to the holistic development of children and youth through the power of gymnastics.
                                </p>
                                <div className="space-y-4 mb-12">
                                    {[
                                        "Inclusive & safe training environment",
                                        "Focus on physical literacy & movement",
                                        "Educational and ethical foundations",
                                        "Character development & discipline"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center text-gray-700 dark:text-gray-200 font-bold uppercase tracking-tight text-sm bg-gray-50 dark:bg-cerulean-blue-900/40 p-5 rounded-2xl border border-gray-100 dark:border-white/10 group hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all shadow-sm">
                                            <div className="w-10 h-10 rounded-xl bg-bright-sun-600/10 dark:bg-bright-sun-300/20 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                                                <IconCheck size={20} className="text-bright-sun-600 dark:text-bright-sun-300" />
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-12 border-t border-gray-100 dark:border-white/10 pt-12">
                                    <div>
                                        <div className="text-5xl font-black text-cerulean-blue-900 dark:text-white mb-2 italic tracking-tighter">300+</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] font-black">Active Students</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-black text-cerulean-blue-900 dark:text-white mb-2 italic tracking-tighter">15+</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] font-black">Expert Coaches</div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="absolute -inset-6 bg-bright-sun-600/10 dark:bg-bright-sun-300/10 blur-[100px] rounded-full"></div>
                                <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-gray-50 dark:border-cerulean-blue-900 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/athletes/Instruction.jpg`}
                                        alt="Gymnastics training"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-32 px-4 md:px-8 lg:px-16 bg-gray-50/50 dark:bg-white/[0.02] transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="text-center mb-24"
                        >
                            <h2 className="text-4xl md:text-7xl font-black mb-6 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">Class <span className="text-bright-sun-600 dark:text-bright-sun-300">Programs</span></h2>
                            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-loose">Age-appropriate training designed for long-term development</p>
                        </motion.div>

                        <div className="space-y-40">
                            {programs.map((program, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}
                                >
                                    <div className="flex-1 relative group w-full">
                                        <div className="relative rounded-[3.5rem] overflow-hidden aspect-[4/3] shadow-2xl border-[8px] border-white dark:border-cerulean-blue-900 transition-all duration-700 group-hover:shadow-bright-sun-500/10 dark:group-hover:shadow-bright-sun-300/10 group-hover:-rotate-1">
                                            <img
                                                src={program.image}
                                                alt={program.title}
                                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/80 via-transparent to-transparent opacity-60"></div>
                                            <div className="absolute top-8 left-8 bg-bright-sun-400 dark:bg-bright-sun-300 p-6 rounded-[2rem] shadow-2xl z-10 transition-transform group-hover:scale-110 group-hover:rotate-6">
                                                <div className="text-gray-900">
                                                    {program.icon}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-8 w-full">
                                        <div className="text-bright-sun-600 dark:text-bright-sun-500 font-black text-xs uppercase tracking-[0.5em]">Module 0{index + 1}</div>
                                        <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 dark:text-white leading-tight">{program.title}</h3>
                                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-8 border-bright-sun-600 dark:border-bright-sun-300 pl-8 font-medium">
                                            "{program.description}"
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pt-4">
                                            {program.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group/item">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-bright-sun-600 dark:bg-bright-sun-300 group-hover/item:scale-150 transition-transform shadow-xl shadow-bright-sun-500/20"></div>
                                                    <span className="font-bold uppercase tracking-tight text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-10 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row gap-8 items-center">
                                            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-bright-sun-300">
                                                <IconCalendar className="text-bright-sun-600 dark:text-bright-sun-300" size={20} />
                                                <span>{program.schedule}</span>
                                            </div>
                                            <Link to="/register" className="px-10 py-5 bg-cerulean-blue-900 dark:bg-bright-sun-300 text-white dark:text-gray-900 rounded-3xl font-black transition-all hover:scale-105 shadow-xl uppercase italic tracking-tighter text-lg w-full sm:w-auto text-center">Join Class</Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Core Values */}
                <section className="py-32 px-4 md:px-8 lg:px-16 text-cerulean-blue-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white dark:bg-cerulean-blue-900"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-5 gap-8">
                            {coreValues.map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center text-center p-10 bg-gray-50 dark:bg-cerulean-blue-900/90 rounded-[2.5rem] border border-gray-100 dark:border-white/20 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all shadow-sm dark:shadow-lg dark:shadow-black/20 group cursor-help"
                                >
                                    <div className="w-16 h-16 bg-white dark:bg-cerulean-blue-800 text-bright-sun-600 dark:text-bright-sun-300 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-black mb-4 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tight">{value.name}</h3>
                                    <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 leading-loose uppercase tracking-[0.2em]">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Schedule & Location */}
                <section className="py-32 px-4 md:px-8 lg:px-16 bg-gray-50/50 dark:bg-white/[0.02] transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div {...fadeInUp}>
                                <div className="text-bright-sun-600 dark:text-bright-sun-500 font-black text-xs uppercase tracking-[0.5em] mb-4">Training Academy</div>
                                <h2 className="text-4xl md:text-6xl font-black mb-10 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">Session <span className="text-bright-sun-600 dark:text-bright-sun-300">Availability</span></h2>
                                <div className="space-y-4">
                                    {[
                                        { day: "Monday - Friday", time: "By Appointment", classes: "Home Classes (Individual/Group)" },
                                        { day: "Saturday", time: "10:00 AM - 12:00 PM", classes: "Weekend Training (Morning)" },
                                        { day: "Saturday", time: "3:00 PM - 5:00 PM", classes: "Weekend Training (Afternoon)" },
                                        { day: "Sunday", time: "10:00 AM - 12:00 PM", classes: "Weekend Training (Morning)" },
                                        { day: "Sunday", time: "3:00 PM - 5:00 PM", classes: "Weekend Training (Afternoon)" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex justify-between items-center p-8 rounded-3xl bg-white dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all group shadow-sm">
                                            <div>
                                                <div className="text-xl font-black text-cerulean-blue-900 dark:text-white group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors uppercase italic tracking-tight mb-2">{s.day}</div>
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.2em]">{s.classes}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-black text-bright-sun-600 dark:text-bright-sun-300 uppercase tracking-tighter">{s.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div {...fadeInUp} className="space-y-12">
                                <div>
                                    <div className="p-12 rounded-[3.5rem] bg-bright-sun-400 dark:bg-bright-sun-300 text-gray-900 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -z-0"></div>
                                        <div className="flex items-center gap-4 mb-8 relative z-10">
                                            <IconMapPin size={40} className="text-cerulean-blue-900" />
                                            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-cerulean-blue-900">Headquarters</h3>
                                        </div>
                                        <div className="text-2xl font-black mb-2 relative z-10">The Champions Sport Academy</div>
                                        <div className="text-lg font-bold opacity-80 mb-10 uppercase tracking-widest relative z-10">Kigali, Rwanda</div>
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center px-8 py-4 bg-cerulean-blue-900 text-white rounded-[1.5rem] font-black uppercase italic tracking-tighter hover:scale-105 transition-transform shadow-xl relative z-10"
                                        >
                                            View Map <IconChevronRight size={20} className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 shadow-sm group hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all">
                                        <div className="w-12 h-12 bg-bright-sun-600/10 dark:bg-bright-sun-300/10 rounded-2xl flex items-center justify-center mb-6 border border-bright-sun-600/20">
                                            <IconAward className="text-bright-sun-600 dark:text-bright-sun-300" size={24} />
                                        </div>
                                        <div className="font-black text-cerulean-blue-900 dark:text-white uppercase text-xs mb-1 tracking-widest">Elite Facility</div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-500 font-bold uppercase">Olympic Standards</div>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 shadow-sm group hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all">
                                        <div className="w-12 h-12 bg-bright-sun-600/10 dark:bg-bright-sun-300/10 rounded-2xl flex items-center justify-center mb-6 border border-bright-sun-600/20">
                                            <IconShield className="text-bright-sun-600 dark:text-bright-sun-300" size={24} />
                                        </div>
                                        <div className="font-black text-cerulean-blue-900 dark:text-white uppercase text-xs mb-1 tracking-widest">Safety First</div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-500 font-bold uppercase">Certified Coaches</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-32 px-4 md:px-8 lg:px-16 bg-gray-50/50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto text-center mb-24 px-4">
                        <motion.div {...fadeInUp}>
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic text-cerulean-blue-900 dark:text-white underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">
                                Action <span className="text-bright-sun-600 dark:text-bright-sun-300">Gallery</span>
                            </h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em]">Excellence in Motion.</p>
                        </motion.div>
                    </div>

                    <div className="max-w-[1600px] mx-auto">
                        {loadingGallery ? (
                            <div className="flex justify-center py-20">
                                <div className="w-16 h-16 border-4 border-bright-sun-600 dark:border-bright-sun-300 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 px-4">
                                {galleryImages.map((image, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className="relative group rounded-[2.5rem] overflow-hidden cursor-pointer bg-gray-900/50 border-[6px] border-white dark:border-cerulean-blue-900 shadow-xl"
                                        onClick={() => setSelectedImageIndex(i)}
                                    >
                                        <img
                                            src={image.imageUrl?.startsWith('/') ? `${ASSET_BASE_URL}${image.imageUrl}` : image.imageUrl}
                                            alt={image.title}
                                            className="w-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac0348?w=800&q=80";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500 flex flex-col justify-end p-10 translate-y-8 group-hover:translate-y-0 text-left">
                                            <h4 className="text-white font-black text-2xl mb-2 italic tracking-tighter uppercase">{image.title}</h4>
                                            <p className="text-bright-sun-300 text-xs font-black uppercase tracking-widest">{image.category || 'Gymnastics'}</p>
                                        </div>

                                        <div className="absolute inset-x-0 top-0 bottom-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="p-5 bg-bright-sun-300 rounded-full text-cerulean-blue-950 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                                                <IconPhoto size={32} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Final CTA - white in light mode, blue in dark mode */}
                <section className="py-32 px-4 md:px-8 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-6xl mx-auto bg-white dark:bg-cerulean-blue-800 rounded-[4rem] p-16 md:p-24 text-center shadow-2xl relative overflow-hidden group border border-gray-100 dark:border-white/10"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bright-sun-300/10 dark:bg-bright-sun-300/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-150"></div>
                        <div className="text-bright-sun-600 dark:text-bright-sun-300 text-xs font-black uppercase tracking-[0.6em] mb-10 relative z-10">Start Your Journey</div>
                        <h2 className="text-5xl md:text-8xl font-black mb-12 leading-[0.9] uppercase italic tracking-tighter relative z-10 text-cerulean-blue-900 dark:text-white">READY TO BECOME
                        <br /><span className="text-bright-sun-600 dark:text-bright-sun-300">A CHAMPION?</span></h2>
                        <p className="text-xl md:text-2xl font-black mb-16 text-gray-600 dark:text-gray-200 max-w-3xl mx-auto uppercase tracking-tight relative z-10 italic">Join Rwanda's elite gymnastics program and develop foundations that last a lifetime.</p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
                            <Link to="/register" className="px-14 py-7 bg-bright-sun-500 dark:bg-bright-sun-400 text-gray-900 rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic tracking-tighter dark:hover:bg-bright-sun-300">Register Now</Link>
                            <Link to="/contact" className="px-14 py-7 bg-cerulean-blue-900 dark:bg-white/10 text-white dark:text-white border-2 border-cerulean-blue-900 dark:border-white/20 backdrop-blur-md rounded-[2.5rem] font-black text-2xl hover:bg-cerulean-blue-800 dark:hover:bg-white/20 transition-all uppercase italic tracking-tighter">Get in Touch</Link>
                        </div>
                    </motion.div>
                </section>
            </main>

            {/* Lightbox / Full Screen Preview */}
            <AnimatePresence>
                {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-cerulean-blue-900/98 backdrop-blur-2xl p-4 md:p-10"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[210] border border-white/10"
                            onClick={() => setSelectedImageIndex(null)}
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
                                    src={galleryImages[selectedImageIndex].imageUrl?.startsWith('/') ? `${ASSET_BASE_URL}${galleryImages[selectedImageIndex].imageUrl}` : galleryImages[selectedImageIndex].imageUrl}
                                    alt={galleryImages[selectedImageIndex].title}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac0348?w=800&q=80";
                                    }}
                                />
                            </div>
                            <div className="text-center space-y-4 max-w-3xl px-6">
                                <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    {galleryImages[selectedImageIndex].title}
                                </h3>
                                <div className="h-1 w-20 bg-bright-sun-300 mx-auto rounded-full" />
                                <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs">
                                    {galleryImages[selectedImageIndex].category || 'Gymnastics Academy'}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gymnastics;
