import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IconCalendar,
    IconMapPin,
    IconStar,
    IconCheck,
    IconShield,
    IconLeaf,
    IconFriends,
    IconHeartHandshake,
    IconTrophy,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import { galleryAPI } from '../api/galleryAPI';
import { ASSET_BASE_URL } from '../Services/Api';

const Karate = () => {
    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };


    // Karate programs data
    const programs = [
        {
            title: "Weekend Training (Ages 3–17)",
            description: "Intensive weekend sessions focusing on technique, fitness, and sparring",
            features: ["Basic & Advanced Techniques", "Conditioning", "Sparring Sessions", "Kata Training"],
            icon: <IconShield className="text-bright-sun-400" size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL} /athletes/Karate.JPG`
        },
        {
            title: "Private Home Classes",
            description: "Personalized individual or small group training at your convenience",
            features: ["Personalized Attention", "Flexible Scheduling", "Rapid Progress", "Focused Training"],
            icon: <IconStar className="text-bright-sun-400" size={24} />,
            schedule: "Mon - Fri: Available by appointment",
            image: `${process.env.PUBLIC_URL} /athletes/Class.jpg`
        },
        {
            title: "Competition Team",
            description: "Specialized training for athletes preparing for local and international tournaments",
            features: ["Elite Coaching", "Strategy Tactics", "Team Building", "Tournament Support"],
            icon: <IconTrophy className="text-bright-sun-400" size={24} />,
            schedule: "Selected Weekends & Camps",
            image: `${process.env.PUBLIC_URL} /athletes/competion.jpg`
        }
    ];

    // Instructors data
    const instructors = [
        {
            name: "Sensei NKURANYABAHIZI Noel",
            rank: "Senior Master & Founder",
            experience: "30+ Years Experience",
            specialty: "Master Coach & Leadership",
            description: "Founder of The Champion Sport Academy and Former Head Coach of Rwanda Karate National Team.",
            image: `${process.env.PUBLIC_URL} /athletes/Noel.jpg`
        },
        {
            name: "Sensei ABAYISENGA Paremonique",
            rank: "Certified National Coach",
            experience: "12+ Years Experience",
            specialty: "Kata & Child Development",
            description: "National medalist and certified coach passionate about holistic athlete development.",
            image: `${process.env.PUBLIC_URL} /athletes/palmonique.jpg`
        },
        {
            name: "Sensei DUSHIME SHARIFU",
            rank: "National Team Athlete",
            experience: "39+ Medals Won",
            specialty: "High-Performance Kumite",
            description: "Bronze medalist at Commonwealth Championship and FERWAKA certified coach.",
            image: `${process.env.PUBLIC_URL} /athletes/sharif.WEBP`
        },
        {
            name: "Sensei Khalif",
            rank: "Senior Instructor",
            experience: "Expert Trainer",
            specialty: "Youth Development",
            description: "Dedicated instructor focused on building discipline and technical excellence.",
            image: `${process.env.PUBLIC_URL} /athletes/Khalif.PNG`
        }
    ];

    // Gallery State
    const [galleryImages, setGalleryImages] = useState<any[]>([]);
    const [loadingGallery, setLoadingGallery] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const [karatePhotos, generalPhotos] = await Promise.all([
                    galleryAPI.getImagesByCategory('KARATE'),
                    galleryAPI.getImagesByCategory('GENERAL')
                ]);

                const allPhotos = [...karatePhotos, ...generalPhotos]
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

    // Core Values
    const coreValues = [
        { name: "Discipline", icon: <IconShield className="text-bright-sun-400" size={24} />, description: "Commitment to consistent practice and excellence" },
        { name: "Friendship", icon: <IconFriends className="text-bright-sun-400" size={24} />, description: "Building supportive relationships through sport" },
        { name: "Teamwork", icon: <IconHeartHandshake className="text-bright-sun-400" size={24} />, description: "Collaborating for shared success and growth" },
        { name: "Respect", icon: <IconLeaf className="text-bright-sun-400" size={24} />, description: "Valuing coaches, teammates, and the sport" },
        { name: "Excellence", icon: <IconTrophy className="text-bright-sun-400" size={24} />, description: "Striving for personal and team best" }
    ];

    return (
        <div className="bg-cerulean-blue-950 text-white selection:bg-bright-sun-400 selection:text-gray-900 custom-scrollbar">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/80 via-cerulean-blue-950/20 to-transparent z-10"></div>
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/athletes/Karate.JPG)`,
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
                        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight uppercase tracking-tighter">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-sun-400 via-bright-sun-300 to-bright-sun-500">The Champions Karate</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <main>
                {/* Philosophy Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-bright-sun-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="grid lg:grid-cols-2 gap-16 items-center"
                        >
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-bright-sun-400 to-transparent opacity-20 blur-2xl rounded-3xl"></div>
                                <img
                                    src={`${process.env.PUBLIC_URL} /athletes/karate.png`}
                                    alt="Karate Philosophy"
                                    className="rounded-3xl shadow-2xl relative z-10 border border-white/10"
                                />
                                <div className="absolute -bottom-10 -right-10 bg-gradient-to-br from-bright-sun-400 to-bright-sun-600 p-8 rounded-3xl shadow-2xl z-20 hidden md:block">
                                    <div className="text-4xl font-black text-gray-900 italic">20+</div>
                                    <div className="text-gray-900/80 font-bold leading-tight">Years of<br />Dedication</div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Karate <span className="text-bright-sun-400 italic">Philosophy</span></h2>
                                <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                                    Karate at <span className="text-white font-semibold">The Champions Sports Academy</span> is a balanced journey of physical prowess and mental fortitude. We cultivate more than just combat skills—we build foundations for life.
                                </p>
                                <div className="grid gap-6">
                                    {[
                                        "Traditional Japanese basics with modern execution",
                                        "Character development & peak physical conditioning",
                                        "Elite tournament preparation & competition spirit",
                                        "Safe, inclusive environment for all skill levels"
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start bg-white/5 p-4 rounded-2xl border border-white/5"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-bright-sun-400/20 flex items-center justify-center mr-4 shrink-0">
                                                <IconCheck className="text-bright-sun-400" size={18} />
                                            </div>
                                            <span className="text-gray-200 font-medium">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16 ">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-6xl font-black mb-6">World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-sun-400 to-bright-sun-500">Programs</span></h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Precision-engineered training for every stage of development.</p>
                        </motion.div>

                        <div className="space-y-32">
                            {programs.map((program, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                                >
                                    {/* Image side */}
                                    <div className="w-full lg:w-1/2 group">
                                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl border border-white/5">
                                            <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/60 to-transparent"></div>
                                            <div className="absolute top-8 left-8 bg-bright-sun-400 text-gray-900 p-5 rounded-3xl shadow-2xl scale-110">
                                                {program.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text side */}
                                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                                        <div className="text-bright-sun-400 font-black text-sm uppercase tracking-[0.3em] mb-4">Program {index + 1}</div>
                                        <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{program.title}</h3>
                                        <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-xl">{program.description}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-lg">
                                            {program.features.map((f, i) => (
                                                <div key={i} className="flex items-center text-gray-300">
                                                    <IconCheck className="text-bright-sun-400 mr-3 shrink-0" size={18} />
                                                    <span className="font-medium text-lg">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                                            <div className="flex items-center text-sm text-bright-sun-400 font-bold uppercase tracking-widest bg-white/5 py-3 px-6 rounded-2xl border border-white/10">
                                                <IconCalendar className="mr-3" size={18} />
                                                {program.schedule}
                                            </div>
                                            <Link
                                                to="/register"
                                                className="px-8 py-4 bg-bright-sun-400 text-gray-900 rounded-2xl font-black transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(250,204,21,0.2)] text-center w-full sm:w-auto"
                                            >
                                                Join Program
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Instructors Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16 relative">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">The <span className="text-bright-sun-400 italic">Masters</span></h2>
                                <p className="text-gray-400 text-lg max-w-xl">Learn directly from elite coaches who have shaped the national karate landscape for decades.</p>
                            </div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {instructors.map((instructor, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/10"
                                >
                                    <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950 via-cerulean-blue-950/20 to-transparent transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="text-bright-sun-400 font-bold text-xs uppercase tracking-widest mb-2 px-2 py-1 bg-cerulean-blue-900/80 inline-block rounded-md border border-bright-sun-400/20">
                                            {instructor.rank}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{instructor.name}</h3>
                                        <div className="text-gray-400 text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {instructor.description.substring(0, 100)}...
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 bg-cerulean-blue-950 px-4 md:px-8 lg:px-16 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            {coreValues.map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center text-center p-8 bg-gray-900/5 rounded-3xl border border-gray-900/10 hover:bg-cerulean-blue-900 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-gray-900 text-bright-sun-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-black mb-3">{value.name}</h3>
                                    <p className="text-sm font-medium text-gray-200 leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Schedule & Location */}
                <section className="py-24 px-4 md:px-8 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16">
                            <motion.div {...fadeInUp}>
                                <h2 className="text-4xl font-bold mb-8">Access the <span className="text-bright-sun-400">Dojo</span></h2>
                                <div className="space-y-4">
                                    {[
                                        { day: "Weekdays", time: "By Appointment", label: "Private Classes" },
                                        { day: "Saturday", time: "10:00 - 12:00 / 15:00 - 17:00", label: "Weekend Intensive" },
                                        { day: "Sunday", time: "10:00 - 12:00 / 15:00 - 17:00", label: "Competition Prep" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                            <div>
                                                <div className="font-bold text-white text-lg">{s.day}</div>
                                                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{s.label}</div>
                                            </div>
                                            <div className="text-bright-sun-400 font-black text-right">{s.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                                <div className="h-full bg-cerulean-blue-900/50 rounded-3xl p-10 border border-white/10 flex flex-col justify-center">
                                    <div className="flex items-start mb-10">
                                        <div className="w-12 h-12 bg-bright-sun-400 rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-bright-sun-400/20">
                                            <IconMapPin className="text-gray-900" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2 italic">Headquarters</h3>
                                            <p className="text-gray-400 text-lg">Kigali, Rwanda<br />Professional Grade Karate Training Facility</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {["Pro Tatami Mats", "Full Sparring Gear", "Safety Monitored", "Parent Zones"].map((feat, i) => (
                                            <div key={i} className="flex items-center text-sm font-medium text-gray-300 bg-white/5 px-4 py-3 rounded-xl">
                                                <IconCheck className="text-bright-sun-400 mr-2 shrink-0" size={16} />
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                <section className="py-24 px-4 md:px-8 lg:px-16 bg-white/[0.02] border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black mb-4 italic">Action <span className="text-bright-sun-400 Not-italic">Gallery</span></h2>
                            <p className="text-gray-400 text-lg">Visual proof of our commitment to excellence.</p>
                        </div>

                        {loadingGallery ? (
                            <div className="flex flex-col items-center py-20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-10 h-10 border-4 border-bright-sun-400 border-t-transparent rounded-full mb-4"
                                />
                                <p className="text-white/50 animate-pulse font-medium">Curating our best moments...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {galleryImages.map((image, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 0.98 }}
                                        className={`group relative overflow-hidden rounded-2xl aspect-square border border-white/10 ${idx % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                                    >
                                        <img
                                            src={image.imageUrl?.startsWith('/') ? `${ASSET_BASE_URL}${image.imageUrl}` : image.imageUrl}
                                            alt={image.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600"; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all p-4 flex flex-col justify-end">
                                            <p className="text-xs font-bold text-white truncate">{image.title}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 px-4 md:px-8 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-5xl mx-auto bg-gradient-to-br from-bright-sun-400 to-bright-sun-600 rounded-[3rem] p-12 md:p-20 text-center text-gray-900 shadow-[0_40px_100px_rgba(250,204,21,0.2)] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to Become a<br />World Champion?</h2>
                        <p className="text-xl font-bold mb-12 text-cerulean-blue-950/80 max-w-2xl mx-auto">Join the 20+ year legacy of excellence. Secure your future in the martial arts with The Champions Karate.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center italic">
                            <Link to="/register" className="px-10 py-5 bg-cerulean-blue-950 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">Register Now</Link>
                            <Link to="/contact" className="px-10 py-5 bg-white/20 backdrop-blur-md rounded-2xl font-black text-xl hover:bg-white/30 transition-all border border-cerulean-blue-900/10">Contact Masters</Link>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
};

export default Karate;