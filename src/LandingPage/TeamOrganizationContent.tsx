import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { IconUser, IconUserCheck, IconCrown, IconBriefcase, IconTrophy } from "@tabler/icons-react";
import { BOARD_PROFILE_GROUPS, COACHES, MANAGERS } from "../Data/teamOrganization";

const orgLine = "mx-auto h-6 w-px shrink-0 bg-cerulean-blue-900/35 dark:bg-bright-sun-400/40";

function OrgBoxWhite({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={`rounded-xl border-2 border-cerulean-blue-900 bg-white px-3 py-3 text-center shadow-sm dark:border-bright-sun-500/35 dark:bg-white/[0.06] ${className}`}
        >
            <div className="text-[10px] font-black uppercase leading-tight tracking-tight text-cerulean-blue-900 dark:text-white sm:text-xs md:text-sm">
                {children}
            </div>
        </div>
    );
}

function OrgBoxBlue({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`rounded-xl bg-cerulean-blue-900 px-3 py-3 text-center shadow-md dark:ring-1 dark:ring-white/10 ${className}`}>
            <div className="text-[10px] font-black uppercase leading-tight tracking-wide text-white sm:text-xs">{children}</div>
        </div>
    );
}

function OrgAssistantPill() {
    return (
        <div className="mt-2 rounded-lg bg-cerulean-blue-900 px-2 py-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
            Assistant Coaches
        </div>
    );
}

/** Renders Board → Managers → Coaches. Used once: About Us, under Strategic Partners (after carousel). */
export const TeamOrganizationContent = () => (
    <div className="w-full max-w-7xl mx-auto pt-0">
        {/* Board of Directors Section */}
        <section className="mb-28">
            <div className="text-center mb-8 md:mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bright-sun-500 to-bright-sun-600 shadow-lg mb-4">
                    <IconCrown className="text-white" size={32} />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter mb-3">
                    Board of <span className="text-bright-sun-600 dark:text-bright-sun-400">Directors</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-bright-sun-500 to-cerulean-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto mb-16 md:mb-20 space-y-14 px-4">
                {/* Organizational structure (chart) */}
                <div className="mb-14 md:mb-16 max-w-5xl mx-auto px-4">
                    <div className="flex flex-col items-center gap-0">
                        <OrgBoxWhite className="w-full max-w-sm">Board of Directors</OrgBoxWhite>
                        <div className={orgLine} aria-hidden />
                        <OrgBoxWhite className="w-full max-w-sm">Chief Executive Officer (CEO)</OrgBoxWhite>
                        <div className={orgLine} aria-hidden />

                        <div className="grid w-full gap-8 pt-2 lg:grid-cols-2 lg:gap-10">
                            {/* Programmes branch */}
                            <div className="flex flex-col items-center">
                                <OrgBoxBlue className="w-full max-w-md">
                                    Programmes &amp; Projects Manager
                                </OrgBoxBlue>
                                <div className={orgLine} aria-hidden />
                                <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
                                    <div className="flex flex-col items-stretch">
                                        <OrgBoxWhite>Karate Head Coach</OrgBoxWhite>
                                        <OrgAssistantPill />
                                    </div>
                                    <div className="flex flex-col items-stretch">
                                        <OrgBoxWhite>Gymnastics Head Coach</OrgBoxWhite>
                                        <OrgAssistantPill />
                                    </div>
                                    <div className="flex flex-col items-stretch sm:col-span-1">
                                        <OrgBoxWhite>Multi-Sports Head Coach</OrgBoxWhite>
                                        <OrgAssistantPill />
                                    </div>
                                </div>
                            </div>

                            {/* Administration branch */}
                            <div className="flex flex-col items-center">
                                <OrgBoxBlue className="w-full max-w-md">
                                    Administrative &amp; Finance Manager
                                </OrgBoxBlue>
                                <div className={orgLine} aria-hidden />
                                <OrgBoxWhite className="w-full max-w-md">Events &amp; Education Coordinator</OrgBoxWhite>
                            </div>
                        </div>

                        <div className={orgLine} aria-hidden />
                        <OrgBoxWhite className="mt-1 w-full max-w-3xl">
                            <span className="block">Support Staff</span>
                            <span className="mt-2 block text-[9px] font-semibold normal-case tracking-normal text-gray-600 dark:text-gray-300 sm:text-[10px]">
                                (Logistics, Communication, Safeguarding)
                            </span>
                        </OrgBoxWhite>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" aria-hidden />

                {BOARD_PROFILE_GROUPS.map((group, groupIndex) => (
                    <div key={group.title} className="space-y-8">
                        <h3
                            className={`flex flex-wrap items-center justify-center gap-2 text-center font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white ${
                                groupIndex === 0
                                    ? "text-2xl sm:text-3xl md:text-4xl"
                                    : "text-xl md:text-2xl"
                            }`}
                        >
                            <span className={groupIndex === 0 ? "text-3xl sm:text-4xl" : "text-2xl"} aria-hidden>
                                {group.emoji}
                            </span>
                            {group.title}
                        </h3>
                        <div
                            className={`grid gap-6 ${
                                group.items.length === 1
                                    ? "grid-cols-1 max-w-md mx-auto md:max-w-lg"
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            }`}
                        >
                            {group.items.map((item, idx) => (
                                <motion.div
                                    key={item.role}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.12 }}
                                    transition={{ delay: (groupIndex * 0.05 + idx) * 0.06, duration: 0.45 }}
                                    whileHover={{ y: -6 }}
                                    className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:border-white/10 dark:from-cerulean-blue-900/30 dark:to-cerulean-blue-800/20 p-6 md:p-8 text-center shadow-sm transition-all duration-300 hover:border-bright-sun-500/40 hover:shadow-xl dark:hover:border-bright-sun-400/30"
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bright-sun-500/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:from-bright-sun-500/5 group-hover:opacity-100" />
                                    <div className="relative flex w-full flex-col items-center">
                                        <div className="mb-5 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-bright-sun-500 bg-gradient-to-br from-bright-sun-500/20 to-bright-sun-400/20 dark:border-bright-sun-400 dark:from-bright-sun-400/20 dark:to-bright-sun-300/20 transition-transform duration-300 group-hover:scale-105">
                                            <IconUser className="text-bright-sun-600 dark:text-bright-sun-300" size={40} />
                                        </div>
                                        <h4 className="text-base font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white md:text-lg leading-snug">
                                            {item.role}
                                        </h4>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

