import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import {
  IconTrophy,
  IconTarget,
  IconUsers,
  IconHeart,
  IconShield,
  IconActivity,
  IconSparkles,
  IconMedal,
  IconUserCheck,
  IconArrowLeft,
  IconArrowRight,
  IconCertificate,
  IconWorld
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { coreValuesData } from "../Data/coreValues";

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
              className="inline-flex items-center space-x-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-600/20 dark:border-bright-sun-300/30 mb-8 font-black uppercase tracking-widest text-xs"
            >
              <IconTarget size={16} />
              <span>Our Legacy of Excellence</span>
            </motion.div>

            <h1 className={`text-5xl md:text-8xl font-black text-cerulean-blue-900 dark:text-white mb-8 leading-tight tracking-tighter uppercase italic transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Vision <span className="text-bright-sun-600 dark:text-bright-sun-300">&</span> Mission
            </h1>
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

      {/* Core Values Section – exact match to reference: dark blue banner, logo + gold lines, title, five cards with colored headers + avatar + dark blue text */}
      <section className="relative overflow-hidden border-y border-gray-200 dark:border-white/10">
        {/* Top dark blue banner strip */}
        <div className="h-3 md:h-4 bg-cerulean-blue-900 dark:bg-cerulean-blue-950" aria-hidden />

        {/* Light blue background with subtle splatter/dots texture */}
        <div className="relative bg-sky-100/90 dark:bg-cerulean-blue-900/80 py-12 md:py-16">
          <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[length:24px_24px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[length:32px_32px]" />
          </div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            {/* Central logo with gold ring + horizontal gold lines (like reference) */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative flex items-center justify-center gap-4 w-full max-w-md">
                <span className="flex-1 h-1 bg-bright-sun-500 dark:bg-bright-sun-400 rounded-full max-w-[80px] md:max-w-[120px]" aria-hidden />
                <div className="relative shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-2 bg-bright-sun-400 dark:bg-bright-sun-500 ring-4 ring-cerulean-blue-800 dark:ring-cerulean-blue-700 shadow-xl">
                    <img
                      src={`${import.meta.env.BASE_URL}champion-logo.png`}
                      alt="The Champions Sport Academy"
                      className="w-full h-full rounded-full object-contain bg-cerulean-blue-800 dark:bg-cerulean-blue-900"
                    />
                  </div>
                </div>
                <span className="flex-1 h-1 bg-bright-sun-500 dark:bg-bright-sun-400 rounded-full max-w-[80px] md:max-w-[120px]" aria-hidden />
              </div>

              {/* Title framed by gold lines */}
              <div className="text-center mt-8 space-y-1">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="w-16 md:w-24 h-0.5 bg-bright-sun-500 dark:bg-bright-sun-400 rounded-full" aria-hidden />
                  <h2 className="text-xl md:text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-wide">
                    The Core Values of
                  </h2>
                  <span className="w-16 md:w-24 h-0.5 bg-bright-sun-500 dark:bg-bright-sun-400 rounded-full" aria-hidden />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tight">
                  The Champions Sports Academy
                </h3>
                <p className="text-bright-sun-600 dark:text-bright-sun-400 font-bold italic text-base md:text-lg mt-1">
                  We Are The Champions for Life
                </p>
              </div>
            </div>

            {/* Five value cards: colored header bar, circular avatar on light blue, dark blue tagline (exact reference layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex flex-col rounded-xl overflow-hidden bg-white/90 dark:bg-cerulean-blue-900/50 shadow-lg border border-sky-200/60 dark:border-white/10"
                >
                  {/* Colored header bar – value name in white, capitalized */}
                  <div className={`${valueHeaderBg[index]} px-3 py-2.5 md:py-3 text-center shrink-0`}>
                    <h4 className="text-sm md:text-base font-black text-white uppercase tracking-tight">
                      {value.name}
                    </h4>
                  </div>

                  {/* Circular avatar on light blue circle (like reference icon area) */}
                  <div className="flex justify-center pt-5 pb-3 px-4">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-sky-200/80 dark:bg-cerulean-blue-700/60 border-2 border-sky-300/80 dark:border-cerulean-blue-600 overflow-hidden flex items-center justify-center shadow-inner">
                      <img
                        src={value.avatar}
                        alt={value.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Tagline in dark blue (like reference) */}
                  <div className="flex-1 px-4 pb-5 pt-0 text-center min-h-[3.5rem] flex items-start justify-center">
                    <p className="text-xs md:text-sm text-cerulean-blue-900 dark:text-cerulean-blue-100 font-medium leading-snug">
                      {value.tagline}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-32 bg-gray-50/50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-24 px-4">
            <h2 className="text-4xl md:text-7xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-6 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8 leading-none">
              Strategic <span className="text-bright-sun-600 dark:text-bright-sun-300">Partners</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">Collaborating with leading organizations to deliver excellence.</p>
          </div>

          <Carousel
            slideSize={{ base: '100%', sm: '50%', md: '25%' }}
            slideGap={{ base: 'md', sm: 'xl' }}
            loop
            align="start"
            className="[&_.mantine-Carousel-control]:bg-white dark:[&_.mantine-Carousel-control]:bg-cerulean-blue-800 [&_.mantine-Carousel-control]:shadow-xl [&_.mantine-Carousel-control]:border-none [&_.mantine-Carousel-control]:text-bright-sun-600 dark:[&_.mantine-Carousel-control]:text-bright-sun-300"
            nextControlIcon={<IconArrowRight size={24} />}
            previousControlIcon={<IconArrowLeft size={24} />}
          >
            {[
              { name: "Rwanda Karate Federation (FERWAKA)", type: "National Partner", icon: "🥋" },
              { name: "Rwanda Gymnastics Federation (FERWACY)", type: "National Partner", icon: "🤸" },
              { name: "RNOSC", type: "National Olympic Committee", icon: "🏅" },
              { name: "Ministry of Sports", type: "Government Partner", icon: "🏛️" },
              { name: "National Olympic & Sports Academy", type: "National Partner", icon: "🎓" },
              { name: "World Karate Federation (WKF)", type: "International Partner", icon: "🌍" },
              { name: "International Olympic Committee (IOC)", type: "International Partner", icon: "⚡" },
              { name: "International Olympic Academy (IOA)", type: "International Partner", icon: "🏛️" },
              { name: "Alliance of Social Workers in Sport (ASWIS)", type: "International Network", icon: "🤝" },
              { name: "USA Karate", type: "International Partner", icon: "🇺🇸" },
              { name: "5280 Gymnastics", type: "International Partner", icon: "🤸‍♀️" },
              { name: "Gasore Serge Foundation", type: "Foundation", icon: "❤️" },
            ].map((partner, index) => (
              <Carousel.Slide key={index}>
                <div className="bg-white dark:bg-cerulean-blue-900/40 border-[6px] border-white dark:border-cerulean-blue-900 p-8 rounded-[3rem] h-full flex flex-col items-center justify-center text-center shadow-xl hover:scale-105 transition-transform duration-500 group min-h-[280px]">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{partner.icon}</div>
                  <h4 className="text-lg font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-2 group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors">{partner.name}</h4>
                  <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{partner.type}</span>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Ecosystem Highlights */}
      <section className="py-24 px-4 bg-white dark:bg-cerulean-blue-900 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-12 bg-gray-50 dark:bg-cerulean-blue-900/20 border border-gray-100 dark:border-white/5 rounded-[3rem] text-center group"
            >
              <div className="w-16 h-16 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-bright-sun-600/20">
                <IconUsers className="text-bright-sun-600 dark:text-bright-sun-300" size={32} />
              </div>
              <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-4">Athlete Journey</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">Physical Literacy → Skill Development → Competition</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-12 bg-gray-50 dark:bg-cerulean-blue-900/20 border border-gray-100 dark:border-white/5 rounded-[3rem] text-center group"
            >
              <div className="w-16 h-16 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-bright-sun-600/20">
                <IconCertificate className="text-bright-sun-600 dark:text-bright-sun-300" size={32} />
              </div>
              <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-4">Coach Mastery</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">Certification → Mentoring → Leadership</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-12 bg-gray-50 dark:bg-cerulean-blue-900/20 border border-gray-100 dark:border-white/5 rounded-[3rem] text-center group"
            >
              <div className="w-16 h-16 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-bright-sun-600/20">
                <IconWorld className="text-bright-sun-600 dark:text-bright-sun-300" size={32} />
              </div>
              <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-4">Global Network</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">International Standards → Strategic Alliances</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
