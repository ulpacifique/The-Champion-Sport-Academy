
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
    IconBell,
    IconSwords
} from '@tabler/icons-react';
import Header from '../Header/Header';
import { galleryAPI } from '../api/galleryAPI';

const Karate = () => {
    const [activeTab, setActiveTab] = useState('about');

    // Karate programs data
    const programs = [
        {
            title: "Weekend Training (Ages 3–17)",
            description: "Intensive weekend sessions focusing on technique, fitness, and sparring",
            features: ["Basic & Advanced Techniques", "Conditioning", "Sparring Sessions", "Kata Training"],
            icon: <IconShield className="text-bright-sun-400" size={24} />,
            schedule: "Sat & Sun: 10:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
            image: `${process.env.PUBLIC_URL}/athletes/Karate.JPG`
        },
        {
            title: "Private Home Classes",
            description: "Personalized individual or small group training at your convenience",
            features: ["Personalized Attention", "Flexible Scheduling", "Rapid Progress", "Focused Training"],
            icon: <IconStar className="text-bright-sun-400" size={24} />,
            schedule: "Mon - Fri: Available by appointment",
            image: `${process.env.PUBLIC_URL}/athletes/Class.jpg`
        },
        {
            title: "Competition Team",
            description: "Specialized training for athletes preparing for local and international tournaments",
            features: ["Elite Coaching", "Strategy Tactics", "Team Building", "Tournament Support"],
            icon: <IconTrophy className="text-bright-sun-400" size={24} />,
            schedule: "Selected Weekends & Camps",
            image: `${process.env.PUBLIC_URL}/athletes/competion.jpg`
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
            image: `${process.env.PUBLIC_URL}/athletes/Noel.jpg`
        },
        {
            name: "Sensei ABAYISENGA Paremonique",
            rank: "Certified National Coach",
            experience: "12+ Years Experience",
            specialty: "Kata & Child Development",
            description: "National medalist and certified coach passionate about holistic athlete development.",
            image: `${process.env.PUBLIC_URL}/athletes/palmonique.jpg`
        },
        {
            name: "Sensei DUSHIME SHARIFU",
            rank: "National Team Athlete",
            experience: "39+ Medals Won",
            specialty: "High-Performance Kumite",
            description: "Bronze medalist at Commonwealth Championship and FERWAKA certified coach.",
            image: `${process.env.PUBLIC_URL}/athletes/sharif.WEBP`
        },
        {
            name: "Sensei Khalif",
            rank: "Senior Instructor",
            experience: "Expert Trainer",
            specialty: "Youth Development",
            description: "Dedicated instructor focused on building discipline and technical excellence.",
            image: `${process.env.PUBLIC_URL}/athletes/Khalif.PNG`
        }
    ];

    // Gallery State
    const [galleryImages, setGalleryImages] = useState<any[]>([]);
    const [loadingGallery, setLoadingGallery] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                // Fetch both specifically tagged karate photos and general photos
                const [karatePhotos, generalPhotos] = await Promise.all([
                    galleryAPI.getImagesByCategory('KARATE'),
                    galleryAPI.getImagesByCategory('GENERAL')
                ]);

                // Combine and sort by upload date (newest first)
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
                                20+ Years Experience
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-sun-400 to-bright-sun-300">Karate</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                At <span className="font-bold text-bright-sun-400">The Champions Sports Academy</span>,
                                we bring <span className="font-bold text-bright-sun-400">20+ years</span> of
                                experience in teaching traditional and modern karate. Our certified instructors have trained
                                thousands of students, from beginners to national champions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register"
                                    className="px-8 py-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 rounded-lg font-semibold hover:from-bright-sun-500 hover:to-bright-sun-600 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                                >
                                    Start Your Journey Today
                                </Link>
                                <button className="px-8 py-4 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white font-semibold hover:bg-cerulean-blue-700/50 transition-all duration-300 text-center">
                                    Book a Free Trial Class
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-cerulean-blue-800/30 to-cerulean-blue-700/20 rounded-2xl p-8 backdrop-blur-sm border border-cerulean-blue-700/50">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconUsers className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">500+</div>
                                        <div className="text-gray-300">Active Students</div>
                                    </div>
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconAward className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">100+</div>
                                        <div className="text-gray-300">Black Belts</div>
                                    </div>
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconMedal className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">50+</div>
                                        <div className="text-gray-300">Tournament Wins</div>
                                    </div>
                                    <div className="bg-cerulean-blue-800/50 p-6 rounded-xl border border-cerulean-blue-700/50 hover:border-bright-sun-400/30 transition-colors">
                                        <IconCalendar className="text-bright-sun-400 mb-3" size={32} />
                                        <div className="text-3xl font-bold text-white">20+</div>
                                        <div className="text-gray-300">Years Experience</div>
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
                        {['about', 'programs', 'instructors', 'values', 'schedule', 'gallery'].map((tab) => (
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
                                    <h2 className="text-4xl font-bold mb-6 text-white">Our Karate Philosophy</h2>
                                    <p className="text-lg text-gray-300 mb-6">
                                        For over <span className="font-bold text-bright-sun-400">20 years</span>, The Champions Sports Academy
                                        has been a leader in karate education. We believe karate is more than just martial arts—it's
                                        a way of life that builds character, discipline, and confidence.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "Traditional Japanese karate techniques with 20+ years of refinement",
                                            "Modern self-defense applications for real-world situations",
                                            "Character development and discipline for all ages",
                                            "Physical fitness and mental focus training",
                                            "Tournament preparation and competition excellence",
                                            "Belt ranking system with regular gradings and ceremonies"
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
                                        src={`${process.env.PUBLIC_URL}/athletes/karate.png`}
                                        alt="Karate"
                                        className="rounded-2xl shadow-2xl"

                                    />
                                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 p-6 rounded-2xl shadow-xl">
                                        <div className="text-3xl font-bold text-gray-900">20+</div>
                                        <div className="text-gray-800/90">Years of Excellence</div>
                                    </div>
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div>
                                <h3 className="text-3xl font-bold mb-8 text-center text-white">Benefits of Learning Karate</h3>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6 hover:border-bright-sun-400/30 transition-colors hover:scale-[1.02]">
                                        <IconShield className="text-bright-sun-400 mb-4" size={32} />
                                        <h4 className="text-xl font-semibold mb-3 text-white">Self-Defense Skills</h4>
                                        <p className="text-gray-400">Learn practical self-defense techniques that can be applied in real-life situations, taught by experts with 20+ years experience.</p>
                                    </div>
                                    <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6 hover:border-bright-sun-400/30 transition-colors hover:scale-[1.02]">
                                        <IconLeaf className="text-bright-sun-400 mb-4" size={32} />
                                        <h4 className="text-xl font-semibold mb-3 text-white">Discipline & Focus</h4>
                                        <p className="text-gray-400">Develop mental discipline, concentration, and focus that translates to all areas of life - school, work, and personal goals.</p>
                                    </div>
                                    <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6 hover:border-bright-sun-400/30 transition-colors hover:scale-[1.02]">
                                        <IconBolt className="text-bright-sun-400 mb-4" size={32} />
                                        <h4 className="text-xl font-semibold mb-3 text-white">Physical Fitness</h4>
                                        <p className="text-gray-400">Improve strength, flexibility, coordination, and overall physical health through structured training programs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Programs Section */}
                    {activeTab === 'programs' && (
                        <div className="space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4 text-white">Our Karate Programs</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    Tailored programs for all ages and skill levels, taught by our experienced instructors with 20+ years of combined expertise
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

                    {/* Instructors Section */}
                    {activeTab === 'instructors' && (
                        <div className="space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4 text-white">Meet Our Master Instructors</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    Learn from the best with our team of certified karate instructors, each with decades of experience
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {instructors.map((instructor, index) => (
                                    <div key={index} className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl overflow-hidden hover:border-bright-sun-400/30 transition-all duration-300 hover:scale-[1.02]">
                                        <div className="h-64 relative overflow-hidden">
                                            <img
                                                src={instructor.image}
                                                alt={instructor.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 right-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                                                {instructor.rank}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold mb-2 text-white">{instructor.name}</h3>
                                            <div className="flex items-center text-gray-400 mb-4">
                                                <IconStar className="text-bright-sun-400 mr-1" size={16} />
                                                <span className="text-sm">{instructor.experience} Teaching Experience</span>
                                            </div>
                                            <p className="text-gray-300 mb-4">Specialty: {instructor.specialty}</p>
                                            <p className="text-bright-sun-400 text-sm mb-6">Part of our 20+ year legacy of excellence</p>
                                            <button className="w-full px-4 py-3 bg-cerulean-blue-700/50 border border-cerulean-blue-600 rounded-lg font-semibold text-white hover:bg-cerulean-blue-600/50 transition-colors">
                                                View Full Profile
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
                                    Flexible class timings designed for optimal learning and development at our state-of-the-art dojo facility
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
                                            ].map((slot, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-cerulean-blue-800/50 rounded-lg hover:bg-cerulean-blue-700/50 transition-colors">
                                                    <div>
                                                        <div className="font-semibold text-white">{slot.day}</div>
                                                        <div className="text-sm text-gray-400">{slot.classes}</div>
                                                    </div>
                                                    <div className="text-bright-sun-400 font-semibold">{slot.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-white">Our World-Class Dojo</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <IconMapPin className="text-bright-sun-400 mr-3 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-white">The Champions Sports Academy</h4>
                                                    <p className="text-gray-400">State-of-the-art Karate Dojo</p>
                                                    <p className="text-gray-400">Kigali, Rwanda</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <IconBell className="text-bright-sun-400 mr-3 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-white">Premium Facilities</h4>
                                                    <ul className="text-gray-400 space-y-1">
                                                        <li>• Professional tatami mats</li>
                                                        <li>• Complete training equipment</li>
                                                        <li>• Safety-certified training area</li>
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
                                <h2 className="text-4xl font-bold mb-4 text-white">Our Karate Gallery</h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    A visual journey through our karate programmes, training sessions, and achievements at The Champions Sports Academy
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
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&h=400&fit=crop";
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
                        <IconAward className="mr-2" size={24} />
                        <span className="font-semibold">20+ Years of Excellence</span>
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
                                    MK
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold text-white">Michael K.</div>
                                    <div className="text-gray-400 text-sm">Black Belt, 5 years training</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "Training at Champions Academy for 5 years transformed my life. The 20+ years of experience really shows in their teaching methods."
                            </p>
                        </div>
                        <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 rounded-full flex items-center justify-center font-bold text-xl text-gray-900">
                                    SJ
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold text-white">Sarah J.</div>
                                    <div className="text-gray-400 text-sm">Parent of 2 students</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "My kids have grown so much in confidence and discipline. The 20-year legacy of this academy is truly impressive."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Karate;