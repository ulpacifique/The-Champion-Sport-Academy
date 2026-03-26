import { motion } from "framer-motion";
import { IconUser, IconUserCheck } from "@tabler/icons-react";
import { BOARD_MEMBERS, COACHES, MANAGEMENT_TEAM } from "../Data/teamOrganization";

/** Renders Board → Management → Coaches. Used once: About Us, under Strategic Partners (after carousel). */
export const TeamOrganizationContent = () => (
    <div className="w-full max-w-7xl mx-auto pt-16 md:pt-24 mt-12 md:mt-16 border-t border-gray-200 dark:border-white/10">
        <section className="mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-2 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                Board of Directors
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
                {BOARD_MEMBERS.map((name, index) => (
                    <motion.div
                        key={name}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 dark:bg-cerulean-blue-800/40 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center shadow-sm"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bright-sun-500/20 dark:bg-bright-sun-400/20 border-2 border-bright-sun-500 dark:border-bright-sun-400 flex items-center justify-center">
                            <IconUser className="text-bright-sun-600 dark:text-bright-sun-300" size={28} />
                        </div>
                        <span className="text-xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight">{name}</span>
                    </motion.div>
                ))}
            </div>
        </section>

        <section>
            <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-2 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                Management Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {MANAGEMENT_TEAM.map((member, index) => (
                    <motion.div
                        key={member.role}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-cerulean-blue-800/40 border-2 border-cerulean-blue-700 dark:border-cerulean-blue-500 rounded-2xl p-8 text-center shadow-lg"
                    >
                        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-bright-sun-500/20 dark:bg-bright-sun-400/20 border-2 border-bright-sun-500 dark:border-bright-sun-400 flex items-center justify-center">
                            <IconUser className="text-bright-sun-600 dark:text-bright-sun-300" size={36} />
                        </div>
                        <h3 className="text-xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight mb-1">{member.role}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{member.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        <section className="mt-20">
            <h2 className="text-3xl md:text-5xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-2 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
                Coaches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24 mt-14">
                {COACHES.map((coach, index) => (
                    <motion.div
                        key={coach.name}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: index * 0.06 }}
                        className="group relative text-center"
                    >
                        <div className="relative mb-10 w-full aspect-square max-w-[280px] mx-auto">
                            <div className="relative w-full h-full rounded-full overflow-hidden border-[8px] border-white dark:border-cerulean-blue-900 shadow-2xl transition-all duration-700 group-hover:shadow-bright-sun-600/20">
                                <img
                                    src={coach.image}
                                    alt={coach.name}
                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-3xl bg-bright-sun-400 dark:bg-bright-sun-300 shadow-xl flex items-center justify-center text-gray-900 transition-all duration-500 group-hover:rotate-12 z-10 border-4 border-white dark:border-cerulean-blue-900">
                                <IconUserCheck size={32} />
                            </div>
                        </div>
                        <span className="text-bright-sun-600 dark:text-bright-sun-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-1">
                            {coach.role}
                        </span>
                        <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter italic leading-none group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors duration-500 mb-2">
                            {coach.name}
                        </h3>
                        <div className="flex flex-col text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 space-y-1">
                            <span>{coach.specialty}</span>
                            <span className="text-bright-sun-600 dark:text-bright-sun-300 italic tracking-tight text-xs">{coach.experience} EXPERIENCE</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    </div>
);
