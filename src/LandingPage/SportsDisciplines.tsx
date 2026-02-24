import { Carousel } from "@mantine/carousel";
import { useState, useEffect } from "react";
import { IconActivity, IconArrowLeft, IconArrowRight, IconMail, IconPhone, IconShield, IconUserCheck } from "@tabler/icons-react";
import {
    IconCertificate,
    IconCalendarEvent,
    IconShoppingCart,
    IconWorld,
    IconUsers,
    IconTrophy,
    IconMedal,
    IconAward,
    IconSchool,
    IconStar
} from "@tabler/icons-react";


const SportsDisciplines = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Core Services Data
    const coreServices = [
        {
            title: "Sport & Physical Literacy Programmes",
            icon: IconActivity,
            description: "Karate, Gymnastics, and Multi-Sport for children and youth aged 3 to 17",
            features: [
                "Fundamental movement skills",
                "Safe and enjoyable sport introduction",
                "Long-term athlete development",
                "Values, confidence & social skills"
            ],
            sports: ["Gymnastics", "Karate", "Multi-Sport"],
            bgColor: "bg-blue-500/5",
            borderColor: "border-blue-500/20",
            glowColor: "shadow-blue-500/10",
            iconColor: "text-blue-400"
        },
        {
            title: "School-Based Sport & Education",
            icon: IconSchool,
            description: "Structured sport and physical activity initiatives delivered in partnership with schools",
            features: [
                "Integrated physical education",
                "Values-based learning",
                "Extracurricular sport programs",
                "School-community partnerships"
            ],
            bgColor: "bg-purple-500/5",
            borderColor: "border-purple-500/20",
            glowColor: "shadow-purple-500/10",
            iconColor: "text-purple-400"
        },
        {
            title: "Coach Education & Mentoring",
            icon: IconCertificate,
            description: "Capacity building through training, mentoring, and certification support",
            features: [
                "Structured certification courses",
                "Professional development workshops",
                "Safe Sport & athlete well-being",
                "Mentorship & leadership programs"
            ],
            focus: "Technically competent, ethically grounded coaches",
            bgColor: "bg-bright-sun-300/5",
            borderColor: "border-bright-sun-300/20",
            glowColor: "shadow-bright-sun-300/10",
            iconColor: "text-bright-sun-300"
        },
        {
            title: "Sport Events & Workshops",
            icon: IconCalendarEvent,
            description: "Management of competitions, training camps, and well-being workshops",
            features: [
                "Sport events and competitions",
                "Training camps and intensive workshops",
                "Health and well-being workshops",
                "Community engagement"
            ],
            bgColor: "bg-green-500/5",
            borderColor: "border-green-500/20",
            glowColor: "shadow-green-500/10",
            iconColor: "text-green-400"
        },
        {
            title: "Sports Equipment Shop",
            icon: IconShoppingCart,
            description: "Uniforms and training materials supporting programs and community sport",
            features: [
                "Professional sports equipment",
                "Official uniforms and apparel",
                "Training materials",
                "Community sport support"
            ],
            bgColor: "bg-orange-500/5",
            borderColor: "border-orange-500/20",
            glowColor: "shadow-orange-500/10",
            iconColor: "text-orange-400"
        }
    ];

    const achievements = [
        { title: "National Champions", count: "15", icon: IconTrophy, color: "bg-gradient-to-br from-bright-sun-200/20 to-bright-sun-300/20" },
        { title: "International Awards", count: "8", icon: IconAward, color: "bg-gradient-to-br from-blue-500/20 to-blue-600/20" },
        { title: "Certified Coaches", count: "25+", icon: IconCertificate, color: "bg-gradient-to-br from-green-500/20 to-green-600/20" },
        { title: "Community Events", count: "50+", icon: IconMedal, color: "bg-gradient-to-br from-purple-500/20 to-purple-600/20" },
    ];

    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl text-center mb-3 font-semibold text-white">
                Our <span className="text-bright-sun-300">Core</span> Services
            </div>
            <div className="text-lg mb-10 mx-auto text-gray-400 text-center w-1/2">
                Comprehensive sports development ecosystem from training to competition
            </div>

            <Carousel
                slideSize="22%"
                slideGap="md"
                loop
                align="start"
                className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-300 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
                nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {coreServices.map((service, index) => (
                    <Carousel.Slide key={service.title}>
                        <div className={`group relative ${service.bgColor} border ${service.borderColor} p-8 rounded-3xl h-[280px] my-5 backdrop-blur-md transition-all duration-500 hover:shadow-2xl ${service.glowColor} hover:-translate-y-2 hover:bg-gray-800/20 cursor-pointer`}>
                            {/* Floating Icon Container */}
                            <div className="relative mb-6">
                                <div className={`w-14 h-14 bg-gray-900/60 rounded-2xl flex items-center justify-center border ${service.borderColor} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                    <service.icon size={26} className={`${service.iconColor} group-hover:scale-110 transition-transform`} />
                                </div>
                                <div className={`absolute -inset-2 ${service.iconColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700`}>
                                    <service.icon size={26} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-bright-sun-300 transition-colors line-clamp-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                    {service.description}
                                </p>
                            </div>

                            {/* Decorative Corner Accent */}
                            <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-br-2xl border-b-2 border-r-2 ${service.borderColor} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>

            {/* Partners Section */}
            <div className="mt-16 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-bright-sun-300/5 via-transparent to-bright-sun-300/5 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="text-4xl md:text-5xl text-center mb-4 font-bold">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Our
                        </span>{" "}
                        <span className="bg-gradient-to-r from-bright-sun-200 to-bright-sun-300 bg-clip-text text-transparent">
                            Partners
                        </span>{" "}
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            & Ecosystem
                        </span>
                    </div>

                    <div className="text-lg mb-12 mx-auto text-gray-400 text-center max-w-2xl px-4">
                        Collaborating with leading organizations to deliver world-class sports programs
                    </div>

                    <Carousel
                        slideSize="25%"
                        slideGap="xl"
                        loop
                        align="start"
                        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-gradient-to-r [&_button]:!from-bright-sun-200 [&_button]:!to-bright-sun-300 [&_button]:!border-none [&_button]:hover:!opacity-90 [&_button]:!opacity-0 hover:[&_button]:!opacity-100 [&_button]:!transition-all [&_button]:!duration-300 [&_button]:!shadow-lg [&_button]:!shadow-bright-sun-200/20"
                        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
                    >
                        {[
                            { name: "Rwanda Karate Federation (FERWAKA)", type: "National Partner", icon: "🥋", gradient: "from-red-500/20 to-red-600/20", border: "border-red-500/30" },
                            { name: "Rwanda Gymnastics Federation (FERWACY)", type: "National Partner", icon: "🤸", gradient: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30" },
                            { name: "RNOSC", type: "National Olympic Committee", icon: "🏅", gradient: "from-bright-sun-200/20 to-bright-sun-300/20", border: "border-bright-sun-300/30" },
                            { name: "Ministry of Sports", type: "Government Partner", icon: "🏛️", gradient: "from-blue-600/20 to-blue-700/20", border: "border-blue-600/30" },
                            { name: "National Olympic & Sports Academy", type: "National Partner", icon: "🎓", gradient: "from-green-600/20 to-green-700/20", border: "border-green-600/30" },
                            { name: "World Karate Federation (WKF)", type: "International Partner", icon: "🌍", gradient: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30" },
                            { name: "International Olympic Committee (IOC)", type: "International Partner", icon: "⚡", gradient: "from-green-500/20 to-green-600/20", border: "border-green-500/30" },
                            { name: "International Olympic Academy (IOA)", type: "International Partner", icon: "🏛️", gradient: "from-blue-400/20 to-blue-500/20", border: "border-blue-400/30" },
                            { name: "Alliance of Social Workers in Sport (ASWIS)", type: "International Network", icon: "🤝", gradient: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/30" },
                            { name: "USA Karate", type: "International Partner", icon: "🇺🇸", gradient: "from-red-600/20 to-red-700/20", border: "border-red-600/30" },
                            { name: "5280 Gymnastics", type: "International Partner", icon: "🤸‍♀️", gradient: "from-pink-500/20 to-pink-600/20", border: "border-pink-500/30" },
                            { name: "Gasore Serge Foundation", type: "Foundation", icon: "❤️", gradient: "from-pink-500/20 to-pink-600/20", border: "border-pink-500/30" },
                        ].map((partner, index) => (
                            <Carousel.Slide key={partner.name}>
                                <div
                                    className={`group relative flex flex-col items-center w-64 gap-4 border ${partner.border} bg-gradient-to-br ${partner.gradient} backdrop-blur-sm p-6 rounded-2xl hover:cursor-pointer transition-all duration-300 ease-out hover:scale-105 my-5 overflow-hidden animate-breathing`}
                                    style={{
                                        animationDelay: `${index * 0.5}s`
                                    }}
                                >
                                    {/* Animated background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Icon with subtle animation */}
                                    <div className="text-5xl transform group-hover:scale-110 transition-all duration-500 relative z-10">
                                        {partner.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 space-y-2">
                                        <div className="text-white text-lg font-bold text-center group-hover:text-bright-sun-300 transition-colors duration-300">
                                            {partner.name}
                                        </div>
                                        <div className="text-sm text-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                            {partner.type}
                                        </div>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bright-sun-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </div>
            </div>

            {/* Ecosystem Highlights */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-300/50 transition duration-300">
                    <div className="w-12 h-12 bg-bright-sun-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconUsers className="text-bright-sun-300" size={24} />
                    </div>
                    <div className="text-white text-xl font-semibold mb-2">Athlete Journey</div>
                    <div className="text-sm text-gray-400">
                        Physical Literacy → Skill Development → Competition
                    </div>
                </div>

                <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-300/50 transition duration-300">
                    <div className="w-12 h-12 bg-bright-sun-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconCertificate className="text-bright-sun-300" size={24} />
                    </div>
                    <div className="text-white text-xl font-semibold mb-2">Coach Development</div>
                    <div className="text-sm text-gray-400">
                        Certification → Mentoring → Professional Development
                    </div>
                </div>

                <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-300/50 transition duration-300">
                    <div className="w-12 h-12 bg-bright-sun-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconWorld className="text-bright-sun-300" size={24} />
                    </div>
                    <div className="text-white text-xl font-semibold mb-2">Global Network</div>
                    <div className="text-sm text-gray-400">
                        International standards and partnership opportunities
                    </div>
                </div>
            </div>
            {/* What We Do */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Do</h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        Professionally designed programmes aligned with international best practices
                        in sport development, coaching education, and well-being.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                    {coreServices.map((program, index) => (
                        <div
                            key={program.title}
                            className={`group relative ${program.bgColor} border ${program.borderColor} rounded-3xl p-8 h-full backdrop-blur-md transition-all duration-700 hover:shadow-2xl ${program.glowColor} hover:-translate-y-2 hover:bg-gray-800/20 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ animationDelay: `${700 + index * 150}ms` }}
                        >
                            {/* Floating Icon Container */}
                            <div className="relative mb-8">
                                <div className={`w-16 h-16 bg-gray-900/60 rounded-2xl flex items-center justify-center border ${program.borderColor} group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]`}>
                                    <program.icon className={`${program.iconColor} group-hover:scale-110 transition-transform`} size={32} />
                                </div>
                                <div className={`absolute -inset-2 ${program.iconColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700`}>
                                    <program.icon size={32} />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-bright-sun-300 transition-colors">{program.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{program.description}</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                {program.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start space-x-3">
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${program.iconColor} group-hover:animate-pulse`} />
                                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {program.sports && (
                                <div className="mt-auto border-t border-gray-700/50 pt-6">
                                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Programs</div>
                                    <div className="flex flex-wrap gap-2">
                                        {program.sports.map((sport) => (
                                            <span
                                                key={sport}
                                                className={`px-3 py-1 bg-gray-900/40 border ${program.borderColor} text-gray-300 rounded-full text-[10px] font-bold uppercase tracking-widest group-hover:border-bright-sun-300/30 transition-colors`}
                                            >
                                                {sport}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {program.focus && (
                                <div className="mt-auto pt-6">
                                    <div className="px-4 py-2 bg-bright-sun-300/5 border border-bright-sun-300/10 rounded-xl text-bright-sun-300 italic text-[11px] leading-relaxed text-center">
                                        "{program.focus}"
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            <div className="container mx-auto px-4 py-16">
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Achievements</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Milestones that reflect our commitment to excellence in sports education
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {achievements.map((achievement, index) => (
                            <div
                                key={achievement.title}
                                className={`${achievement.color} border border-gray-700/50 rounded-2xl p-6 text-center transition-all duration-500 hover:scale-[1.05] ${animate ? 'opacity-100' : 'opacity-0'}`}
                                style={{ animationDelay: `${1000 + index * 200}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-2xl mb-4">
                                    <achievement.icon className="text-white" size={32} />
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">{achievement.count}</div>
                                <div className="text-gray-300">{achievement.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Founder & CEO Section */}
            <div className="container mx-auto px-4 py-16">
                <div className={`bg-gray-800/30 border border-gray-700/50 rounded-2xl p-12 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-48 h-48 bg-gradient-to-br from-bright-sun-200 to-bright-sun-300 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-2xl">
                            <IconUserCheck size={80} className="text-gray-900" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-2">Noël Nkuranyabahizi</h2>
                            <div className="text-bright-sun-300 text-xl font-semibold mb-6">Founder & CEO</div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                Leading the vision of developing "Champions for Life" with a commitment to
                                professionalism, excellence, and community impact through sport and education.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <IconMail size={20} className="text-bright-sun-300" />
                                    <span>noel@thechampions.rw</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <IconPhone size={20} className="text-bright-sun-300" />
                                    <span>Kigali, Rwanda</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Commitment */}
            <div className="container mx-auto px-4 py-16">
                <div className={`bg-gradient-to-r from-gray-800/30 to-cerulean-blue-900/30 border border-gray-700/50 rounded-2xl p-12 text-center transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-bright-sun-300/20 rounded-2xl mb-6 border border-bright-sun-300/30">
                            <IconShield className="text-bright-sun-300" size={40} />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Commitment</h2>

                        <p className="text-gray-300 text-lg mb-10">
                            At The Champions Sports Academy, we believe sport is more than competition.
                            It is an educational and social force that shapes healthier individuals and
                            stronger communities. We are committed to creating a safe, inclusive, and
                            empowering environment for every athlete.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { name: 'Professionalism', icon: IconStar, color: 'bg-blue-600/20' },
                                { name: 'Safeguarding', icon: IconShield, color: 'bg-bright-sun-300/20' },
                                { name: 'Inclusion', icon: IconUsers, color: 'bg-green-600/20' },
                                { name: 'Excellence', icon: IconTrophy, color: 'bg-purple-600/20' }
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className={`${item.color} border border-gray-700/50 rounded-xl p-6 hover:scale-105 transition-all duration-300`}
                                >
                                    <item.icon className="text-white mb-3 mx-auto" size={24} />
                                    <div className="text-white font-semibold">{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsDisciplines;