import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import {
  IconTrophy,
  IconTarget,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { coreValuesData } from "../Data/coreValues";
import { TeamOrganizationContent } from "./TeamOrganizationContent";

const STRATEGIC_PARTNERS: { name: string; type: string }[] = [
  { name: "Rwanda Gymnastics Federation", type: "Federation" },
  { name: "Rwanda Karate Federation", type: "Federation" },
  { name: "Rwanda National Olympic and Sports Committee (RNOSC)", type: "Olympic committee" },
  { name: "MINISPORTS (Ministry of Sports)", type: "Government" },
  { name: "Rwanda Children Christian School", type: "School" },
  { name: "Smart Sports Shop", type: "Retail" },
  { name: "Play Hotel", type: "Hospitality" },
  { name: "Kihon Sport", type: "Sport & equipment" },
  { name: "5280 Gymnastics (USA)", type: "International" },
  { name: "IOC Young Leaders Programme (International Olympic Committee)", type: "IOC programme" },
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
              <span>OUr mission and vision</span>
            </motion.div>

            <div className="h-1.5 w-32 bg-bright-sun-600 dark:bg-bright-sun-300 mx-auto rounded-full mb-12"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    

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
          </div>

          {/* Core Values intro — after Vision & Mission */}
          <div className="mb-16 mt-20 flex flex-col items-center md:mb-20 md:mt-24">
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

          {/* Core Values cards — after Vision & Mission */}
          <div className="mx-auto mb-4 max-w-6xl md:mb-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex flex-col overflow-hidden rounded-2xl border-2 border-bright-sun-500 bg-white shadow-md dark:border-bright-sun-400 dark:bg-cerulean-blue-900/40 dark:shadow-lg dark:shadow-black/15"
                >
                  <div className={`${valueHeaderBg[index]} px-3 py-2.5 text-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)] md:py-3`}>
                    <h4 className="text-xs font-black uppercase tracking-tight text-white md:text-sm">{value.name}</h4>
                  </div>
                  <div className="flex justify-center bg-sky-50 px-4 pb-3 pt-5 dark:bg-cerulean-blue-800/35">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-sky-200/90 bg-white shadow-sm ring-2 ring-sky-100 dark:h-28 dark:w-28 dark:border-cerulean-blue-400/40 dark:bg-cerulean-blue-900/50 dark:ring-cerulean-blue-600/25">
                      <img src={value.avatar} alt={value.name} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="flex min-h-[3.75rem] flex-1 items-start justify-center border-t border-gray-100 bg-gray-50/80 px-3 pb-5 pt-3 text-center dark:border-white/10 dark:bg-cerulean-blue-900/35">
                    <p className="text-xs font-medium leading-snug text-cerulean-blue-900 dark:text-gray-200 md:text-sm">{value.tagline}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academy timeline / history infographic */}
          <figure className="mx-auto mt-10 max-w-7xl md:mt-14">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50 shadow-lg dark:border-white/10 dark:bg-cerulean-blue-900/30 dark:shadow-black/20">
              <img
                src={`${import.meta.env.BASE_URL}athletes/History.jpeg`}
                alt="The Champions Sports Academy Ltd, 2017–2026: a journey of growth, impact, and leadership — timeline, vision, and core values."
                className="block h-auto w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="sr-only">
              Infographic: foundation through strategic consolidation, vision statement, and core values.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Testimonials — YouTube embeds */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-24 transition-colors dark:border-white/5 dark:bg-white/[0.02]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 px-4 text-center md:mb-16">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-cerulean-blue-900 underline decoration-bright-sun-600 decoration-4 underline-offset-8 dark:text-white dark:decoration-bright-sun-300 md:text-5xl lg:text-6xl">
              Testimonials
            </h2>
          </div>
          <div className="mx-auto max-w-4xl px-4">
            {/* Landscape embed on its own row so flex never squeezes the iframe to zero width */}
            <div className="mx-auto w-full max-w-2xl">
              <div
                className="relative w-full overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10"
                style={{ aspectRatio: "16 / 9" }}
              >
                <iframe
                  className="absolute left-0 top-0 h-full w-full border-0"
                  src="https://www.youtube-nocookie.com/embed/KE73WmQVILM?rel=0&modestbranding=1&playsinline=1"
                  title="Testimony of Athletes and Coaches"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 max-w-xl px-2 text-center">
                <a
                  href="https://www.youtube.com/watch?v=KE73WmQVILM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wide text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300 sm:tracking-widest"
                >
                  Testimony of Athletes and Coaches
                </a>
              </p>
            </div>

            <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:gap-3 xl:gap-4">
                <div className="mx-auto flex w-full max-w-[280px] flex-col items-center sm:mx-0 sm:shrink-0">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/qx32jAxUoTM?rel=0&modestbranding=1&loop=1&playlist=qx32jAxUoTM"
                      title="Gasore"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-center">
                    <a
                      href="https://youtube.com/shorts/qx32jAxUoTM?si=ncyUihTTrUJZoElb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                    >
                      Gasore
                    </a>
                  </p>
                </div>
                <div className="mx-auto flex w-full max-w-[280px] flex-col items-center sm:mx-0 sm:shrink-0">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/VZA4a8e6n5I?rel=0&modestbranding=1&loop=1&playlist=VZA4a8e6n5I"
                      title="Parent Testimony"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-center">
                    <a
                      href="https://youtube.com/shorts/VZA4a8e6n5I?si=bnSydce4wib-btHZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                    >
                      Parent Testimony
                    </a>
                  </p>
                </div>
                <div className="mx-auto flex  min-w-[150px] max-w-[280px] flex-col items-center sm:mx-0 sm:shrink-0">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/dsPcdxbQhCo?rel=0&modestbranding=1&loop=1&playlist=dsPcdxbQhCo"
                      title="The champions Athlete Testimony"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-center">
                    <a
                      href="https://youtube.com/shorts/dsPcdxbQhCo?si=MlbepNHpGGKViOw5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300"
                    >
                      The champions Athlete Testimony
                    </a>
                  </p>
                </div>
              </div>

            <div className="mx-auto mt-8 w-full max-w-2xl sm:mt-10">
              <div
                className="relative w-full overflow-hidden rounded-xl border-2 border-cerulean-blue-200/80 bg-black shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/5 dark:border-white/15 dark:shadow-black/40 dark:ring-white/10"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  className="absolute left-0 top-0 h-full w-full border-0"
                  src="https://www.youtube-nocookie.com/embed/5ra6d8S61F8?rel=0&modestbranding=1&playsinline=1"
                  title="International athlete Medals(performance)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 max-w-xl px-2 text-center">
                <a
                  href="https://youtu.be/5ra6d8S61F8?si=qvnWTmkvN2md8AMy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wide text-bright-sun-600 underline-offset-4 hover:underline dark:text-bright-sun-300 sm:tracking-widest"
                >
                  International athlete Medals(performance)
                </a>
              </p>
            </div>
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
            <p className="mx-auto max-w-2xl text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 md:tracking-[0.25em]">
              Federations, government, schools, enterprises, and international sport programmes.
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
