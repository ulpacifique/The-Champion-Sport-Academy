import { useState, useEffect } from "react";
import {
    IconActivity,
    IconArrowRight,
    IconShield,
    IconCertificate,
    IconCalendarEvent,
    IconShoppingCart,
    IconUsers,
    IconTrophy,
    IconMedal,
    IconAward,
    IconStar,
    IconClipboardList,
    IconHeart,
} from "@tabler/icons-react";

type PortfolioService = {
    n: number;
    title: string;
    tagline: string;
    description: string;
    icon: typeof IconActivity;
    accent: string;
    keyProgrammes?: string[];
    servicesInclude?: string[];
    eventTypes?: string[];
    keyAreas?: string[];
    focusAreas?: string[];
    clients?: string[];
    valueProposition?: string[];
    revenueModel?: string[];
    impact?: string[];
    strategicAdvantage?: string[];
    strategicVision?: string[];
};

const portfolioServices: PortfolioService[] = [
    {
        n: 1,
        title: "Youth Development Through Sport & Physical Literacy (Flagship Service)",
        tagline: "Core Impact Engine + Stable Revenue Stream",
        description:
            "A structured, values-based multi-sport development programme for children (ages 3–17), integrating Long-Term Athlete Development (LTAD) and Olympic Education.",
        icon: IconActivity,
        accent: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
        keyProgrammes: [
            "Weekend Programmes (Gymnastics, Karate, Multisport)",
            "Holiday Camps (High-volume revenue + visibility)",
            "School-Based Programmes (B2B contracts with schools)",
            "Home/Private Coaching (Premium service)",
        ],
        valueProposition: [
            "Builds physical literacy + life skills",
            "Aligns with education and health systems",
            "Creates long-term athlete and customer pipeline",
        ],
        revenueModel: [
            "Monthly subscriptions (recurring income)",
            "School contracts (institutional revenue)",
            "Premium private coaching fees",
        ],
        impact: [
            "Youth development, health, discipline, and inclusion",
            "Direct alignment with national sport and education priorities",
        ],
    },
    {
        n: 2,
        title: "Sports Programmes Design & Management",
        tagline: "Scalable Expertise-Based Revenue Stream",
        description:
            "Professional design, implementation, and management of sport programmes for institutions.",
        icon: IconClipboardList,
        accent: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
        servicesInclude: [
            "Curriculum development (schools, federations, NGOs)",
            "LTAD-based programme structuring",
            "Grassroots to performance pathway design",
            "Monitoring & evaluation systems",
        ],
        clients: [
            "Schools (local & international)",
            "Federations (e.g., FERWAKA, FERWAGY)",
            "Government institutions",
            "NGOs & international organizations",
        ],
        revenueModel: ["Consultancy fees (high-margin)", "Long-term programme management contracts"],
        impact: [
            "Raises national coaching and programme standards",
            "Supports system-level sport development",
        ],
    },
    {
        n: 3,
        title: "Sports Events Organization & Management",
        tagline: "High-Visibility + Sponsorship-Driven Revenue Engine",
        description:
            "Professional organization of national and international sport events, aligned with Olympic standards.",
        icon: IconCalendarEvent,
        accent: "from-green-500/10 to-green-600/5 border-green-500/20",
        eventTypes: [
            "National Championships (Karate, Gymnastics)",
            "Children’s Sport Festivals & Camps",
            "Coaching & Certification Events",
            "Corporate & Community Sport Events",
        ],
        revenueModel: [
            "Sponsorships & partnerships",
            "Participation fees",
            "Event hosting contracts",
            "Media & branding rights",
        ],
        strategicAdvantage: [
            "Positions CSA as a national leader in sport events",
            "Builds brand authority and partnerships",
        ],
        impact: [
            "Talent identification and development",
            "Community engagement and sport promotion",
        ],
    },
    {
        n: 4,
        title: "Sport Consultancy, Education & Well-being",
        tagline: "High-Value Knowledge & Social Impact Service",
        description:
            "A specialized service combining coaching education, sport science, and mental well-being in sport.",
        icon: IconHeart,
        accent: "from-bright-sun-500/10 to-bright-sun-600/5 border-bright-sun-500/30",
        keyAreas: [
            "Coach education & certification programmes",
            "Safe Sport & safeguarding training",
            "Athlete and coach mental health & well-being programmes",
            "Olympic education programmes",
            "Leadership in sport (values-based coaching)",
        ],
        clients: [
            "Coaches and clubs",
            "Schools and universities",
            "Federations and sport organizations",
            "Corporate organizations (well-being programmes)",
        ],
        revenueModel: [
            "Training fees and certification programmes",
            "Institutional consultancy contracts",
            "Workshops and seminars",
        ],
        impact: [
            "Addresses critical gap in mental health in sport (Rwanda & region)",
            "Builds a qualified and ethical coaching workforce",
        ],
    },
    {
        n: 5,
        title: "Sports Equipment Supply & Development (Made in Rwanda Initiative)",
        tagline: "Growth Engine + Long-Term Profit Expansion",
        description:
            "Development, sourcing, and distribution of affordable, safe, and locally adapted sports equipment.",
        icon: IconShoppingCart,
        accent: "from-orange-500/10 to-orange-600/5 border-orange-500/20",
        focusAreas: [
            "Gymnastics equipment (e.g., mats, beams, air tracks)",
            "Karate equipment (e.g., tatami, protective gear)",
            "School sport kits",
        ],
        strategicVision: [
            "Develop “Made in Rwanda” sports equipment",
            "Reduce dependency on imports",
            "Supply schools, clubs, and federations",
        ],
        revenueModel: [
            "Direct sales (B2C and B2B)",
            "Institutional supply contracts",
            "Equipment leasing for events",
        ],
        impact: [
            "Improves access to quality sport infrastructure",
            "Supports local industry and economic development",
        ],
    },
];

