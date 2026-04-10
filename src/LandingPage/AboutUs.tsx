import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import {
  IconTrophy,
  IconTarget,
  IconUsers,
  IconSparkles,
  IconMedal,
  IconUserCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { coreValuesData } from "../Data/coreValues";
import { TeamOrganizationContent } from "./TeamOrganizationContent";

const STRATEGIC_PARTNERS: { name: string; type: string }[] = [
  { name: "Rwanda Karate Federation (FERWAKA)", type: "National Partner" },
  { name: "Rwanda Gymnastics Federation (FERWACY)", type: "National Partner" },
  { name: "Rwanda National Olympic & Sports Committee (RNOSC)", type: "National Olympic Committee" },
  { name: "Ministry of Sports", type: "Government Partner" },
  { name: "National Olympic & Sports Academy", type: "National Partner" },
  { name: "World Karate Federation (WKF)", type: "International Partner" },
  { name: "International Olympic Committee (IOC)", type: "International Partner" },
  { name: "International Olympic Academy (IOA)", type: "International Partner" },
  { name: "Alliance of Social Workers in Sport (ASWIS)", type: "International Network" },
  { name: "USA Karate", type: "International Partner" },
  { name: "5280 Gymnastics", type: "International Partner" },
  { name: "Gasore Serge Foundation", type: "Foundation" },
];

const AboutUs = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Core values: avatar from public/avatar (1st, 2nd, 3rd, 4th, logo for the five values)
  const avatarFiles = ["1st.png", "2nd avatart.png", "3rd.png", "4th.png", "logo.png"];
  const coreValues = coreValuesData.map((v, i) => ({
    ...v,
    tagline: v.tagline || v.description.slice(0, 80) + ".",
    avatar: `${import.meta.env.BASE_URL}avatar/${avatarFiles[i]}`,
  }));
  // Card header colors to match reference: Discipline & Excellence = gold/amber, Friendship & Respect = light blue, Teamwork = darker blue
  const valueHeaderBg = [
    "bg-amber-500 dark:bg-bright-sun-500",           // Discipline
    "bg-sky-400 dark:bg-cerulean-blue-400",          // Friendship
    "bg-cerulean-blue-700 dark:bg-cerulean-blue-600", // Teamwork
    "bg-sky-400 dark:bg-cerulean-blue-400",          // Respect
    "bg-amber-500 dark:bg-bright-sun-500",           // Excellence
  ];


  // Statistics
  const stats = [
    { value: "4,300+", label: "Children & Youth Reached", value2: "10,000+", label2: "Indirectly reached", icon: IconUsers, color: "text-blue-600 dark:text-blue-400" },
    { value: "600+", label: "Coaches Trained & Mentored", icon: IconUserCheck, color: "text-bright-sun-600 dark:text-bright-sun-300" },
    { value: "223+", label: "Medals Won", icon: IconMedal, color: "text-green-600 dark:text-green-400" },
    { value: "18", label: "Trophies Won", icon: IconTrophy, color: "text-purple-600 dark:text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bright-sun-300/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-8 font-black uppercase tracking-widest text-xl"
            >
              <IconTarget size={40} />
              <span>WE ARE THE CHAMPIONS FOR LIFE</span>
            </motion.div>

            <div className="h-1.5 w-32 bg-bright-sun-600 dark:bg-bright-sun-300 mx-auto rounded-full mb-12"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group p-1 w-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-bright-sun-600 to-cerulean-blue-600 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[2.5rem] p-12 transition-all duration-700 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 shadow-sm">
                <div className="flex items-center space-x-6 mb-8 text-center sm:text-left">
                  <div className="w-20 h-20 bg-bright-sun-600 dark:bg-bright-sun-300 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <IconTarget className="text-white dark:text-cerulean-blue-950" size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">Our Vision</h2>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic border-l-8 border-bright-sun-600 dark:border-bright-sun-300 pl-8">
                  "To become a global hub of inclusive sport and physical literacy that promotes
                  <span className="text-bright-sun-600 dark:text-bright-sun-300 font-black"> excellence, health, and lifelong well-being</span>"
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group p-1 w-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-cerulean-blue-600 to-bright-sun-600 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[2.5rem] p-12 transition-all duration-700 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 shadow-sm">
                <div className="flex items-center space-x-6 mb-8 text-center sm:text-left">
                  <div className="w-20 h-20 bg-bright-sun-600 dark:bg-bright-sun-300 rounded-3xl flex items-center justify-center shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <IconTrophy className="text-white dark:text-cerulean-blue-950" size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">Our Mission</h2>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic border-l-8 border-bright-sun-600 dark:border-bright-sun-300 pl-8">
                  "To empower people through inclusive sport, physical literacy, and values-based
                  education programmes that promote
                  <span className="text-bright-sun-600 dark:text-bright-sun-300 font-black"> excellence, health, and lifelong well-being</span>"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 px-4">
            <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-6 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">Impact  <span className="text-bright-sun-600 dark:text-bright-sun-300"></span></h2>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em] text-sm">Quantifying our reach across Rwanda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-[2.5rem] p-10 text-center shadow-sm dark:shadow-none transition-all duration-500 hover:scale-105 group"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 ${stat.color} bg-gray-50 dark:bg-cerulean-blue-800 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                  <stat.icon size={40} />
                </div>
                <div className="text-5xl font-black text-cerulean-blue-900 dark:text-white mb-3 italic tracking-tighter uppercase">{stat.value}</div>
                <div className="text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest text-[10px] leading-relaxed">{stat.label}</div>
                {stat.value2 && (
                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
                    <div className="text-4xl font-black text-cerulean-blue-900 dark:text-white mb-2 italic tracking-tighter uppercase">{stat.value2}</div>
                    <div className="text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest text-[10px] leading-relaxed">{stat.label2}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-6xl px-4 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
              <div className="flex min-w-0 flex-col">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-cerulean-blue-200/80 bg-black shadow-xl shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/cpP0s5yQK0Y?rel=0&modestbranding=1&loop=1&playlist=cpP0s5yQK0Y"
                    title="The Champions Sports Academy — impact and reach in Rwanda"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center">
                  <a
                    href="https://youtu.be/cpP0s5yQK0Y?si=IAqvZOUSiePUR6oP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                  >
                    Open on YouTube
                  </a>
                </p>
              </div>
              <div className="flex min-w-0 flex-col">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-cerulean-blue-200/80 bg-black shadow-xl shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/tL7qN5kMznc?rel=0&modestbranding=1&loop=1&playlist=tL7qN5kMznc"
                    title="The Champions Sports Academy — impact video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center">
                  <a
                    href="https://youtu.be/tL7qN5kMznc?si=FvtQZY-eWA0YTSSq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                  >
                    Open on YouTube
                  </a>
                </p>
              </div>
            </div>
            <div className="mx-auto mt-8 flex w-full max-w-md min-w-0 flex-col sm:max-w-lg md:mt-10 md:max-w-xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-cerulean-blue-200/80 bg-black shadow-xl shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/Yak1QYwXhj4?rel=0&modestbranding=1&loop=1&playlist=Yak1QYwXhj4"
                  title="The Champions Sports Academy — additional impact story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-center">
                <a
                  href="https://youtu.be/Yak1QYwXhj4?feature=shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                >
                  Open on YouTube
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional History Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-8 font-black uppercase tracking-widest text-xs"
            >
              <IconSparkles size={16} />
              <span>Our Evolutionary Path</span>
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-6 leading-none">
              Professional <span className="text-bright-sun-600 dark:text-bright-sun-300">History</span>
            </h2>
            <div className="h-1.5 w-32 bg-bright-sun-600 dark:bg-bright-sun-300 mx-auto rounded-full"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-50 dark:bg-cerulean-blue-900/20"
          >
            <img
              src={`${import.meta.env.BASE_URL}athletes/History.jpeg`}
              alt="The Champions Sports Academy Ltd 2017–2026: A Journey of Growth, Impact & Leadership"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Values: logo + gold lines, five cards (colored headers, avatars, taglines). Dark: solid cerulean-blue-900 — no section border / strip lines */}
      <section className="relative overflow-hidden bg-sky-50/95 dark:bg-cerulean-blue-900 py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,189,32,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,189,32,0.06),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_90%,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[length:28px_28px] dark:hidden" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col items-center md:mb-16">
            <div className="flex w-full max-w-lg items-center justify-center gap-3 md:gap-5">
              <span className="h-px min-w-[48px] flex-1 bg-gradient-to-r from-transparent to-bright-sun-500 dark:from-transparent dark:to-bright-sun-400 md:min-w-[72px]" aria-hidden />
              <div className="relative shrink-0 rounded-full p-[3px] shadow-lg shadow-black/10 ring-2 ring-bright-sun-400/90 dark:ring-bright-sun-400/80 dark:shadow-black/30">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-cerulean-blue-900 md:h-28 md:w-28">
                  <img
                    src={`${import.meta.env.BASE_URL}champion-logo.png`}
                    alt="The Champions Sports Academy"
                    className="h-full w-full object-contain p-1.5"
                  />
                </div>
              </div>
              <span className="h-px min-w-[48px] flex-1 bg-gradient-to-l from-transparent to-bright-sun-500 dark:from-transparent dark:to-bright-sun-400 md:min-w-[72px]" aria-hidden />
            </div>

            <div className="mt-8 space-y-2 text-center">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <span className="hidden h-px w-10 bg-bright-sun-500/80 dark:bg-bright-sun-400/90 sm:block md:w-16" aria-hidden />
                <h2 className="text-lg font-black uppercase tracking-[0.12em] text-cerulean-blue-900 dark:text-white md:text-xl">
                  The Core Values of
                </h2>
                <span className="hidden h-px w-10 bg-bright-sun-500/80 dark:bg-bright-sun-400/90 sm:block md:w-16" aria-hidden />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-cerulean-blue-900 dark:text-white md:text-3xl lg:text-4xl">
                The Champions Sports Academy
              </h3>
              <p className="text-base font-bold italic text-bright-sun-600 dark:text-bright-sun-300 md:text-lg">
                We Are The Champions for Life
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200/80 dark:bg-gradient-to-b dark:from-cerulean-blue-800 dark:via-cerulean-blue-900 dark:to-[#121a44] dark:shadow-[0_14px_32px_-10px_rgba(17,39,86,0.55),0_5px_0_0_rgba(10,26,72,0.55),inset_0_1px_0_rgba(120,165,255,0.12)] dark:ring-cerulean-blue-700/30"
              >
                <div className={`${valueHeaderBg[index]} px-3 py-2.5 text-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)] md:py-3`}>
                  <h4 className="text-xs font-black uppercase tracking-tight text-white md:text-sm">
                    {value.name}
                  </h4>
                </div>

                <div className="flex justify-center bg-sky-100/80 px-4 pb-3 pt-5 dark:bg-cerulean-blue-950/95 dark:shadow-[inset_0_6px_18px_rgba(8,22,70,0.45)]">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-sky-200/90 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.12),inset_0_2px_6px_rgba(255,255,255,0.85)] ring-2 ring-sky-100 dark:h-28 dark:w-28 dark:border-cerulean-blue-600/35 dark:bg-cerulean-blue-900 dark:shadow-[0_8px_22px_rgba(12,30,90,0.5),inset_0_2px_12px_rgba(5,18,60,0.35),inset_0_-1px_0_rgba(130,170,255,0.1)] dark:ring-cerulean-blue-700/25">
                    <img src={value.avatar} alt={value.name} className="h-full w-full object-cover" />
                  </div>
                </div>

                <div className="flex min-h-[3.75rem] flex-1 items-start justify-center bg-white px-3 pb-5 pt-1 text-center dark:bg-[#141d4a] dark:shadow-[inset_0_1px_0_rgba(130,170,255,0.08)]">
                  <p className="text-xs font-medium leading-snug text-cerulean-blue-900 dark:text-gray-100 md:text-sm">
                    {value.tagline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-10 pb-16 md:pt-12 md:pb-20 bg-white dark:bg-cerulean-blue-900 transition-colors duration-300">
        <TeamOrganizationContent />
      </section>
      {/* Strategic Partners: marquee, then board / management / coaches */}
      <section className="border-t border-gray-100 bg-gray-50/50 py-12 transition-colors dark:border-white/5 dark:bg-white/[0.02] md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 px-4 text-center md:mb-10">
            <h2 className="mb-4 text-3xl font-black uppercase italic leading-none tracking-tighter text-cerulean-blue-900 underline decoration-bright-sun-600 decoration-4 underline-offset-8 dark:text-white dark:decoration-bright-sun-300 md:text-5xl lg:text-6xl">
              Strategic <span className="text-bright-sun-600 dark:text-bright-sun-300">Partners</span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-bold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              Collaborating with leading organizations to deliver excellence.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white/80 py-4 dark:border-white/10 dark:bg-cerulean-blue-900/30">
            <Marquee pauseOnHover speed={45}>
              {STRATEGIC_PARTNERS.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="mx-8 flex items-center gap-3 md:mx-12"
                >
                  <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-bright-sun-600 dark:text-bright-sun-400">
                    {partner.type}
                  </span>
                  <span className="text-bright-sun-500/70 dark:text-bright-sun-400/50" aria-hidden>
                    ·
                  </span>
                  <span className="whitespace-nowrap text-base font-bold text-cerulean-blue-900 dark:text-white md:text-lg">
                    {partner.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>

          
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
