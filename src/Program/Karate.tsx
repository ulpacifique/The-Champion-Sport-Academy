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
import { coreValuesData } from '../Data/coreValues';

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
            icon: <IconShield size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL}/athletes/Karate.JPG`
        },
        {
            title: "Private Home Classes",
            description: "Personalized individual or small group training at your convenience",
            features: ["Personalized Attention", "Flexible Scheduling", "Rapid Progress", "Focused Training"],
            icon: <IconStar size={24} />,
            schedule: "Mon - Fri: Available by appointment",
            image: `${process.env.PUBLIC_URL}/athletes/Class.jpg`
        },
        {
            title: "Competition Team",
            description: "Specialized training for athletes preparing for local and international tournaments",
            features: ["Elite Coaching", "Strategy Tactics", "Team Building", "Tournament Support"],
            icon: <IconTrophy size={24} />,
            schedule: "Selected Weekends & Camps",
            image: `${process.env.PUBLIC_URL}/athletes/competion.jpg`
        }
    ];

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
                <div className="absolute inset-0 bg-white dark:bg-cerulean-blue-900/80 z-10"></div>
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
                        <div className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs">
                            <IconShield size={16} />
                            <span>The Champions Karate</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight uppercase tracking-tighter decoration-bright-sun-600 dark:decoration-bright-sun-300 underline underline-offset-[20px] decoration-8">
                            The Champions <span className="text-bright-sun-600 dark:text-bright-sun-300 italic">Karate</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <main>
                {/* Philosophy Section */}
                <section className="py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-bright-sun-600/5 dark:bg-bright-sun-300/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="grid lg:grid-cols-2 gap-20 items-center"
                        >
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -inset-6 bg-bright-sun-600/10 dark:bg-bright-sun-300/10 blur-[100px] rounded-full"></div>
                                <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-gray-50 dark:border-cerulean-blue-900 shadow-2xl">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/athletes/karate.png`}
                                        alt="Karate Philosophy"
                                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -right-10 bg-bright-sun-400 dark:bg-gradient-to-br dark:from-bright-sun-100 dark:to-bright-sun-300 p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-4 border-white dark:border-cerulean-blue-900">
                                    <div className="text-5xl font-black text-gray-900 italic tracking-tighter line-height-[1]">20+</div>
                                    <div className="text-gray-900/80 font-black uppercase tracking-widest text-xs">Years of<br />Dedication</div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <span className="text-bright-sun-600 dark:text-bright-sun-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">The Path of the Warrior</span>
                                <h2 className="text-4xl md:text-6xl font-black mb-8 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">Our Karate <span className="text-bright-sun-600 dark:text-bright-sun-300">Philosophy</span></h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium">
                                    Karate at <span className="text-cerulean-blue-900 dark:text-white font-black italic">The Champions Sports Academy</span> is a balanced journey of physical prowess and mental fortitude. We cultivate more than just combat skills—we build foundations for life.
                                </p>
                                <div className="grid gap-4">
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
                                            className="flex items-center bg-gray-50 dark:bg-cerulean-blue-900/40 p-5 rounded-2xl border border-gray-100 dark:border-white/10 group hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all shadow-sm dark:shadow-none"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-bright-sun-600/10 dark:bg-bright-sun-300/20 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                                                <IconCheck className="text-bright-sun-600 dark:text-bright-sun-300" size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-200 font-bold uppercase tracking-tight text-sm">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-32 px-4 md:px-8 lg:px-16 bg-gray-50/50 dark:bg-white/[0.02] transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="text-center mb-24"
                        >
                            <h2 className="text-4xl md:text-7xl font-black mb-6 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">World-Class <span className="text-bright-sun-600 dark:text-bright-sun-300">Programs</span></h2>
                            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-loose">Precision-engineered training for every stage of development.</p>
                        </motion.div>

                        <div className="space-y-40">
                            {programs.map((program, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
                                >
                                    {/* Image side */}
                                    <div className="w-full lg:w-1/2 group">
                                        <div className="relative rounded-[3.5rem] overflow-hidden aspect-[4/3] shadow-2xl border-[8px] border-white dark:border-cerulean-blue-900 transition-all duration-700 group-hover:shadow-bright-sun-500/10 dark:group-hover:shadow-bright-sun-300/10 group-hover:-rotate-1">
                                            <img src={program.image} alt={program.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/80 via-transparent to-transparent opacity-60"></div>
                                            <div className="absolute top-8 left-8 bg-bright-sun-400 dark:bg-bright-sun-300 p-6 rounded-[2rem] shadow-2xl z-10 transition-transform group-hover:scale-110 group-hover:rotate-6">
                                                <div className="text-gray-900">
                                                    {program.icon}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text side */}
                                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                                        <div className="text-bright-sun-600 dark:text-bright-sun-500 font-black text-xs uppercase tracking-[0.5em] mb-4">Level {index + 1}</div>
                                        <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">{program.title}</h3>
                                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-loose font-medium">{program.description}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 w-full max-w-lg text-left">
                                            {program.features.map((f, i) => (
                                                <div key={i} className="flex items-center text-gray-700 dark:text-gray-300 group/feature transition-all">
                                                    <div className="w-6 h-6 rounded-full bg-bright-sun-600/10 dark:bg-bright-sun-300/10 flex items-center justify-center mr-3 group-hover/feature:bg-bright-sun-600 dark:group-hover/feature:bg-bright-sun-300 transition-colors">
                                                        <IconCheck className="text-bright-sun-600 dark:text-bright-sun-300 group-hover/feature:text-white dark:group-hover/feature:text-gray-900 transition-colors" size={12} />
                                                    </div>
                                                    <span className="font-bold text-sm uppercase tracking-tight">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-8 w-full border-t border-gray-100 dark:border-white/5 pt-10">
                                            <div className="flex items-center text-xs text-cerulean-blue-900 dark:text-bright-sun-300 font-black uppercase tracking-[0.2em]">
                                                <IconCalendar className="mr-3 text-bright-sun-600 dark:text-bright-sun-300" size={20} />
                                                {program.schedule}
                                            </div>
                                            <Link
                                                to="/register"
                                                className="px-10 py-5 bg-cerulean-blue-900 dark:bg-bright-sun-300 text-white dark:text-gray-900 rounded-3xl font-black transition-all hover:scale-105 shadow-xl hover:shadow-2xl text-center w-full sm:w-auto uppercase italic tracking-tighter text-lg"
                                            >
                                                Join Now
                                            </Link>
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
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 leading-loose uppercase tracking-[0.1em]">{value.description}</p>
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
                                <div className="text-bright-sun-600 dark:text-bright-sun-500 font-black text-xs uppercase tracking-[0.5em] mb-4">Training Grounds</div>
                                <h2 className="text-4xl md:text-6xl font-black mb-8 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">Access the <span className="text-bright-sun-600 dark:text-bright-sun-300">Dojo</span></h2>
                                <div className="space-y-4">
                                    {[
                                        { day: "Weekdays", time: "By Appointment", label: "Private Classes" },
                                        { day: "Saturday", time: "10:00 - 12:00 / 15:00 - 17:00", label: "Weekend Intensive" },
                                        { day: "Sunday", time: "10:00 - 12:00 / 15:00 - 17:00", label: "Competition Prep" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-8 bg-white dark:bg-cerulean-blue-900/40 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all shadow-sm dark:shadow-none group">
                                            <div>
                                                <div className="font-black text-cerulean-blue-900 dark:text-white text-xl uppercase italic tracking-tight mb-2">{s.day}</div>
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.2em]">{s.label}</div>
                                            </div>
                                            <div className="text-bright-sun-600 dark:text-bright-sun-300 font-black text-right text-lg uppercase tracking-tighter">{s.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                                <div className="h-full bg-cerulean-blue-900 dark:bg-white rounded-[3.5rem] p-12 md:p-16 border border-cerulean-blue-800 dark:border-gray-100 flex flex-col justify-center shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 dark:bg-bright-sun-600/5 blur-3xl -z-0"></div>
                                    
                                    <div className="flex items-start mb-12 relative z-10">
                                        <div className="w-16 h-16 bg-white dark:bg-cerulean-blue-900 rounded-[1.25rem] flex items-center justify-center mr-8 shadow-xl group-hover:scale-110 transition-transform">
                                            <IconMapPin className="text-cerulean-blue-900 dark:text-bright-sun-300" size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-white dark:text-cerulean-blue-900 mb-2 uppercase italic tracking-tighter">Headquarters</h3>
                                            <p className="text-cerulean-blue-100 dark:text-gray-500 text-lg font-bold uppercase tracking-wide">Kigali, Rwanda<br />Professional Grade Karate Facility</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 relative z-10">
                                        {["Pro Tatami Mats", "Full Sparring Gear", "Safety Monitored", "Parent Zones"].map((feat, i) => (
                                            <div key={i} className="flex items-center text-[10px] font-black uppercase tracking-widest text-white/80 dark:text-gray-600 bg-white/5 dark:bg-gray-50 px-5 py-4 rounded-2xl border border-white/10 dark:border-gray-200 shadow-inner">
                                                <IconCheck className="text-bright-sun-300 dark:text-bright-sun-600 mr-3 shrink-0" size={16} />
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 px-4 md:px-8 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-6xl mx-auto bg-bright-sun-400 dark:bg-bright-sun-300 rounded-[4rem] p-16 md:p-24 text-center text-gray-900 shadow-[0_40px_100px_rgba(250,204,21,0.25)] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-150"></div>
                        <div className="text-cerulean-blue-900 text-xs font-black uppercase tracking-[0.5em] mb-8 relative z-10">Join the Legacy</div>
                        <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] uppercase italic tracking-tighter relative z-10">Become a<br />World <span className="text-white dark:text-cerulean-blue-950">Champion</span></h2>
                        <p className="text-xl md:text-2xl font-black mb-16 text-cerulean-blue-950/80 max-w-3xl mx-auto uppercase tracking-tight relative z-10 italic">Join the 20+ year legacy of excellence. Secure your future in the martial arts with The Champions Sports Academy.</p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
                            <Link to="/register" className="px-12 py-6 bg-cerulean-blue-900 text-white rounded-[2rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic tracking-tighter">Register Now</Link>
                            <Link to="/contact" className="px-12 py-6 bg-white/30 backdrop-blur-md rounded-[2rem] font-black text-2xl hover:bg-white/40 transition-all border border-cerulean-blue-900/10 uppercase italic tracking-tighter">Contact Masters</Link>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
};

export default Karate;