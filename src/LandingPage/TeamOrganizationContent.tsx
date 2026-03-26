import { motion } from "framer-motion";
import { IconUser, IconUserCheck, IconCrown, IconBriefcase, IconTrophy } from "@tabler/icons-react";
import { BOARD_MEMBERS, COACHES, MANAGEMENT_TEAM } from "../Data/teamOrganization";

/** Renders Board → Management → Coaches. Used once: About Us, under Strategic Partners (after carousel). */
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
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
                {BOARD_MEMBERS.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        whileHover={{ y: -8 }}
                        className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-cerulean-blue-900/30 dark:to-cerulean-blue-800/20 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        {/* Decorative gradient overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bright-sun-500/0 to-bright-sun-500/0 group-hover:from-bright-sun-500/5 group-hover:to-bright-sun-500/10 transition-all duration-500"></div>
                        
                        <div className="relative">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-bright-sun-500/20 to-bright-sun-400/20 dark:from-bright-sun-400/20 dark:to-bright-sun-300/20 border-2 border-bright-sun-500 dark:border-bright-sun-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <IconUser className="text-bright-sun-600 dark:text-bright-sun-300" size={32} />
                            </div>
                            <div className="space-y-2">
                                <span className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight block">
                                    {member}
                                </span>
                                <div className="h-0.5 w-12 bg-gradient-to-r from-bright-sun-500 to-transparent mx-auto rounded-full"></div>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                                    Director
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Management Team Section */}
        <section className="mb-28">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cerulean-blue-600 to-cerulean-blue-700 shadow-lg mb-4">
                    <IconBriefcase className="text-white" size={32} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter mb-3">
                    Management <span className="text-bright-sun-600 dark:text-bright-sun-400">Team</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cerulean-blue-500 to-bright-sun-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MANAGEMENT_TEAM.map((member, index) => (
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
                            <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight mb-2">
                                {member.role}
                            </h3>
                            <div className="w-12 h-0.5 bg-bright-sun-500 mx-auto mb-3 rounded-full"></div>
                            <p className="text-gray-600 dark:text-gray-300 text-base font-medium">
                                {member.name}
                            </p>
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

// Add this to your global CSS or tailwind config for spinning animation
// @keyframes spin-slow {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
// .animate-spin-slow {
//   animation: spin-slow 20s linear infinite;
// }