const integrationFlow = [
    "Service 1 (Youth Programmes) → Builds market base & impact",
    "Service 2 (Programme Design) → Expands institutional reach",
    "Service 3 (Events) → Enhances visibility & partnerships",
    "Service 4 (Consultancy & Well-being) → Establishes authority & expertise",
    "Service 5 (Equipment) → Drives scalable long-term profit",
];

const competitiveAdvantageBullets = [
    "Strong leadership expertise (international coaching, Olympic education, social work in sport)",
    "Proven impact and credibility in Rwanda",
    "Unique integration of: Sport + Education + Well-being; Grassroots + System Development",
    "Alignment with: Olympic values; LTAD frameworks; National and global sport policies",
];

const SportsDisciplines = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const achievements = [
        { title: "National Champions", count: "15", icon: IconTrophy },
        { title: "International Awards", count: "8", icon: IconAward },
        { title: "Certified Coaches", count: "25+", icon: IconCertificate },
        { title: "Community Events", count: "50+", icon: IconMedal },
    ];

    const ListBlock = ({ title, items }: { title: string; items: string[] }) => (
        <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-bright-sun-600 dark:text-bright-sun-400">{title}</h4>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {items.map((line) => (
                    <li key={line} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bright-sun-500" />
                        <span>{line}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 pt-32 pb-20 transition-colors duration-300">
            {/* Hero — What We Do / Core Services Portfolio */}
            <div className="container mx-auto px-4 mb-16 text-center">
                <div
                    className={`inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs transition-all duration-700 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    <IconActivity size={16} />
                    <span>What We Do</span>
                </div>
                <h1
                    className={`text-3xl md:text-5xl lg:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-4 uppercase italic tracking-tighter transition-all duration-1000 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    The Champions Sports Academy –{" "}
                    <span className="text-bright-sun-600 dark:text-bright-sun-300">Core Services Portfolio</span>
                </h1>
                <p
                    className={`text-lg md:text-xl font-bold text-cerulean-blue-800 dark:text-cerulean-blue-200 mb-4 transition-all duration-1000 delay-100 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    A Dual Impact &amp; Profit Model
                </p>
                <p
                    className={`text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    Comprehensive sports development from grassroots programmes to institutional design, events, education, and equipment — built for impact and sustainable growth.
                </p>
            </div>

            {/* Portfolio services */}
            <div className="container mx-auto px-4 max-w-5xl space-y-10 mb-24">
                {portfolioServices.map((service) => (
                    <article
                        key={service.n}
                        className={`relative overflow-hidden rounded-[2rem] border bg-gradient-to-br ${service.accent} bg-white/80 dark:bg-cerulean-blue-900/50 p-8 md:p-10 shadow-sm dark:shadow-none`}
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-cerulean-blue-800/60 shadow-sm`}
                            >
                                <service.icon className="text-bright-sun-600 dark:text-bright-sun-300" size={36} />
                            </div>
                            <div className="min-w-0 flex-1 space-y-6">
                                <div>
                                    <span className="text-xs font-black text-bright-sun-600 dark:text-bright-sun-400 uppercase tracking-widest">
                                        Service {service.n}
                                    </span>
                                    <h2 className="mt-1 text-xl md:text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tight leading-snug">
                                        {service.title}
                                    </h2>
                                    <p className="mt-2 text-sm font-bold text-bright-sun-700 dark:text-bright-sun-300">{service.tagline}</p>
                                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{service.description}</p>
                                </div>

                                <div className="grid gap-8 sm:grid-cols-2">
                                    {service.keyProgrammes && <ListBlock title="Key Programmes" items={service.keyProgrammes} />}
                                    {service.servicesInclude && <ListBlock title="Services Include" items={service.servicesInclude} />}
                                    {service.eventTypes && <ListBlock title="Event Types" items={service.eventTypes} />}
                                    {service.keyAreas && <ListBlock title="Key Areas" items={service.keyAreas} />}
                                    {service.focusAreas && <ListBlock title="Focus Areas" items={service.focusAreas} />}
                                    {service.clients && <ListBlock title="Clients" items={service.clients} />}
                                    {service.valueProposition && <ListBlock title="Value Proposition" items={service.valueProposition} />}
                                    {service.revenueModel && <ListBlock title="Revenue Model" items={service.revenueModel} />}
                                    {service.strategicAdvantage && <ListBlock title="Strategic Advantage" items={service.strategicAdvantage} />}
                                    {service.strategicVision && <ListBlock title="Strategic Vision" items={service.strategicVision} />}
                                    {service.impact && <ListBlock title="Impact" items={service.impact} />}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Integrated Strategic Positioning */}
            <div className="container mx-auto px-4 max-w-5xl mb-24">
                <div className="rounded-[2rem] border border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-cerulean-blue-900/40 p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter text-center mb-2">
                        Integrated Strategic Positioning
                    </h2>
                    <p className="text-center text-sm font-black uppercase tracking-widest text-bright-sun-600 dark:text-bright-sun-400 mb-10">
                        How the Services Work Together
                    </p>
                    <ul className="space-y-4 max-w-3xl mx-auto">
                        {integrationFlow.map((line) => (
                            <li
                                key={line}
                                className="flex items-start gap-3 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-cerulean-blue-800/30 px-4 py-3 text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium"
                            >
                                <IconArrowRight className="shrink-0 text-bright-sun-600 dark:text-bright-sun-400 mt-0.5" size={20} />
                                {line}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Competitive Advantage */}
            <div className="container mx-auto px-4 max-w-5xl mb-24">
                <h2 className="text-2xl md:text-4xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter text-center mb-10">
                    Competitive Advantage of{" "}
                    <span className="text-bright-sun-600 dark:text-bright-sun-300">The Champions Sports Academy</span>
                </h2>
                <ul className="space-y-4">
                    {competitiveAdvantageBullets.map((line) => (
                        <li
                            key={line}
                            className="flex gap-3 text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-bright-sun-500 pl-4 py-1"
                        >
                            <span className="font-medium">{line}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Final Strategic Statement */}
            <div className="container mx-auto px-4 max-w-5xl mb-24">
                <div className="rounded-[2rem] border-2 border-bright-sun-500/30 bg-gradient-to-br from-bright-sun-50/90 to-white dark:from-cerulean-blue-800/60 dark:to-cerulean-blue-900/80 p-8 md:p-12 text-center shadow-lg dark:shadow-none">
                    <p className="text-xs font-black uppercase tracking-widest text-bright-sun-700 dark:text-bright-sun-300 mb-4">
                        For Investors &amp; Board
                    </p>
                    <h2 className="text-xl md:text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tight mb-6 leading-snug">
                        Final Strategic Statement
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        The Champions Sports Academy operates as a <strong className="text-cerulean-blue-900 dark:text-white">hybrid sport enterprise</strong> that combines:
                    </p>
                    <ul className="text-left max-w-2xl mx-auto space-y-2 text-gray-700 dark:text-gray-300 mb-8 text-sm md:text-base">
                        <li className="flex gap-2">
                            <span className="text-bright-sun-600">•</span>
                            High-impact youth development programmes (social value)
                        </li>
                        <li className="flex gap-2">
                            <span className="text-bright-sun-600">•</span>
                            Professional sport services and consultancy (high-margin revenue)
                        </li>
                        <li className="flex gap-2">
                            <span className="text-bright-sun-600">•</span>
                            Events and equipment business (scalable commercial growth)
                        </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        This integrated model ensures:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Financial sustainability", "National relevance", "Regional and international scalability"].map((t) => (
                            <span
                                key={t}
                                className="inline-block rounded-full border border-bright-sun-500/40 bg-bright-sun-100/80 dark:bg-bright-sun-900/20 px-4 py-2 text-xs font-black uppercase tracking-wider text-cerulean-blue-900 dark:text-white"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div className="container mx-auto px-4 py-32">
                <div className="bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[3rem] p-12 md:p-20 shadow-sm dark:shadow-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bright-sun-600/5 dark:bg-bright-sun-300/5 blur-3xl -z-10"></div>

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-6 font-black uppercase tracking-widest text-xs">
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
                                className={`bg-white dark:bg-cerulean-blue-800/40 border border-gray-100 dark:border-white/10 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-[1.05] hover:shadow-xl shadow-sm dark:shadow-none group ${animate ? "opacity-100" : "opacity-0"}`}
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

            {/* Our Commitment */}
            <div className="container mx-auto px-4 py-32">
                <div
                    className={`bg-white dark:bg-cerulean-blue-800 border border-gray-100 dark:border-white/10 rounded-[3.5rem] p-12 md:p-24 text-center transition-all duration-1000 shadow-2xl ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-bright-sun-100 dark:bg-white/10 rounded-3xl mb-12 border border-bright-sun-200 dark:border-white/20 shadow-inner">
                            <IconShield className="text-bright-sun-600 dark:text-bright-sun-300" size={48} />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white mb-8 uppercase italic tracking-tighter">Our Commitment</h2>

                        <p className="text-gray-600 dark:text-gray-200 text-xl md:text-2xl font-medium mb-16 leading-relaxed">
                            At The Champions Sports Academy, we believe sport is more than competition. It is an educational and social force that shapes healthier individuals and stronger communities.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { name: "Professionalism", icon: IconStar },
                                { name: "Safeguarding", icon: IconShield },
                                { name: "Inclusion", icon: IconUsers },
                                { name: "Excellence", icon: IconTrophy },
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
