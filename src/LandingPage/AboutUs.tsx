import { useState, useEffect } from "react";
import {
  IconTrophy,
  IconTarget,
  IconUsers,
  IconHeart,
  IconSchool,
  IconCertificate,
  IconActivity,
  IconShield,
  IconArrowRight,
  IconCheck,
  IconSparkles,
  IconStar,
  IconAward,
  IconMedal,
  IconCalendarEvent,
  IconClock,
  IconUserCheck,
  IconChartBar,
  IconBrandWhatsapp,
  IconPhone,
  IconMail
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
      color: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-500/30",
      iconColor: "text-yellow-400"
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

  // What we do programs
  const programs = [
    {
      title: "Children & Youth Programmes",
      ageRange: "Ages 3–17",
      icon: IconSchool,
      features: [
        "Fundamental movement skills & physical literacy",
        "Safe and enjoyable sport introduction",
        "Long-term athlete development",
        "Values, confidence & social skills"
      ],
      sports: ["Gymnastics", "Karate"],
      bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Coaching Education",
      icon: IconCertificate,
      features: [
        "Structured certification courses",
        "Professional development workshops",
        "Safe Sport & athlete well-being",
        "Mentorship & leadership programs"
      ],
      focus: "Technically competent, ethically grounded coaches",
      bgColor: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/10",
      borderColor: "border-yellow-500/20"
    },
    {
      title: "Sport, Health & Well-being",
      icon: IconHeart,
      features: [
        "Physical activity for healthy lifestyles",
        "Mental well-being through sport",
        "Values-based education",
        "Community engagement & inclusion"
      ],
      impact: "Healthier individuals, stronger communities",
      bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/10",
      borderColor: "border-green-500/20"
    }
  ];

  // Statistics
  const stats = [
    { value: "500+", label: "Active Students", icon: IconUsers, color: "text-blue-400" },
    { value: "25+", label: "Certified Coaches", icon: IconUserCheck, color: "text-yellow-400" },
    { value: "10+", label: "Years Experience", icon: IconCalendarEvent, color: "text-green-400" },
    { value: "95%", label: "Satisfaction Rate", icon: IconChartBar, color: "text-purple-400" },
  ];

  // Achievements
  const achievements = [
    { title: "National Champions", count: "15", icon: IconTrophy, color: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20" },
    { title: "International Awards", count: "8", icon: IconAward, color: "bg-gradient-to-br from-blue-500/20 to-blue-600/20" },
    { title: "Certified Coaches", count: "25+", icon: IconCertificate, color: "bg-gradient-to-br from-green-500/20 to-green-600/20" },
    { title: "Community Events", count: "50+", icon: IconMedal, color: "bg-gradient-to-br from-purple-500/20 to-purple-600/20" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r bg-cerulean-blue-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r bg-cerulean-blue-950"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-bright-sun-400/20 text-bright-sun-400 px-4 py-2 rounded-full border border-bright-sun-400/30 mb-6">
              <IconSparkles size={20} />
              <span className="font-semibold">Champion Sports Academy</span>
            </div>

            <h1 className={`text-5xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Developing
              <span className="block text-bright-sun-400 mt-2">Champions for Life</span>
            </h1>

            <p className={`text-xl text-gray-300 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              A leading values-driven sport and physical literacy institution dedicated to the
              holistic development of children, young people, and coaches.
            </p>

            <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button className="px-8 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105">
                Explore Programs
              </button>
              <button className="px-8 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg hover:bg-gray-700/50 transition-all hover:scale-105">
                Meet Our Coaches
              </button>
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
              className={`bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center backdrop-blur-sm transition-all duration-700 hover:border-bright-sun-400/30 hover:scale-[1.02] ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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
                <div className="text-blue-400 text-sm">Global Excellence in Sports</div>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              To become a global hub of inclusive sport and physical literacy that promotes
              <span className="text-blue-400 font-semibold"> excellence, health, and lifelong well-being</span>
              through world-class training and development programs.
            </p>
          </div>

          {/* Mission */}
          <div className={`bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-2xl p-8 transition-all duration-700 delay-300 hover:border-yellow-400/30 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                <IconTrophy className="text-yellow-400" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                <div className="text-yellow-400 text-sm">Empowering Through Sport</div>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              To empower people through inclusive sport, physical literacy, and values-based
              education programmes that promote
              <span className="text-yellow-400 font-semibold"> excellence, health, and lifelong well-being</span>
              while building character and community.
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

      {/* What We Do */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Do</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Professionally designed programmes aligned with international best practices
            in sport development, coaching education, and well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className={`${program.bgColor} border ${program.borderColor} rounded-2xl p-8 h-full transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ animationDelay: `${700 + index * 300}ms` }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center">
                  <program.icon className="text-bright-sun-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{program.title}</h3>
                  {program.ageRange && (
                    <div className="text-bright-sun-400 text-sm">{program.ageRange}</div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {program.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <IconCheck className="text-green-400 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {program.sports && (
                <div className="mb-6">
                  <div className="text-gray-400 text-sm mb-2">Sports Offered:</div>
                  <div className="flex flex-wrap gap-2">
                    {program.sports.map((sport) => (
                      <span
                        key={sport}
                        className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {program.focus && (
                <div className="text-bright-sun-400 italic text-sm border-t border-gray-700/50 pt-4">
                  {program.focus}
                </div>
              )}

              {program.impact && (
                <div className="text-green-400 italic text-sm border-t border-gray-700/50 pt-4">
                  {program.impact}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Milestones that reflect our commitment to excellence in sports education
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`${achievement.color} border border-gray-700/50 rounded-2xl p-6 text-center transition-all duration-500 hover:scale-[1.05] ${animate ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${1000 + index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-2xl mb-4">
                  <achievement.icon className="text-white" size={32} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{achievement.count}</div>
                <div className="text-gray-300">{achievement.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Commitment */}
      <div className="container mx-auto px-4 py-16">
        <div className={`bg-gradient-to-r from-gray-800/30 to-cerulean-blue-900/30 border border-gray-700/50 rounded-2xl p-12 text-center transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-bright-sun-400/20 rounded-2xl mb-6 border border-bright-sun-400/30">
              <IconShield className="text-bright-sun-400" size={40} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Commitment</h2>

            <p className="text-gray-300 text-lg mb-10">
              At The Champions Sports Academy, we believe sport is more than competition.
              It is an educational and social force that shapes healthier individuals and
              stronger communities. We are committed to creating a safe, inclusive, and
              empowering environment for every athlete.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: 'Professionalism', icon: IconStar, color: 'bg-blue-600/20' },
                { name: 'Safeguarding', icon: IconShield, color: 'bg-yellow-600/20' },
                { name: 'Inclusion', icon: IconUsers, color: 'bg-green-600/20' },
                { name: 'Excellence', icon: IconTrophy, color: 'bg-purple-600/20' }
              ].map((item) => (
                <div
                  key={item.name}
                  className={`${item.color} border border-gray-700/50 rounded-xl p-6 hover:scale-105 transition-all duration-300`}
                >
                  <item.icon className="text-white mb-3 mx-auto" size={24} />
                  <div className="text-white font-semibold">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className={`text-center transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community</h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Whether you are a parent, athlete, coach, partner, or institution,
            we invite you to be part of a community that believes in developing
            <span className="text-bright-sun-400 font-semibold"> Champions for Life</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center space-x-2">
              <span>Start Your Journey</span>
              <IconArrowRight size={20} />
            </button>
            <button className="px-8 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg hover:bg-gray-700/50 transition-all hover:scale-105">
              Schedule a Visit
            </button>
          </div>

          <div className="mt-12 text-gray-500 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <IconClock size={16} />
              <span>Open  Saturday to Sunday • 9 AM - 6 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}

    </div>
  );
};

export default AboutUs;