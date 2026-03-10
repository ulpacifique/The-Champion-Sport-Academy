import { Carousel } from "@mantine/carousel";
import { useState, useEffect } from "react";
import { IconActivity, IconArrowLeft, IconArrowRight, IconShield } from "@tabler/icons-react";
import {
    IconCertificate,
    IconCalendarEvent,
    IconShoppingCart,
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
            iconColor: "text-blue-600 dark:text-blue-400"
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
            iconColor: "text-purple-600 dark:text-purple-400"
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
            iconColor: "text-bright-sun-600 dark:text-bright-sun-300"
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
            iconColor: "text-green-600 dark:text-green-400"
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
            iconColor: "text-orange-600 dark:text-orange-400"
        }
    ];

    const achievements = [
        { title: "National Champions", count: "15", icon: IconTrophy, color: "bg-gradient-to-br from-bright-sun-200/20 to-bright-sun-300/20" },
        { title: "International Awards", count: "8", icon: IconAward, color: "bg-gradient-to-br from-blue-500/20 to-blue-600/20" },
        { title: "Certified Coaches", count: "25+", icon: IconCertificate, color: "bg-gradient-to-br from-green-500/20 to-green-600/20" },
        { title: "Community Events", count: "50+", icon: IconMedal, color: "bg-gradient-to-br from-purple-500/20 to-purple-600/20" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 pt-32 pb-20 transition-colors duration-300">
            {/* Hero Section of Disciplines */}
            <div className="container mx-auto px-4 mb-20 text-center">
                <div className={`inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <IconActivity size={16} />
                    <span>Our Ecosystem</span>
                </div>
                <h1 className={`text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-6 uppercase italic tracking-tighter transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Our <span className="text-bright-sun-600 dark:text-bright-sun-300">Core</span> Services
                </h1>
                <p className={`text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Comprehensive sports development ecosystem from training to competition, professionally designed to shape champions.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <Carousel
                    slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
                    slideGap="xl"
                    loop
                    align="start"
                    className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-600 dark:[&_button]:!bg-bright-sun-300 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100 [&_button]:!w-12 [&_button]:!h-12 [&_button]:!text-white dark:[&_button]:!text-gray-900 [&_button]:shadow-xl"
                    nextControlIcon={<IconArrowRight size={24} />}
                    previousControlIcon={<IconArrowLeft size={24} />}
                >
                    {coreServices.map((service, index) => (
                        <Carousel.Slide key={service.title}>
                            <div className={`group relative bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 p-8 rounded-3xl h-full backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 hover:-translate-y-2 cursor-pointer shadow-sm dark:shadow-none`}>
                                {/* Floating Icon Container */}
                                <div className="relative mb-8">
                                    <div className={`w-16 h-16 bg-white dark:bg-cerulean-blue-800/60 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                        <service.icon size={32} className={`${service.iconColor} group-hover:scale-110 transition-transform`} />
                                    </div>
                                    <div className={`absolute -inset-2 ${service.iconColor} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-xl transition-opacity duration-700`}>
                                        <service.icon size={32} />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-black text-cerulean-blue-900 dark:text-white mb-3 group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors uppercase italic tracking-tight leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start space-x-3">
                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-bright-sun-600 dark:bg-bright-sun-300 group-hover:animate-pulse`} />
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Decorative Corner Accent */}
                                <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-br-2xl border-b-2 border-r-2 border-gray-200 dark:border-white/10 opacity-30 group-hover:opacity-100 group-hover:border-bright-sun-600 dark:group-hover:border-bright-sun-300 transition-all duration-500`} />
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>

            {/* Partners Section */}
            <div className="mt-32 relative overflow-hidden bg-gray-50/50 dark:bg-transparent py-20 transition-colors duration-300">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-bright-sun-600/5 dark:from-bright-sun-300/5 via-transparent to-bright-sun-600/5 dark:to-bright-sun-300/5 blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-4xl md:text-6xl text-center mb-6 font-black uppercase italic tracking-tighter">
                        <span className="text-cerulean-blue-900 dark:text-white">
                            Our
                        </span>{" "}
                        <span className="text-bright-sun-600 dark:text-bright-sun-300">
                            Partners
                        </span>
                    </div>

                    <div className="text-lg md:text-xl mb-16 mx-auto text-gray-600 dark:text-gray-400 text-center max-w-2xl px-4 font-medium uppercase tracking-[3px]">
                        The Ecosystem <span className="text-bright-sun-600 dark:text-bright-sun-300">of Excellence</span>
                    </div>

                    <Carousel
                        slideSize={{ base: '100%', sm: '50%', lg: '25%' }}
                        slideGap="xl"
                        loop
                        align="start"
                        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-600 dark:[&_button]:!bg-bright-sun-300 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100 [&_button]:!w-12 [&_button]:!h-12 [&_button]:shadow-xl"
                        nextControlIcon={<IconArrowRight size={24} className="text-white dark:text-gray-900" />}
                        previousControlIcon={<IconArrowLeft size={24} className="text-white dark:text-gray-900" />}
                    >
                        {[
                            { name: "Rwanda Karate Federation", type: "FERWAKA", icon: "🥋", border: "border-red-500/30" },
                            { name: "Rwanda Gymnastics Federation", type: "FERWACY", icon: "🤸", border: "border-blue-500/30" },
                            { name: "RNOSC", type: "Olympic Committee", icon: "🏅", border: "border-bright-sun-300/30" },
                            { name: "Ministry of Sports", type: "Government Partner", icon: "🏛️", border: "border-blue-600/30" },
                            { name: "National Olympic Academy", type: "National Partner", icon: "🎓", border: "border-green-600/30" },
                            { name: "World Karate Federation", type: "WKF", icon: "🌍", border: "border-purple-500/30" },
                            { name: "International Olympic Committee", type: "IOC", icon: "⚡", border: "border-green-500/30" },
                            { name: "International Olympic Academy", type: "IOA", icon: "🏛️", border: "border-blue-400/30" },
                            { name: "ASWIS", type: "Social Workers in Sport", icon: "🤝", border: "border-orange-500/30" },
                            { name: "USA Karate", type: "International Partner", icon: "🇺🇸", border: "border-red-600/30" },
                            { name: "5280 Gymnastics", type: "International Partner", icon: "🤸‍♀️", border: "border-pink-500/30" },
                            { name: "Gasore Serge Foundation", type: "Foundation", icon: "❤️", border: "border-pink-500/30" },
                        ].map((partner, index) => (
                            <Carousel.Slide key={partner.name}>
                                <div
                                    className={`group relative flex flex-col items-center w-full gap-4 border border-gray-100 dark:border-white/10 bg-white dark:bg-cerulean-blue-900/40 backdrop-blur-sm p-8 rounded-3xl hover:cursor-pointer transition-all duration-300 ease-out hover:scale-[1.03] my-5 shadow-sm dark:shadow-none animate-breathing`}
                                    style={{
                                        animationDelay: `${index * 0.5}s`
                                    }}
                                >
                                    {/* Animated background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-bright-sun-600/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Icon with subtle animation */}
                                    <div className="text-5xl transform group-hover:scale-110 transition-all duration-500 relative z-10">
                                        {partner.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 space-y-2">
                                        <div className="text-cerulean-blue-900 dark:text-white text-lg font-black text-center group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors duration-300 uppercase tracking-tight leading-tight">
                                            {partner.name}
                                        </div>
                                        <div className="text-xs font-bold text-center text-gray-500 dark:text-gray-400 group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors duration-300 uppercase tracking-widest">
                                            {partner.type}
                                        </div>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bright-sun-600 dark:via-bright-sun-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </div>
            </div>

            {/* Achievements */}
            <div className="container mx-auto px-4 py-32">
                <div className="bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[3rem] p-12 md:p-20 shadow-sm dark:shadow-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bright-sun-600/5 dark:bg-bright-sun-300/5 blur-3xl -z-10"></div>
                    
                    <div className="text-center mb-16">
                        <div className={`inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs`}>
                            <IconTrophy size={16} />
                            <span>Milestones</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white mb-6 uppercase italic tracking-tighter">Our Achievements</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-wide">
                            Impact that speaks for itself.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((achievement, index) => (
                            <div
                                key={achievement.title}
                                className={`bg-white dark:bg-cerulean-blue-800/40 border border-gray-100 dark:border-white/10 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-[1.05] hover:shadow-xl shadow-sm dark:shadow-none group ${animate ? 'opacity-100' : 'opacity-0'}`}
                                style={{ animationDelay: `${1000 + index * 200}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 dark:bg-cerulean-blue-900/50 rounded-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                                    <achievement.icon className="text-bright-sun-600 dark:text-bright-sun-300" size={40} />
                                </div>
                                <div className="text-5xl font-black text-cerulean-blue-900 dark:text-white mb-3 italic tracking-tighter">{achievement.count}</div>
                                <div className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">{achievement.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Commitment - light in light mode, dark blue in dark mode */}
            <div className="container mx-auto px-4 py-32">
                <div className={`bg-white dark:bg-cerulean-blue-800 border border-gray-100 dark:border-white/10 rounded-[3.5rem] p-12 md:p-24 text-center transition-all duration-1000 shadow-2xl ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-bright-sun-100 dark:bg-white/10 rounded-3xl mb-12 border border-bright-sun-200 dark:border-white/20 shadow-inner">
                            <IconShield className="text-bright-sun-600 dark:text-bright-sun-300" size={48} />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-8 uppercase italic tracking-tighter">Our Commitment</h2>

                        <p className="text-gray-600 dark:text-gray-200 text-xl md:text-2xl font-medium mb-16 leading-relaxed">
                            At The Champions Sports Academy, we believe sport is more than competition.
                            It is an educational and social force that shapes healthier individuals and
                            stronger communities.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { name: 'Professionalism', icon: IconStar },
                                { name: 'Safeguarding', icon: IconShield },
                                { name: 'Inclusion', icon: IconUsers },
                                { name: 'Excellence', icon: IconTrophy }
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300 group cursor-pointer shadow-sm"
                                >
                                    <item.icon className="text-bright-sun-600 dark:text-bright-sun-300 mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                                    <div className="text-cerulean-blue-900 dark:text-white font-black uppercase tracking-widest text-xs">{item.name}</div>
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