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

  // Core values from shared data + icons
  const valueIcons = [IconShield, IconUsers, IconActivity, IconHeart, IconTrophy];
  const coreValues = coreValuesData.map((v, i) => ({ ...v, icon: valueIcons[i] }));


  // Statistics
  const stats = [
    { value: "4,300+", label: "Children & Youth Reached", value2: "10,000+", label2: "Indirectly reached", icon: IconUsers, color: "text-blue-600 dark:text-blue-400" },
    { value: "600+", label: "Coaches Trained & Mentored", icon: IconUserCheck, color: "text-bright-sun-600 dark:text-bright-sun-300" },
    { value: "223+", label: "Medals Won", icon: IconMedal, color: "text-green-600 dark:text-green-400" },
    { value: "18", label: "Trophies Won", icon: IconTrophy, color: "text-purple-600 dark:text-purple-400" },
  ];

  // Management Team / Coaches
  const coaches = [
    {
      name: "Coach Kharif",
      role: "Head Karate Coach",
      experience: "Expert Trainer",
      specialty: "Youth Development & Karate",
      image: `${import.meta.env.BASE_URL}athletes/Khalif.PNG`
    },
    {
      name: "Coach Dushime Sharifu",
      role: "National Team Athlete",
      experience: "10+ Years",
      specialty: "Acrobatics & Fitness",
      image: `${import.meta.env.BASE_URL}athletes/Dushime.jpg`
    },
    {
      name: "Coach ABAYISENGA Paremonique",
      role: "Certified National Coach",
      experience: "12+ Years",
      specialty: "Artistic & Rhythmic",
      image: `${import.meta.env.BASE_URL}athletes/palmonique.jpg`
    },
    {
      name: "Coach Pacifique",
      role: "Instructor",
      experience: "3+ Years",
      specialty: "Taekwondo & Gymnastics",
      image: `${import.meta.env.BASE_URL}athletes/Coach Pacifique.jpg`
    },
    {
      name: "Coach Sylvan",
      role: "Gymnastics Coach",
      experience: "1 Year",
      specialty: "Floor & Vault Training",
      image: `${import.meta.env.BASE_URL}athletes/Coach Sylvan.jpg`
    },
    {
      name: "Coach Tracy",
      role: "Assistant Coach",
      experience: "3 Years",
      specialty: "Core Technique & Flexibility",
      image: `${import.meta.env.BASE_URL}athletes/Coach Tracy.jpg`
    },
    {
      name: "Fille",
      role: "Academy Receptionist",
      experience: "Admin Expert",
      specialty: "Student Relations",
      image: `${import.meta.env.BASE_URL}athletes/Receptionist Fille.jpg`
    },
    {
      name: "Mama boy",
      role: "Safeguarding Officer",
      experience: "Welfare Guard",
      specialty: "Safety Oversight",
      image: `${import.meta.env.BASE_URL}athletes/Safeguarding Officer.jpg`
    }
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

          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-cerulean-blue-900/20 border border-gray-100 dark:border-white/5 p-12 rounded-[3rem] backdrop-blur-sm shadow-xl"
            >
              <h3 className="text-3xl font-black text-cerulean-blue-900 dark:text-white mb-6 uppercase italic tracking-tighter border-l-8 border-bright-sun-600 dark:border-bright-sun-300 pl-8 transition-colors">Summary (2017–2026)</h3>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
                Founded in 2017 in Remera, Kigali, by Noel Nkuranyabahizi, <span className="text-bright-sun-600 dark:text-bright-sun-300 font-black">The Champions Sports Academy Ltd</span> (CSA) began as a structured, values-based karate academy dedicated to empowering children and youth through sport. From the outset, the Academy positioned sport not merely as competition, but as a platform for discipline, character formation, leadership, and lifelong well-being.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { year: "2017–2020: Foundation", desc: "During its foundational phase, CSA established strong operational and philosophical roots. The Academy launched its flagship initiatives, including the Champions Weekend Program and Best Holidays Sports for Children." },
                { year: "2021–2022: Expansion", desc: "In 2021, CSA marked a key milestone with its first participation in the National Karate Competition. In 2022, the Academy formalized Senior and Junior Teams and expanded geographically." },
                { year: "2023–2024: Transformation", desc: "By 2023, CSA achieved recognition as the leading karate club in Rwanda and successfully placed athletes on the National Team. Host of the first National Karate Championship for Children." },
                { year: "2025–2026: Consolidation", desc: "CSA strengthened its long-term strategic direction through structured business planning, governance enhancement, and sustainability frameworks. Positioned as a professional sport enterprise." }
              ].map((period, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 p-10 rounded-[2.5rem] hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all group"
                >
                  <h3 className="text-bright-sun-600 dark:text-bright-sun-400 font-black text-xl mb-4 uppercase italic tracking-tight group-hover:translate-x-2 transition-transform">{period.year}</h3>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 font-medium">{period.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-cerulean-blue-900 p-12 rounded-[3rem] shadow-2xl group transition-colors duration-1000 border border-gray-100 dark:border-white/10"
            >
              <h3 className="text-cerulean-blue-900 dark:text-white font-black text-2xl mb-8 uppercase italic tracking-tighter flex items-center gap-4">
                <IconMedal size={32} className="text-bright-sun-600 dark:text-bright-sun-300" />
                Evolution Status by 2026
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "Karate performance pathways",
                  "Gymnastics and physical literacy foundations",
                  "Coaching education and national capacity",
                  "Event organization and sport system contribution"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 text-cerulean-blue-900/90 dark:text-white/80 font-black uppercase tracking-tight text-sm">
                    <div className="w-2.5 h-2.5 bg-bright-sun-600 dark:bg-bright-sun-300 rounded-full shrink-0 shadow-lg" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-50/50 dark:bg-cerulean-blue-900 border-y border-gray-100 dark:border-white/10 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 px-4">
            <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-6 underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-8">Our Core <span className="text-bright-sun-600 dark:text-bright-sun-300">Values</span></h2>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.3em] text-sm">The principles that guide our growth.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white bg-gradient-to-br ${value.color} dark:bg-cerulean-blue-900/90 border border-gray-100 dark:border-white/20 rounded-[2.5rem] p-10 text-center shadow-sm dark:shadow-lg dark:shadow-black/20 transition-all duration-500 hover:scale-105 cursor-default hover:shadow-2xl`}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 ${value.iconColor} bg-gray-50 dark:bg-cerulean-blue-800 rounded-2xl mb-8 shadow-inner group-hover:rotate-12 transition-transform`}>
                  <value.icon size={36} />
                </div>
                <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white mb-4 uppercase italic tracking-tight">{value.name}</h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest leading-loose">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team Section - circular overlapping layout */}
      <section className="py-32 relative overflow-hidden bg-white dark:bg-cerulean-blue-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter mb-16 text-center underline decoration-bright-sun-600 dark:decoration-bright-sun-300 underline-offset-8 decoration-4">
            Management team
          </h2>
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            <div className="lg:w-1/2 relative flex justify-center lg:justify-end items-center min-h-[380px] lg:min-h-[420px]">
              {/* Larger circle - team (right/top in reference) */}
              <div className="relative z-10 w-full max-w-[340px] lg:max-w-[380px] aspect-square rounded-full overflow-hidden border-[10px] border-white dark:border-cerulean-blue-900 shadow-2xl transition-transform duration-1000 hover:scale-[1.02] hover:shadow-bright-sun-500/10 dark:hover:shadow-bright-sun-300/10">
                <img
                  src={`${import.meta.env.BASE_URL}athletes/team.JPG`}
                  alt="Our Team"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue-950/30 to-transparent pointer-events-none"></div>
              </div>
              {/* Smaller overlapping circle - Head Karate Coach (bottom-left, in front of main circle) */}
              <div className="absolute left-[5%] bottom-[2%] lg:left-[8%] lg:bottom-[4%] z-20 w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] rounded-full overflow-hidden border-[8px] border-white dark:border-cerulean-blue-900 shadow-2xl group hidden sm:block">
                <img
                  src={`${import.meta.env.BASE_URL}athletes/Khalif.PNG`}
                  alt="Coach Kharif - Head Karate Coach"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Subtle accent shape (top-right) - matches reference */}
              <div className="absolute top-0 right-0 w-32 h-32 lg:w-40 lg:h-40 bg-gray-100 dark:bg-white/5 rounded-full blur-3xl -z-10" aria-hidden></div>
            </div>

            <div className="lg:w-1/2 text-left">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
                <span className="text-bright-sun-600 dark:text-bright-sun-500 font-black text-sm block mb-4 uppercase tracking-[0.5em]">Visionary Team</span>
                <h2 className="text-6xl md:text-8xl font-black text-cerulean-blue-900 dark:text-white leading-[0.85] uppercase tracking-tighter mb-10 italic">
                  CHAMPIONS <br />
                  <span className="text-bright-sun-600 dark:text-bright-sun-300 font-black">FOR </span>LIFE
                </h2>
                <div className="h-2 w-32 bg-bright-sun-600 dark:bg-bright-sun-300 mb-10 rounded-full"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-xl transition-colors">
                  Meet the elite educators and masters dedicated to transforming Rwandan sport through excellence and holistic development.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-24">
            {coaches.map((coach, index) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
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

                <div className="text-center space-y-3 relative z-10">
                  <span className="text-bright-sun-600 dark:text-bright-sun-500 text-[10px] font-black uppercase tracking-[0.4em]">
                    {coach.role}
                  </span>
                  <h3 className="text-2xl font-black text-cerulean-blue-900 dark:text-white uppercase tracking-tighter italic leading-none group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors duration-500">
                    {coach.name}
                  </h3>
                  <div className="flex flex-col text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 space-y-1">
                    <span>{coach.specialty}</span>
                    <span className="text-bright-sun-600 dark:text-bright-sun-300 italic tracking-tight text-xs">{coach.experience} EXPERIENCE</span>
                  </div>
                </div>
              </motion.div>
            ))}
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
