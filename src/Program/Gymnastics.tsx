// src/Pages/Gymnastics.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IconUsers,
    IconAward,
    IconCalendar,
    IconClock,
    IconMapPin,
    IconChevronRight,
    IconStar,
    IconCheck,
    IconShield,
    IconMedal,
    IconTarget,
    IconHeartbeat,
    IconLeaf,
    IconBolt,
    IconPhoto,
    IconFriends,
    IconHeartHandshake,
    IconTrophy,
    IconSchool,
    IconBrain,
    IconBell
} from '@tabler/icons-react';
import Header from '../Header/Header';
import { galleryAPI } from '../api/galleryAPI';

const Gymnastics = () => {
    const [activeTab, setActiveTab] = useState('about');

    // Gymnastics programs data
    const programs = [
        {
            title: "Weekend Training (Ages 3-17)",
            description: "Fundamental movement skills and physical literacy in a fun, safe environment",
            features: ["Basic Movement Skills", "Balance & Coordination", "Social Development", "Body Awareness"],
            icon: <IconHeartHandshake className="text-bright-sun-400" size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL}/athletes/team.JPG`
        },
        {
            title: "Private Home Classes",
            description: "Developing gymnastics skills, strength, and flexibility through personalized training",
            features: ["Personalized Attention", "Strength Development", "Flexibility", "Rapid Progress"],
            icon: <IconTrophy className="text-bright-sun-400" size={24} />,
            schedule: "Mon - Fri: Available by appointment",
            image: `${process.env.PUBLIC_URL}/athletes/athlete-2.jpg`
        },
        {
            title: "Advanced Gymnastics",
            description: "Competitive training and advanced skill development for performance-oriented athletes",
            features: ["Advanced Techniques", "Competition Prep", "Strength Conditioning", "Mental Training"],
            icon: <IconAward className="text-bright-sun-400" size={24} />,
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
        { name: "Discipline", icon: <IconShield className="text-bright-sun-400" size={24} /> },
        { name: "Friendship", icon: <IconFriends className="text-bright-sun-400" size={24} />, description: "" },
        { name: "Teamwork", icon: <IconHeartHandshake className="text-bright-sun-400" size={24} />, description: "" },
        { name: "Respect", icon: <IconLeaf className="text-bright-sun-400" size={24} />, description: "" },
        { name: "Excellence", icon: <IconTrophy className="text-bright-sun-400" size={24} />, description: "" }
    ];

    return (
        <div className="bg-gradient-to-b from-cerulean-blue-950 to-cerulean-blue-900 text-white">
            <Header />
            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cerulean-blue-900/50 to-cerulean-blue-800/30 z-0"></div>
                <div
                    className="absolute inset-0 opacity-10 z-0"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/athletes/Champions.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 bg-bright-sun-400/20 text-bright-sun-400 rounded-full text-sm font-medium mb-4">
                                <IconAward className="mr-2" size={16} />
                                The Champions Sports Academy
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-sun-400 to-bright-sun-300">The Champions</span>Gymnastics
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                At The Champions Sports Academy, we are a leading values-driven sport and physical literacy institution dedicated to the holistic development of children, young people, and coaches. We provide inclusive, safe, and structured gymnastics programmes that promote excellence, health, and lifelong well-being through sport.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register"
                                    className="px-8 py-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 rounded-lg font-semibold hover:from-bright-sun-500 hover:to-bright-sun-600 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                                >
                                    Start Your Journey
                                </Link>
                                <button className="px-8 py-4 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white font-semibold hover:bg-cerulean-blue-700/50 transition-all duration-300 text-center">
                                    Book a Trial Class
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-cerulean-blue-800/30 to-cerulean-blue-700/20 rounded-2xl p-8 backdrop-blur-sm border border-cerulean-blue-700/50">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconUsers className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">300+</div>
                                        <div className="text-gray-300">Gymnastics Students</div>
                                    </div>
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconAward className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">50+</div>
                                        <div className="text-gray-300">Competition Medals</div>
                                    </div>
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconMedal className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">15+</div>
                                        <div className="text-gray-300">Certified Coaches</div>
                                    </div>
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconCalendar className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">100%</div>
                                        <div className="text-gray-300">Safe & Inclusive</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="py-8 px-4 md:px-8 lg:px-16 border-b border-cerulean-blue-800">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {['about', 'programs', 'coaches', 'values', 'schedule', 'gallery'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === tab
                                    ? 'bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900'
                                    : 'bg-cerulean-blue-800/50 text-gray-300 hover:bg-cerulean-blue-700/50'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">

                    {/* About Section */}
                    {activeTab === 'about' && (
                        <div className="space-y-16">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-4xl font-bold mb-6 text-white">Who We Are</h2>
                                    <p className="text-lg text-gray-300 mb-6">
                                        The Champions Sports Academy is a leading values-driven sport and physical literacy institution dedicated to the holistic development of children, young people, and coaches. We provide inclusive, safe, and structured sport programmes that promote excellence, health, and lifelong well-being through sport.
                                    </p>
                                    <p className="text-lg text-gray-300 mb-6">
                                        Founded on strong educational and ethical foundations, the Academy integrates sport performance, physical literacy, and character development to support participants across all stages of growth.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "Values-driven sport and physical literacy institution",
                                            "Holistic development of children, youth, and coaches",
                                            "Inclusive, safe, and structured programmes",
                                            "Educational and ethical foundations",
                                            "Sport performance and character development integration"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <IconCheck className="text-bright-sun-400 mr-3" size={20} />
                                                <span className="text-gray-300">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/athletes/Instruction.jpg`}
                                        alt="Gymnastics training"
                                        className="rounded-2xl shadow-2xl"
                                    />
                                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 p-6 rounded-2xl shadow-xl">
                                        <div className="text-3xl font-bold text-gray-900">Champions</div>
                                        <div className="text-gray-800/90">for Life</div>
                                    </div>
                                </div>
                            </div>

                            {/* Vision & Mission */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-cerulean-blue-800/30 to-cerulean-blue-900/30 border border-bright-sun-400/20 rounded-2xl p-8">
                                    <IconTarget className="text-bright-sun-400 mb-4" size={32} />
                                    <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                                    <p className="text-gray-300">
                                        To become a global hub of inclusive sport and physical literacy that promotes excellence, health, and lifelong well-being.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-cerulean-blue-800/30 to-cerulean-blue-900/30 border border-bright-sun-400/20 rounded-2xl p-8">
                                    <IconBolt className="text-bright-sun-400 mb-4" size={32} />
                                    <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                                    <p className="text-gray-300">
                                        To empower people through inclusive sport, physical literacy, and values-based education programmes that promote excellence, health, and lifelong well-being.
                                    </p>
                                </div>
                            </div>

                            {/* What We Do */}
                            <div>
                                <h3 className="text-3xl font-bold mb-8 text-center text-white">What We Do</h3>
                                <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-8">
                                    <p className="text-lg text-gray-300 mb-6">
                                        The Champions Sports Academy delivers professionally designed programmes aligned with international best practices in sport development, coaching education, and well-being.
                                    </p>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            "Children's sport and physical literacy programmes",
                                            "Athlete development pathways",
                                            "Sport coaching education and certification",
                                            "Sport events organization and management",
                                            "Sport, health, and well-being workshops"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start">
                                                <IconChevronRight className="text-bright-sun-400 mr-3 mt-1" size={20} />
                                                <span className="text-gray-300">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Programs Section */}
                    {activeTab === 'programs' && (
                        <div className="space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4 text-white">Children & Youth Programmes (Ages 3–17)</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    Our age-appropriate programmes focus on fundamental movement skills and physical literacy, safe and enjoyable introduction to sport, long-term athlete development principles, and positive values, confidence, and social skills.
                                </p>
                            </div>

                            <div className="space-y-12">
                                {programs.map((program, index) => (
                                    <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                                        <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                            <img
                                                src={program.image}
                                                alt={program.title}
                                                className="rounded-2xl shadow-xl w-full h-64 object-cover"
                                            />
                                        </div>
                                        <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                            <div className="flex items-center mb-4">
                                                {program.icon}
                                                <h3 className="text-2xl font-bold ml-3 text-white">{program.title}</h3>
                                            </div>
                                            <p className="text-gray-300 mb-6">{program.description}</p>

                                            <div className="mb-6">
                                                <h4 className="font-semibold mb-3 text-bright-sun-400">Program Features:</h4>
                                                <ul className="space-y-2">
                                                    {program.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center text-gray-300">
                                                            <IconChevronRight className="text-bright-sun-400 mr-2" size={16} />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="pt-6 border-t border-cerulean-blue-700/50">
                                                <p className="text-gray-300 mb-4">
                                                    Through gymnastics activities, children develop strong physical foundations while learning life skills that extend beyond sport.
                                                </p>
                                                <div className="flex items-center text-gray-400 mb-4">
                                                    <IconCalendar className="mr-2" size={18} />
                                                    <span>{program.schedule}</span>
                                                </div>
                                                <button className="w-full px-4 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 rounded-lg font-semibold hover:from-bright-sun-500 hover:to-bright-sun-600 transition-all">
                                                    Enroll Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Coaches Section */}
                    {activeTab === 'coaches' && (
                        <div className="space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4 text-white">Coaching Education & Capacity Building</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    We are committed to raising the standard of coaching through structured coaching certification courses, continuous professional development workshops, Safe Sport and athlete well-being education, and mentorship and leadership development for coaches.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {coaches.map((coach, index) => (
                                    <div key={index} className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl overflow-hidden hover:border-bright-sun-400/30 transition-all duration-300 hover:scale-[1.02]">
                                        <div className="h-64 relative overflow-hidden">
                                            <img
                                                src={coach.image}
                                                alt={coach.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 right-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                                                {coach.certification}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold mb-2 text-white">{coach.name}</h3>
                                            <div className="flex items-center text-gray-400 mb-4">
                                                <IconStar className="text-bright-sun-400 mr-1" size={16} />
                                                <span className="text-sm">{coach.experience} Experience</span>
                                            </div>
                                            <p className="text-gray-300 mb-4">Specialty: {coach.specialty}</p>
                                            <p className="text-bright-sun-400 text-sm mb-6">
                                                Our approach ensures coaches are technically competent, ethically grounded, and equipped to support athletes holistically.
                                            </p>
                                            <button className="w-full px-4 py-3 bg-cerulean-blue-700/50 border border-cerulean-blue-600 rounded-lg font-semibold text-white hover:bg-cerulean-blue-600/50 transition-colors">
                                                View Coach Profile
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Core Values Section */}
                    {activeTab === 'values' && (
                        <div className="space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4 text-white">Our Core Values</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    At The Champions Sports Academy, we believe sport is more than competition. It is an educational and social force that shapes healthier individuals and stronger communities.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                                {coreValues.map((value, index) => (
                                    <div key={index} className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6 text-center hover:border-bright-sun-400/30 transition-colors hover:scale-[1.05]">
                                        <div className="mb-4 flex justify-center">{value.icon}</div>
                                        <h3 className="text-xl font-bold mb-2 text-white">{value.name}</h3>
                                        <p className="text-gray-400 text-sm">{value.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Commitment Section */}
                            <div className="bg-gradient-to-r from-cerulean-blue-800/30 to-cerulean-blue-900/30 border border-bright-sun-400/20 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">Our Commitment</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-semibold mb-4 text-bright-sun-400">Sport, Health & Well-Being</h4>
                                        <p className="text-gray-300">
                                            Sport is a powerful tool for health promotion and social well-being. Our programmes and workshops address physical activity for health and active lifestyles, mental well-being through sport participation, values-based education and positive behavior development, and community engagement and inclusion.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold mb-4 text-bright-sun-400">Professional Standards</h4>
                                        <p className="text-gray-300">
                                            We are committed to professionalism, safeguarding, inclusion, and long-term impact. Our values-driven approach ensures every participant receives quality education and support in a safe, inclusive environment that promotes lifelong well-being.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Schedule Section */}
                    {activeTab === 'schedule' && (
                        <div className="space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4 text-white">Class Schedule & Location</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    Flexible class timings designed for optimal learning and development at our state-of-the-art gymnastics facility
                                </p>
                            </div>

                            <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-8">
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-white">Weekly Schedule</h3>
                                        <div className="space-y-4">
                                            {[
                                                { day: "Monday - Friday", time: "Available by Appointment", classes: "Home Classes (Individual/Group)" },
                                                { day: "Saturday", time: "10:00 AM - 12:00 PM", classes: "Weekend Training (Morning Session)" },
                                                { day: "Saturday", time: "3:00 PM - 5:00 PM", classes: "Weekend Training (Afternoon Session)" },
                                                { day: "Sunday", time: "10:00 AM - 12:00 PM", classes: "Weekend Training (Morning Session)" },
                                                { day: "Sunday", time: "3:00 PM - 5:00 PM", classes: "Weekend Training (Afternoon Session)" }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-cerulean-blue-800/50 rounded-lg hover:bg-cerulean-blue-700/50 transition-colors">
                                                    <div>
                                                        <div className="font-semibold text-white">{item.day}</div>
                                                        <div className="text-sm text-gray-400">{item.classes}</div>
                                                    </div>
                                                    <div className="text-bright-sun-400 font-semibold">{item.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-white">Our World-Class Facility</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <IconMapPin className="text-bright-sun-400 mr-3 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-white">The Champions Sports Academy</h4>
                                                    <p className="text-gray-400">State-of-the-art Gymnastics Center</p>
                                                    <p className="text-gray-400">Kigali, Rwanda</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <IconBell className="text-bright-sun-400 mr-3 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-white">Premium Facilities</h4>
                                                    <ul className="text-gray-400 space-y-1">
                                                        <li>• Olympic-standard equipment</li>
                                                        <li>• Professional sprung floors</li>
                                                        <li>• Safety-certified apparatus</li>
                                                        <li>• Parent observation areas</li>
                                                        <li>• Changing rooms & showers</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <IconShield className="text-bright-sun-400 mr-3 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-white">Safety First</h4>
                                                    <ul className="text-gray-400 space-y-1">
                                                        <li>• Certified safety equipment</li>
                                                        <li>• First-aid trained staff</li>
                                                        <li>• Small coach-to-student ratios</li>
                                                        <li>• Age-appropriate training</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gallery Section */}
                    {activeTab === 'gallery' && (
                        <div className="space-y-12">
                            <div className="text-center mb-12">
                                <IconPhoto className="text-bright-sun-400 mx-auto mb-4" size={48} />
                                <h2 className="text-4xl font-bold mb-4 text-white">Our Gymnastics Gallery</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    A visual journey through our gymnastics programmes, training sessions, and achievements at The Champions Sports Academy
                                </p>
                            </div>

                            {loadingGallery ? (
                                <div className="col-span-full text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-sun-400 mx-auto mb-4"></div>
                                    <p className="text-gray-300">Loading gallery...</p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {galleryImages.map((image, index) => (
                                        <div key={index} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                                            <img
                                                src={image.imageUrl?.startsWith('/') ? 'http://localhost:8081' + image.imageUrl : image.imageUrl}
                                                alt={image.title}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    // Fallback if image fails to load
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1577223625818-75bc1f2ac0e5?w=600&h=400&fit=crop";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                                                <p className="text-gray-300">{image.description}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {galleryImages.length === 0 && (
                                        <div className="col-span-full text-center py-12 bg-cerulean-blue-800/30 rounded-xl border border-cerulean-blue-700/50">
                                            <IconPhoto size={48} className="text-gray-500 mx-auto mb-3" />
                                            <p className="text-gray-400">No photos available yet</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-cerulean-blue-800/30 to-cerulean-blue-900/30 border-t border-b border-cerulean-blue-800">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 rounded-full mb-6 text-gray-900">
                        <IconHeartHandshake className="mr-2" size={24} />
                        <span className="font-semibold">Join Our Community</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-white">Become a Champion for Life</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Whether you are a parent, athlete, coach, partner, or institution, we invite you to be part of a community that believes in developing Champions for Life through values-driven sport and physical literacy programmes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="px-8 py-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 rounded-lg font-semibold hover:from-bright-sun-500 hover:to-bright-sun-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Register for Programmes
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white font-semibold hover:bg-cerulean-blue-700/50 transition-all duration-300"
                        >
                            Contact Our Team
                        </Link>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center text-gray-400">
                            <IconCheck className="text-bright-sun-400 mr-2" size={20} />
                            <span>Values-driven education</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-400">
                            <IconCheck className="text-bright-sun-400 mr-2" size={20} />
                            <span>Certified professional coaches</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-400">
                            <IconCheck className="text-bright-sun-400 mr-2" size={20} />
                            <span>Safe & inclusive environment</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold mb-12 text-center text-white">Developing Champions for Life</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 rounded-full flex items-center justify-center font-bold text-xl text-gray-900">
                                    AW
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold text-white">Anna W.</div>
                                    <div className="text-gray-400 text-sm">Parent of gymnast, 3 years</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "The values-based approach at Champions Academy has helped my daughter grow not just as a gymnast, but as a confident, disciplined young person. The holistic development is truly remarkable."
                            </p>
                        </div>
                        <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 rounded-full flex items-center justify-center font-bold text-xl text-gray-900">
                                    TC
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold text-white">Thomas C.</div>
                                    <div className="text-gray-400 text-sm">Advanced Gymnastics Student</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "Training here has transformed my approach to sport and life. The focus on physical literacy and character development has made me a better athlete and person. Truly champions for life!"
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gymnastics;