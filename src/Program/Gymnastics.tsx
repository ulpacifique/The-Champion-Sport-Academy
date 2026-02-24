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
    IconAward,
    IconChevronRight,
    IconTarget,
    IconBolt,
    IconPhoto,
    IconUsers,
    IconMedal,
    IconBell
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header/Header';
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
            icon: <IconHeartHandshake className="text-bright-sun-300" size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL}/athletes/team.JPG`
        },
        {
            title: "Private Home Classes",
            description: "Developing gymnastics skills, strength, and flexibility through personalized training",
            features: ["Personalized Attention", "Strength Development", "Flexibility", "Rapid Progress"],
            icon: <IconTrophy className="text-bright-sun-300" size={24} />,
            schedule: "Mon - Fri: Available by appointment",
            image: `${process.env.PUBLIC_URL}/athletes/athlete-2.jpg`
        },
        {
            title: "Advanced Gymnastics",
            description: "Competitive training and advanced skill development for performance-oriented athletes",
            features: ["Advanced Techniques", "Competition Prep", "Strength Conditioning", "Mental Training"],
            icon: <IconAward className="text-bright-sun-300" size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL}/athletes/athlete-1.jpg`
        }
    ];

    // Coaches data
    const coaches = [
        {
            name: "Coach Noel NKURANYABAHIZI",
            certification: "Senior Master & Founder",
            experience: "30+ Years",
            specialty: "Master Coach & Leadership",
            image: `${process.env.PUBLIC_URL}/athletes/Noel.jpg`
        },
        {
            name: "Coach Christina",
            certification: "Academy Manager & Coach",
            experience: "7+ Years",
            specialty: "Gymnastics & Kumite",
            image: `${process.env.PUBLIC_URL}/athletes/Christina.jpg`
        },
        {
            name: "Coach Dushime Sharifu",
            certification: "National Team Athlete",
            experience: "10+ Years",
            specialty: "Acrobatics & Fitness",
            image: `${process.env.PUBLIC_URL}/athletes/Dushime.jpg`
        },
        {
            name: "Coach ABAYISENGA Paremonique",
            certification: "Certified National Coach",
            experience: "12+ Years",
            specialty: "Artistic & Rhythmic",
            image: `${process.env.PUBLIC_URL}/athletes/palmonique.jpg`
        }
    ];

    // Gallery State
    const [galleryImages, setGalleryImages] = useState<any[]>([]);
    const [loadingGallery, setLoadingGallery] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                // Fetch both specifically tagged gymnastics photos and general photos
                const [gymnasticsPhotos, generalPhotos] = await Promise.all([
                    galleryAPI.getImagesByCategory('GYMNASTICS'),
                    galleryAPI.getImagesByCategory('GENERAL')
                ]);

                // Combine and sort by upload date (newest first)
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

    // Core Values
    const coreValues = [
        { name: "Discipline", icon: <IconShield className="text-bright-sun-300" size={24} /> },
        { name: "Friendship", icon: <IconFriends className="text-bright-sun-300" size={24} />, description: "" },
        { name: "Teamwork", icon: <IconHeartHandshake className="text-bright-sun-300" size={24} />, description: "" },
        { name: "Respect", icon: <IconLeaf className="text-bright-sun-300" size={24} />, description: "" },
        { name: "Excellence", icon: <IconTrophy className="text-bright-sun-300" size={24} />, description: "" }
    ];

    return (
        <div className="bg-cerulean-blue-950 text-white selection:bg-bright-sun-300 selection:text-gray-900 custom-scrollbar">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/80 via-cerulean-blue-950/20 to-transparent z-10"></div>
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
                        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight uppercase tracking-tighter">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-sun-100 via-bright-sun-200 to-bright-sun-300">The Champions Gymnastics</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <main>
                {/* About Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-bright-sun-300/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div {...fadeInUp}>
                                <h2 className="text-4xl md:text-5xl font-black mb-8">
                                    Developing <span className="text-bright-sun-300">Champions</span> For Life
                                </h2>
                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                    The Champions Sports Academy is a leading values-driven institution dedicated to the holistic development of children and youth through the power of gymnastics.
                                </p>
                                <div className="space-y-4 mb-10">
                                    {[
                                        "Inclusive & safe training environment",
                                        "Focus on physical literacy & movement",
                                        "Educational and ethical foundations",
                                        "Character development & discipline"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center text-gray-200">
                                            <div className="w-6 h-6 rounded-full bg-bright-sun-300/20 flex items-center justify-center mr-3 border border-bright-sun-300/30">
                                                <IconCheck size={14} className="text-bright-sun-300" />
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                                    <div>
                                        <div className="text-3xl font-black text-white mb-2">300+</div>
                                        <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Students</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-white mb-2">15+</div>
                                        <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Expert Coaches</div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="absolute -inset-4 bg-bright-sun-300/20 rounded-3xl blur-2xl"></div>
                                <img
                                    src={`${process.env.PUBLIC_URL}/athletes/Instruction.jpg`}
                                    alt="Gymnastics training"
                                    className="relative rounded-3xl border border-white/10 shadow-2xl z-10"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="text-center mb-20"
                        >
                            <h2 className="text-4xl md:text-5xl font-black mb-6">World-Class <span className="text-bright-sun-300">Programs</span></h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Age-appropriate training designed for long-term development</p>
                        </motion.div>

                        <div className="space-y-32">
                            {programs.map((program, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
                                >
                                    <div className="flex-1 relative group">
                                        <div className="absolute -inset-4 bg-bright-sun-300/10 rounded-3xl blur-xl group-hover:bg-bright-sun-300/20 transition-all"></div>
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                                            <img
                                                src={program.image}
                                                alt={program.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950 via-transparent to-transparent opacity-60"></div>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-8">
                                        <div className="inline-flex p-4 rounded-2xl bg-bright-sun-300/10 border border-bright-sun-300/20 text-bright-sun-300">
                                            {program.icon}
                                        </div>
                                        <h3 className="text-3xl font-black uppercase tracking-tight">{program.title}</h3>
                                        <p className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-bright-sun-300 pl-6">
                                            "{program.description}"
                                        </p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {program.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-gray-400 group">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-bright-sun-300 group-hover:scale-150 transition-transform"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6">
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <IconCalendar className="text-bright-sun-300" />
                                                <span className="text-sm font-medium">{program.schedule}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Coaches Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Expert <span className="text-bright-sun-300">Instructors</span></h2>
                            <p className="text-xl text-gray-400">Learning from the national and international masters</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coaches.map((coach, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 mb-6 shadow-2xl">
                                        <img
                                            src={coach.image}
                                            alt={coach.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="text-xs font-bold text-bright-sun-300 uppercase tracking-widest mb-1">{coach.certification}</div>
                                            <div className="text-xl font-black text-white">{coach.name}</div>
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <div className="text-sm text-gray-400 font-medium">{coach.specialty}</div>
                                        <div className="text-xs text-bright-sun-300/60 font-bold uppercase mt-1">{coach.experience} Experience</div>
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
                                    <div className="w-16 h-16 bg-gray-900 text-bright-sun-300 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
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
                <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16">
                            <motion.div {...fadeInUp}>
                                <h2 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Schedule & <span className="text-bright-sun-300">Place</span></h2>
                                <div className="space-y-4">
                                    {[
                                        { day: "Monday - Friday", time: "Available by Appointment", classes: "Home Classes (Individual/Group)" },
                                        { day: "Saturday", time: "10:00 AM - 12:00 PM", classes: "Weekend Training (Morning Session)" },
                                        { day: "Saturday", time: "3:00 PM - 5:00 PM", classes: "Weekend Training (Afternoon Session)" },
                                        { day: "Sunday", time: "10:00 AM - 12:00 PM", classes: "Weekend Training (Morning Session)" },
                                        { day: "Sunday", time: "3:00 PM - 5:00 PM", classes: "Weekend Training (Afternoon Session)" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex justify-between items-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-bright-sun-300/30 transition-all group">
                                            <div>
                                                <div className="text-lg font-bold text-white group-hover:text-bright-sun-300 transition-colors">{s.day}</div>
                                                <div className="text-sm text-gray-500 font-bold uppercase">{s.classes}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-black text-bright-sun-300">{s.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div {...fadeInUp} className="space-y-12">
                                <div>
                                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                        <IconMapPin className="text-bright-sun-300" /> LOCATION
                                    </h3>
                                    <div className="p-8 rounded-3xl bg-bright-sun-300 text-gray-900 shadow-2xl">
                                        <div className="text-2xl font-black mb-2">The Champions Sport Academy</div>
                                        <div className="text-lg font-bold opacity-80 mb-6 uppercase tracking-wider">Kigali, Rwanda</div>
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                                        >
                                            Get Directions <IconChevronRight size={18} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                        <IconAward className="text-bright-sun-300 mb-3" />
                                        <div className="font-black text-white uppercase text-sm mb-1">Elite Facility</div>
                                        <div className="text-xs text-gray-500 font-medium">Olympic-standard equipment</div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                        <IconShield className="text-bright-sun-300 mb-3" />
                                        <div className="font-black text-white uppercase text-sm mb-1">Safety First</div>
                                        <div className="text-xs text-gray-500 font-medium">Safe Sport Certified</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-24 px-4 md:px-8 lg:px-16 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto text-center mb-16 px-4">
                        <motion.div {...fadeInUp}>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">
                                Action <span className="text-bright-sun-300">Gallery</span>
                            </h2>
                            <p className="text-gray-400 font-medium uppercase tracking-widest">Witness the Excellence</p>
                        </motion.div>
                    </div>

                    <div className="max-w-[1600px] mx-auto">
                        {loadingGallery ? (
                            <div className="flex justify-center py-20">
                                <div className="w-12 h-12 border-4 border-bright-sun-300 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 px-4">
                                {galleryImages.map((image, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className="relative group rounded-3xl overflow-hidden cursor-pointer"
                                    >
                                        <img
                                            src={image.imageUrl?.startsWith('/') ? `${ASSET_BASE_URL}${image.imageUrl}` : image.imageUrl}
                                            alt={image.title}
                                            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac0348?w=800&q=80";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-300 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 text-left">
                                            <h4 className="text-white font-black text-xl mb-1">{image.title}</h4>
                                            <p className="text-bright-sun-300 text-sm font-bold uppercase">{image.category || 'Gymnastics'}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 px-4 md:px-8 lg:px-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bright-sun-300/5 to-transparent"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10 max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter uppercase italic">
                            READY TO BECOME <br />
                            <span className="text-bright-sun-300">A CHAMPION?</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                            Join Rwanda's Champion gymnastics academy and start your journey towards excellence today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                to="/register"
                                className="px-12 py-5 bg-bright-sun-300 text-gray-900 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(250,204,21,0.2)]"
                            >
                                REGISTER NOW
                            </Link>
                            <Link
                                to="/contact"
                                className="px-12 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xl hover:bg-white/10 transition-all"
                            >
                                CONTACT US
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
};

export default Gymnastics;
