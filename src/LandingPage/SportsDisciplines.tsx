import { Carousel } from "@mantine/carousel";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
    IconKarate,
    IconGymnastics,
    IconSchool,
    IconCertificate,
    IconCalendarEvent,
    IconShoppingCart,
    IconBuilding,
    IconWorld,
    IconUsers,
    IconTrophy
} from "@tabler/icons-react";

const SportsDisciplines = () => {
    // Core Services Data
    const coreServices = [
        {
            title: "Sport & Physical Literacy Programmes",
            icon: IconKarate,
            description: "Karate, Gymnastics, and Multi-Sport programmes for children and youth",
            color: "border-red-500/50",
            iconColor: "text-red-400"
        },
        {
            title: "School-Based Programmes",
            icon: IconSchool,
            description: "Structured sport and physical activity initiatives delivered in partnership with schools",
            color: "border-blue-500/50",
            iconColor: "text-blue-400"
        },
        {
            title: "Coach Education & Certification",
            icon: IconCertificate,
            description: "Capacity building for coaches through training, mentoring, and professional development",
            color: "border-yellow-500/50",
            iconColor: "text-yellow-400"
        },
        {
            title: "Events & Competitions",
            icon: IconCalendarEvent,
            description: "Organization and management of sport events, training camps, competitions, and health-focused workshops",
            color: "border-green-500/50",
            iconColor: "text-green-400"
        },
        {
            title: "Sports Equipment Shop",
            icon: IconShoppingCart,
            description: "Provision of sports equipment, uniforms, and training materials supporting programmes and community sport",
            color: "border-purple-500/50",
            iconColor: "text-purple-400"
        },
        {
            title: "Complete Sports Ecosystem",
            icon: IconBuilding,
            description: "End-to-end support for athletes and coaches with international partnership networks",
            color: "border-bright-sun-400/50",
            iconColor: "text-bright-sun-400"
        }
    ];

    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl text-center mb-3 font-semibold text-white">
                Our <span className="text-bright-sun-400">Core</span> Services
            </div>
            <div className="text-lg mb-10 mx-auto text-gray-400 text-center w-1/2">
                Comprehensive sports development ecosystem from training to competition
            </div>

            <Carousel
                slideSize="22%"
                slideGap="md"
                loop
                align="start"
                className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
                nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {coreServices.map((service, index) => (
                    <Carousel.Slide key={service.title}>
                        <div className={`flex flex-col items-center w-64 gap-3 border ${service.color} p-6 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out hover:scale-[1.02]`}>
                            <div className="p-3 bg-gray-800/50 rounded-full border border-gray-700">
                                <div className="h-10 w-10 flex items-center justify-center">
                                    <service.icon size={28} className={service.iconColor} />
                                </div>
                            </div>
                            <div className="text-white text-xl font-semibold text-center">{service.title}</div>
                            <div className="text-sm text-center text-gray-400 h-16 overflow-hidden">
                                {service.description}
                            </div>
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>

            {/* Partners Section */}
            <div className="mt-16 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-bright-sun-400/5 via-transparent to-bright-sun-400/5 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="text-4xl md:text-5xl text-center mb-4 font-bold">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Our
                        </span>{" "}
                        <span className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 bg-clip-text text-transparent">
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
                        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-gradient-to-r [&_button]:!from-bright-sun-400 [&_button]:!to-bright-sun-500 [&_button]:!border-none [&_button]:hover:!opacity-90 [&_button]:!opacity-0 hover:[&_button]:!opacity-100 [&_button]:!transition-all [&_button]:!duration-300 [&_button]:!shadow-lg [&_button]:!shadow-bright-sun-400/20"
                        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
                    >
                        {[
                            { name: "Rwanda Karate Federation", type: "Federation", icon: "🥋", gradient: "from-red-500/20 to-red-600/20", border: "border-red-500/30" },
                            { name: "Rwanda Gymnastics Federation", type: "Federation", icon: "🤸", gradient: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30" },
                            { name: "RNOSC", type: "Olympic Committee", icon: "🏅", gradient: "from-yellow-500/20 to-yellow-600/20", border: "border-yellow-500/30" },
                            { name: "World Karate Federation", type: "International", icon: "🌍", gradient: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30" },
                            { name: "International Olympic Committee", type: "Olympic", icon: "⚡", gradient: "from-green-500/20 to-green-600/20", border: "border-green-500/30" },
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
                                        <div className="text-white text-lg font-bold text-center group-hover:text-bright-sun-400 transition-colors duration-300">
                                            {partner.name}
                                        </div>
                                        <div className="text-sm text-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                            {partner.type}
                                        </div>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bright-sun-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </div>
            </div>

            {/* Ecosystem Highlights */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-400/50 transition duration-300">
                    <div className="w-12 h-12 bg-bright-sun-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconUsers className="text-bright-sun-400" size={24} />
                    </div>
                    <div className="text-white text-xl font-semibold mb-2">Athlete Journey</div>
                    <div className="text-sm text-gray-400">
                        Physical Literacy → Skill Development → Competition
                    </div>
                </div>

                <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-400/50 transition duration-300">
                    <div className="w-12 h-12 bg-bright-sun-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconCertificate className="text-bright-sun-400" size={24} />
                    </div>
                    <div className="text-white text-xl font-semibold mb-2">Coach Development</div>
                    <div className="text-sm text-gray-400">
                        Certification → Mentoring → Professional Development
                    </div>
                </div>

                <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-400/50 transition duration-300">
                    <div className="w-12 h-12 bg-bright-sun-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconWorld className="text-bright-sun-400" size={24} />
                    </div>
                    <div className="text-white text-xl font-semibold mb-2">Global Network</div>
                    <div className="text-sm text-gray-400">
                        International standards and partnership opportunities
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsDisciplines;