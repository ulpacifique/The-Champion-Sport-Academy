import { motion } from "framer-motion";
import { IconUser, IconUserCheck, IconCrown, IconBriefcase, IconTrophy } from "@tabler/icons-react";
import { COACHES, MANAGERS } from "../Data/teamOrganization";

/** Renders Board → Managers → Coaches. Used once: About Us, under Strategic Partners (after carousel). */
export const TeamOrganizationContent = () => (
    <div className="w-full max-w-7xl mx-auto pt-16 md:pt-24 mt-12 md:mt-16">
        {/* Board of Directors Section */}
        <section className="mb-28">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bright-sun-500 to-bright-sun-600 shadow-lg mb-4">
                    <IconCrown className="text-white" size={32} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter mb-3">
                    Board of <span className="text-bright-sun-600 dark:text-bright-sun-400">Directors</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-bright-sun-500 to-cerulean-blue-500 mx-auto rounded-full"></div>
                <p className="mt-6 text-lg md:text-xl font-semibold italic text-cerulean-blue-800 dark:text-cerulean-blue-200">
                    The Champions Sports Academy
                </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16 md:mb-20 space-y-10 px-4">
                <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                    At <strong className="text-cerulean-blue-900 dark:text-white">The Champions Sports Academy</strong>, the Board of Directors provides{" "}
                    <strong>strategic leadership, governance, and oversight</strong>, ensuring the organization delivers both{" "}
                    <strong>sustainable growth</strong> and <strong>lasting social impact through sport</strong>.
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" aria-hidden />

                <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white">
                        <span className="text-2xl" aria-hidden>🔵</span>
                        Governance Leadership
                    </h3>
                    <ul className="space-y-5 text-gray-700 dark:text-gray-300">
                        <li>
                            <p className="font-bold text-cerulean-blue-900 dark:text-white">Chairperson of the Board</p>
                            <p className="mt-1 text-sm md:text-base leading-relaxed">
                                Provides overall leadership of the Board, ensuring strategic direction, effective governance, and alignment with the Academy’s vision and mission.
                            </p>
                        </li>
                        <li>
                            <p className="font-bold text-cerulean-blue-900 dark:text-white">Vice Chairperson of the Board</p>
                            <p className="mt-1 text-sm md:text-base leading-relaxed">
                                Supports the Chairperson and ensures continuity of leadership, contributing to coordination and effectiveness of Board functions.
                            </p>
                        </li>
                        <li>
                            <p className="font-bold text-cerulean-blue-900 dark:text-white">Board Secretary</p>
                            <p className="mt-1 text-sm md:text-base leading-relaxed">
                                Oversees governance processes, ensures compliance, and manages Board documentation, meetings, and institutional records.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white">
                        <span className="text-2xl" aria-hidden>🟡</span>
                        Executive Leadership
                    </h3>
                    <div className="rounded-2xl border border-bright-sun-200 dark:border-bright-sun-500/30 bg-gradient-to-br from-bright-sun-50/80 to-white dark:from-cerulean-blue-900/40 dark:to-cerulean-blue-800/20 p-6 md:p-8">
                        <p className="font-bold text-cerulean-blue-900 dark:text-white">CEO / Executive Director</p>
                        <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                            Leads the Academy’s operations and implements the strategic direction set by the Board, ensuring alignment between programmes, business growth, and social impact.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white">
                        <span className="text-2xl" aria-hidden>🟡</span>
                        Strategic Directors
                    </h3>
                    <ul className="space-y-5 text-gray-700 dark:text-gray-300">
                        <li>
                            <p className="font-bold text-cerulean-blue-900 dark:text-white">Director of Legal &amp; Governance</p>
                            <p className="mt-1 text-sm md:text-base leading-relaxed">
                                Ensures compliance with legal frameworks and governance standards, manages risk, and supports ethical and transparent operations.
                            </p>
                        </li>
                        <li>
                            <p className="font-bold text-cerulean-blue-900 dark:text-white">Director of Marketing &amp; Partnerships</p>
                            <p className="mt-1 text-sm md:text-base leading-relaxed">
                                Leads branding, communication, and strategic partnerships, driving visibility, sponsorship, and organizational growth.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" aria-hidden />

                <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white">
                        Director of Programmes &amp; Projects
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        Oversees the design and implementation of sport programmes and projects, ensuring alignment with physical literacy, long-term athlete development, and the Academy’s core values.
                    </p>
                </div>

                <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white">
                        <span className="text-2xl" aria-hidden>⚪</span>
                        Board Members (Advisory &amp; Expertise)
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        The Board is supported by additional members who bring specialized expertise in areas such as:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300 list-disc list-inside marker:text-bright-sun-500">
                        <li>Finance &amp; Investment</li>
                        <li>Sport Development &amp; Coaching</li>
                        <li>Social Impact &amp; Safeguarding</li>
                        <li>Infrastructure &amp; Innovation</li>
                        <li>Education &amp; Research</li>
                        <li>International Relations</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        These members strengthen strategic decision-making and support the Academy’s long-term development.
                    </p>
                </div>

                <div className="rounded-2xl border border-cerulean-blue-200 dark:border-cerulean-blue-600/40 bg-cerulean-blue-50/50 dark:bg-cerulean-blue-900/30 p-6 md:p-8">
                    <p className="text-center text-gray-800 dark:text-gray-200 text-sm md:text-base leading-relaxed">
                        The Board of Directors ensures that <strong className="text-cerulean-blue-900 dark:text-white">The Champions Sports Academy</strong> operates with integrity, professionalism, and strategic focus, positioning the organization as a{" "}
                        <strong>leading model of sport development, education, and innovation at national, regional, and international levels</strong>.
                    </p>
                </div>
            </div>
        </section>

        {/* Managers Section */}
        <section className="mb-28">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cerulean-blue-600 to-cerulean-blue-700 shadow-lg mb-4">
                    <IconBriefcase className="text-white" size={32} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter mb-3">
                    <span className="text-bright-sun-600 dark:text-bright-sun-400">Managers</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cerulean-blue-500 to-bright-sun-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MANAGERS.map((member, index) => (
                    <motion.div
                        key={member.role}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -8 }}
                        className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-cerulean-blue-900/30 dark:to-cerulean-blue-800/20 border-2 border-cerulean-blue-200 dark:border-cerulean-blue-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                        {/* Background gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-bright-sun-500/0 to-bright-sun-500/0 group-hover:from-bright-sun-500/5 group-hover:to-bright-sun-500/10 transition-all duration-500"></div>
                        
                        <div className="relative">
                            <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-to-br from-bright-sun-500/30 to-bright-sun-400/30 dark:from-bright-sun-400/30 dark:to-bright-sun-300/30 border-3 border-bright-sun-500 dark:border-bright-sun-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <IconUser className="text-bright-sun-600 dark:text-bright-sun-300" size={40} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight mb-2 leading-snug">
                                {member.role}
                            </h3>
                            <div className="w-12 h-0.5 bg-bright-sun-500 mx-auto rounded-full"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Coaches Section */}
        <section className="mb-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bright-sun-500 to-bright-sun-600 shadow-lg mb-4">
                    <IconTrophy className="text-white" size={32} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter mb-3">
                    Our <span className="text-bright-sun-600 dark:text-bright-sun-400">Coaches</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-bright-sun-500 to-cerulean-blue-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                    Meet our team of dedicated professionals committed to excellence
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20 mt-8">
                {COACHES.map((coach, index) => (
                    <motion.div
                        key={coach.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: index * 0.06, duration: 0.5 }}
                        whileHover={{ y: -10 }}
                        className="group relative text-center"
                    >
                        {/* Image Container */}
                        <div className="relative mb-6 w-full aspect-square max-w-[260px] mx-auto">
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-cerulean-blue-900 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-bright-sun-500/30">
                                <img
                                    src={coach.image}
                                    alt={coach.name}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                />
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            {/* Decorative ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-bright-sun-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                            {/* Icon Badge */}
                            <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-bright-sun-500 to-bright-sun-600 shadow-xl flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 z-10 border-2 border-white dark:border-cerulean-blue-900">
                                <IconUserCheck size={28} />
                            </div>
                        </div>
                        
                        {/* Role Badge */}
                        <div className="mb-3">
                            <span className="inline-block px-4 py-1.5 bg-bright-sun-100 dark:bg-bright-sun-900/30 text-bright-sun-700 dark:text-bright-sun-400 text-[11px] font-black uppercase tracking-wider rounded-full">
                                {coach.role}
                            </span>
                        </div>
                        
                        {/* Name */}
                        <div className="space-y-1 mb-3">
                            <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter leading-tight group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-400 transition-colors duration-300">
                                {coach.name}
                            </h3>
                            {coach.sname && coach.sname.trim() && (
                                <p className="text-sm font-bold text-cerulean-blue-600 dark:text-cerulean-blue-400 uppercase tracking-wide">
                                    {coach.sname}
                                </p>
                            )}
                        </div>
                        
                        {/* Divider */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-bright-sun-500 to-cerulean-blue-500 mx-auto mb-3 rounded-full"></div>
                        
                        {/* Details */}
                        <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                {coach.specialty}
                            </p>
                            <p className="text-xs font-black uppercase tracking-wider text-bright-sun-600 dark:text-bright-sun-400">
                                {coach.experience}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    </div>
);

