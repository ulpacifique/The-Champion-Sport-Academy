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
  IconClock,
  IconUserCheck,
  IconArrowLeft,
  IconArrowRight,
  IconCertificate,
  IconWorld
} from "@tabler/icons-react";

const AboutUs = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Core values data
  const coreValues = [
    {
      name: "Discipline",
      icon: IconShield,
      description: "Cultivating self-control and commitment through structured training",
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      name: "Friendship",
      icon: IconUsers,
      description: "Building lasting relationships and sportsmanship",
      color: "from-bright-sun-300/10 to-bright-sun-300/20",
      borderColor: "border-bright-sun-300/30",
      iconColor: "text-bright-sun-300"
    },
    {
      name: "Teamwork",
      icon: IconActivity,
      description: "Collaborating for shared success and growth",
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400"
    },
    {
      name: "Respect",
      icon: IconHeart,
      description: "Valuing others, coaches, and the sport",
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      name: "Excellence",
      icon: IconTrophy,
      description: "Striving for highest standards in everything",
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
      iconColor: "text-red-400"
    },
  ];


  // Statistics
  const stats = [
    { value: "4,300+", label: "Children & Youth Reached and", value2: "10,000+", label2: "Indirect reached", icon: IconUsers, color: "text-blue-400" },
    { value: "600+", label: "Coaches Trained & Mentored", icon: IconUserCheck, color: "text-bright-sun-300" },
    { value: "223+", label: "Medals Won", icon: IconMedal, color: "text-green-400" },
    { value: "18", label: "Trophies Won", icon: IconTrophy, color: "text-purple-400" },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-r bg-cerulean-blue-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r bg-cerulean-blue-950"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-bright-sun-300/20 text-bright-sun-300 px-4 py-2 rounded-full border border-bright-sun-300/30 mb-6">
              <IconSparkles size={20} />
              <span className="font-semibold">Our History</span>
            </div>

            <h1 className={`text-5xl md:text-6xl font-bold text-white mb-8 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Professional History
              <span className="block text-bright-sun-300 mt-2">& Evolution</span>
            </h1>

            <div className={`text-left space-y-8 text-gray-300 transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-2xl backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Summary (2017–2026)</h2>
                <p className="text-lg leading-relaxed">
                  Founded in 2017 in Remera, Kigali, by Noel Nkuranyabahizi, <span className="text-bright-sun-300 font-semibold">The Champions Sports Academy Ltd</span> (CSA) began as a structured, values-based karate academy dedicated to empowering children and youth through sport. From the outset, the Academy positioned sport not merely as competition, but as a platform for discipline, character formation, leadership, and lifelong well-being.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/20 border border-gray-700/30 p-6 rounded-xl hover:border-bright-sun-300/30 transition-colors">
                  <h3 className="text-bright-sun-300 font-bold text-xl mb-3">2017–2020: Foundation and Identity</h3>
                  <p className="text-sm leading-relaxed">
                    During its foundational phase, CSA established strong operational and philosophical roots. The Academy launched its flagship initiatives, including the Champions Weekend Program and Best Holidays Sports for Children, expanding access to structured sport during weekends and school holidays. International engagement and collaboration with Olympic-related initiatives strengthened institutional credibility. This period defined CSA’s identity as a values-driven youth development academy grounded in long-term athlete development principles.
                  </p>
                </div>

                <div className="bg-gray-800/20 border border-gray-700/30 p-6 rounded-xl hover:border-bright-sun-300/30 transition-colors">
                  <h3 className="text-bright-sun-300 font-bold text-xl mb-3">2021–2022: Competitive Entry and Structural Expansion</h3>
                  <p className="text-sm leading-relaxed">
                    In 2021, CSA marked a key milestone with its first participation in the National Karate Competition. In 2022, the Academy formalized Senior and Junior Teams and expanded geographically with branches in Nyanza and Bugesera. Coaching professionalism was reinforced through international certification pathways, strengthening technical standards and governance capacity. This phase signified CSA’s transition from a grassroots initiative to a structured competitive institution.
                  </p>
                </div>

                <div className="bg-gray-800/20 border border-gray-700/30 p-6 rounded-xl hover:border-bright-sun-300/30 transition-colors">
                  <h3 className="text-bright-sun-300 font-bold text-xl mb-3">2023–2024: National Leadership and Multisport Transformation</h3>
                  <p className="text-sm leading-relaxed">
                    By 2023, CSA achieved recognition as the leading karate club in Rwanda and successfully placed athletes on the National Team. The Academy hosted the first National Karate Championship for Children and integrated gymnastics into its core programming, marking its evolution into a multisport development institution. In 2024, CSA consolidated its leadership role through the organization of major national events, including open championships, coaching trainings, and national children’s programmes.
                  </p>
                </div>

                <div className="bg-gray-800/20 border border-gray-700/30 p-6 rounded-xl hover:border-bright-sun-300/30 transition-colors">
                  <h3 className="text-bright-sun-300 font-bold text-xl mb-3">2025–2026: Strategic Consolidation and Future Orientation</h3>
                  <p className="text-sm leading-relaxed">
                    Between 2025 and 2026, CSA strengthened its long-term strategic direction through structured business planning, governance enhancement, and sustainability frameworks. The Academy positioned itself as both a professional sport enterprise and a social impact organization, aligning its development model with national sport policies and international sport governance principles.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-bright-sun-300/10 to-blue-500/10 border border-bright-sun-300/20 p-8 rounded-2xl">
                <h3 className="text-white font-bold text-xl mb-4">Evolution Status by 2026</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Karate performance pathways",
                    "Gymnastics and physical literacy foundations",
                    "Coaching education and national capacity-building",
                    "Event organization and sport system contribution"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-bright-sun-300 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center backdrop-blur-sm transition-all duration-700 hover:border-bright-sun-300/30 hover:scale-[1.02] ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ animationDelay: `${300 + index * 200}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.color} bg-gray-800/50 rounded-2xl mb-4`}>
                <stat.icon size={32} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <div className={`bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-8 transition-all duration-700 hover:border-blue-400/30 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <IconTarget className="text-blue-400" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>

              </div>
            </div>
            <p className="text-gray-300 text-lg">
              To become a global hub of inclusive sport and physical literacy that promotes
              <span className="text-blue-400 font-semibold"> excellence, health, and lifelong well-being</span>

            </p>
          </div>

          {/* Mission */}
          <div className={`bg-gradient-to-br from-bright-sun-300/10 to-bright-sun-400/10 border border-bright-sun-300/20 rounded-2xl p-8 transition-all duration-700 delay-300 hover:border-bright-sun-200/30 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-bright-sun-300/20 rounded-2xl flex items-center justify-center">
                <IconTrophy className="text-bright-sun-300" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>

              </div>
            </div>
            <p className="text-gray-300 text-lg">
              To empower people through inclusive sport, physical literacy, and values-based
              education programmes that promote
              <span className="text-bright-sun-300 font-semibold"> excellence, health, and </span>
              lifelong well-being.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide our training, coaching, and community development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {coreValues.map((value, index) => (
            <div
              key={value.name}
              className={`bg-gradient-to-br ${value.color} border ${value.borderColor} rounded-2xl p-6 text-center backdrop-blur-sm transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl cursor-pointer ${animate ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${500 + index * 200}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 ${value.iconColor} bg-gray-800/50 rounded-2xl mb-4`}>
                <value.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{value.name}</h3>
              <p className="text-gray-300 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>



      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className={`text-center transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Strategic Direction</h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            ------------------------
            <span className="text-bright-sun-300 font-semibold"> Champions for Life</span>.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Board Member</h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            ------------------------
            <span className="text-bright-sun-300 font-semibold"> Champions for Life</span>.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Management Team</h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            ------------------------
            <span className="text-bright-sun-300 font-semibold"> Champions for Life</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-6">

            <IconArrowRight size={20} />


          </div>

          <div className="mt-12 text-gray-500 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <IconClock size={16} />
              <span>Open  Saturday to Sunday • 9 AM - 6 PM</span>
            </div>
          </div>
        </div>
      </div>
      {/* Partners Section */}
      <div className="mt-16 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-bright-sun-300/5 via-transparent to-bright-sun-300/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-4xl md:text-5xl text-center mb-4 font-bold">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our
            </span>{" "}
            <span className="bg-gradient-to-r from-bright-sun-200 to-bright-sun-300 bg-clip-text text-transparent">
              Partners
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
            className="focus-visible:[&_button]:!outline-none [&_button]:!bg-gradient-to-r [&_button]:!from-bright-sun-200 [&_button]:!to-bright-sun-300 [&_button]:!border-none [&_button]:hover:!opacity-90 [&_button]:!opacity-0 hover:[&_button]:!opacity-100 [&_button]:!transition-all [&_button]:!duration-300 [&_button]:!shadow-lg [&_button]:!shadow-bright-sun-200/20"
            nextControlIcon={<IconArrowRight className="h-8 w-8" />}
            previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
          >
            {[
              { name: "Rwanda Karate Federation (FERWAKA)", type: "National Partner", icon: "🥋", gradient: "from-red-500/20 to-red-600/20", border: "border-red-500/30" },
              { name: "Rwanda Gymnastics Federation (FERWACY)", type: "National Partner", icon: "🤸", gradient: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30" },
              { name: "RNOSC", type: "National Olympic Committee", icon: "🏅", gradient: "from-bright-sun-200/20 to-bright-sun-300/20", border: "border-bright-sun-300/30" },
              { name: "Ministry of Sports", type: "Government Partner", icon: "🏛️", gradient: "from-blue-600/20 to-blue-700/20", border: "border-blue-600/30" },
              { name: "National Olympic & Sports Academy", type: "National Partner", icon: "🎓", gradient: "from-green-600/20 to-green-700/20", border: "border-green-600/30" },
              { name: "World Karate Federation (WKF)", type: "International Partner", icon: "🌍", gradient: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30" },
              { name: "International Olympic Committee (IOC)", type: "International Partner", icon: "⚡", gradient: "from-green-500/20 to-green-600/20", border: "border-green-500/30" },
              { name: "International Olympic Academy (IOA)", type: "International Partner", icon: "🏛️", gradient: "from-blue-400/20 to-blue-500/20", border: "border-blue-400/30" },
              { name: "Alliance of Social Workers in Sport (ASWIS)", type: "International Network", icon: "🤝", gradient: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/30" },
              { name: "USA Karate", type: "International Partner", icon: "🇺🇸", gradient: "from-red-600/20 to-red-700/20", border: "border-red-600/30" },
              { name: "5280 Gymnastics", type: "International Partner", icon: "🤸‍♀️", gradient: "from-pink-500/20 to-pink-600/20", border: "border-pink-500/30" },
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
                    <div className="text-white text-lg font-bold text-center group-hover:text-bright-sun-300 transition-colors duration-300">
                      {partner.name}
                    </div>
                    <div className="text-sm text-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {partner.type}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bright-sun-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Ecosystem Highlights */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-300/50 transition duration-300">
          <div className="w-12 h-12 bg-bright-sun-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconUsers className="text-bright-sun-300" size={24} />
          </div>
          <div className="text-white text-xl font-semibold mb-2">Athlete Journey</div>
          <div className="text-sm text-gray-400">
            Physical Literacy → Skill Development → Competition
          </div>
        </div>

        <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-300/50 transition duration-300">
          <div className="w-12 h-12 bg-bright-sun-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconCertificate className="text-bright-sun-300" size={24} />
          </div>
          <div className="text-white text-xl font-semibold mb-2">Coach Development</div>
          <div className="text-sm text-gray-400">
            Certification → Mentoring → Professional Development
          </div>
        </div>

        <div className="text-center p-6 border border-gray-700/50 rounded-xl hover:border-bright-sun-300/50 transition duration-300">
          <div className="w-12 h-12 bg-bright-sun-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconWorld className="text-bright-sun-300" size={24} />
          </div>
          <div className="text-white text-xl font-semibold mb-2">Global Network</div>
          <div className="text-sm text-gray-400">
            International standards and partnership opportunities
          </div>
        </div>
      </div>
      {/* Footer Note */}

    </div>
  );
};

export default AboutUs;