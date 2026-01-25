import {
  IconKarate,
  IconGymnastics,
  IconSchool,
  IconCertificate,
  IconCalendarEvent,
  IconShoppingCart,
  IconBuilding,
  IconWorld,
  IconUsers,
  IconTrophy
} from "@tabler/icons-react";
import { useState } from "react";

const OurServices = () => {
  const [animate] = useState(true);

  // Core Services Data
  const coreServices = [
    {
      title: "Sport & Physical Literacy Programmes",
      icon: IconKarate,
      description: "Karate, Gymnastics, and Multi-Sport programmes for children and youth",
      programs: [
        "Karate (Ages 4-18)",
        "Gymnastics (Ages 3-17)",
        "Multi-sport Activities",
        "Physical Literacy Development"
      ],
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400"
    },
    {
      title: "School-Based Programmes",
      icon: IconSchool,
      description: "Structured sport and physical activity initiatives delivered in partnership with schools",
      programs: [
        "School Sport Integration",
        "Physical Education Support",
        "Talent Identification",
        "After-School Programs"
      ],
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400"
    },
    {
      title: "Coach Education & Certification",
      icon: IconCertificate,
      description: "Capacity building for coaches through training, mentoring, and professional development",
      programs: [
        "Certification Courses",
        "Mentorship Programs",
        "Professional Development",
        "Safe Sport Training"
      ],
      color: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-500/30",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400"
    },
    {
      title: "Events & Competitions",
      icon: IconCalendarEvent,
      description: "Organization and management of sport events, training camps, competitions, and health-focused workshops",
      programs: [
        "Tournaments & Championships",
        "Training Camps",
        "Well-being Workshops",
        "Community Events"
      ],
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400"
    },
    {
      title: "Sports Equipment Shop",
      icon: IconShoppingCart,
      description: "Provision of sports equipment, uniforms, and training materials supporting programmes and community sport",
      programs: [
        "Karate Equipment",
        "Gymnastics Gear",
        "Training Materials",
        "Team Uniforms"
      ],
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    }
  ];

  // Partners Data
  const nationalPartners = [
    { name: "Rwanda Karate Federation (FERWAKA)", logo: "🥋", type: "Federation" },
    { name: "Rwanda Gymnastics Federation (FERWAGY)", logo: "🤸", type: "Federation" },
    { name: "Rwanda National Olympic and Sports Committee (RNOSC)", logo: "🏅", type: "Olympic Committee" },
    { name: "Ministry of Sports", logo: "🏛️", type: "Government" },
    { name: "National Olympic and Sports Academy", logo: "🎓", type: "Education" },
    { name: "Gasore Serge Foundation", logo: "❤️", type: "Foundation" },
    { name: "Partner schools and education institutions", logo: "🏫", type: "Education" }
  ];

  const internationalPartners = [
    { name: "World Karate Federation (WKF)", logo: "🌍", type: "International Federation" },
    { name: "International Olympic Committee (IOC)", logo: "⚡", type: "Olympic Committee" },
    { name: "International Olympic Academy (IOA)", logo: "🎓", type: "Education" },
    { name: "Alliance of Social Workers in Sport (ASWIS)", logo: "🤝", type: "Network" },
    { name: "USA Karate", logo: "🇺🇸", type: "National Federation" },
    { name: "5280 Gymnastics", logo: "🤸‍♂️", type: "International Club" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r bg-cerulean-blue-970 py-16">
      <div className="container mx-auto px-4">
        {/* Core Services Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-bright-sun-400/20 text-bright-sun-400 px-6 py-2 rounded-full border border-bright-sun-400/30 mb-6">
            <IconTrophy size={20} />
            <span className="font-semibold">Our Core Services</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Sports Development
            <span className="block text-bright-sun-400 text-2xl md:text-3xl mt-2">
              From Training to Competition
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We offer a complete ecosystem for sports development, ensuring every athlete has access to
            quality training, education, and resources.
          </p>
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreServices.map((service, index) => (
            <div
              key={service.title}
              className={`bg-gradient-to-br ${service.color} border ${service.borderColor} rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`${service.iconBg} ${service.iconColor} p-3 rounded-xl`}>
                  <service.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-gray-400 text-sm font-medium">Programmes Include:</div>
                {service.programs.map((program, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-bright-sun-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{program}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ecosystem Section */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 mb-16">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-bright-sun-400/20 rounded-2xl flex items-center justify-center">
              <IconBuilding className="text-bright-sun-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Complete Sports Ecosystem</h2>
              <p className="text-gray-400">End-to-end support for athletes and coaches</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <IconUsers size={24} />
                <span>Athlete Journey</span>
              </h3>
              <div className="space-y-4">
                {[
                  "Physical Literacy → Skill Development → Competition",
                  "School Programs → Academy Training → National Team",
                  "Equipment Support → Training → Competition Readiness"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-sm">{idx + 1}</span>
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <IconCertificate size={24} />
                <span>Coach Development</span>
              </h3>
              <div className="space-y-4">
                {[
                  "Certification → Mentoring → Professional Development",
                  "Local Training → International Exposure → Leadership",
                  "Technical Skills → Safe Sport → Athlete Management"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 text-sm">{idx + 1}</span>
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-bright-sun-400/20 text-bright-sun-400 px-6 py-2 rounded-full border border-bright-sun-400/30 mb-6">
              <IconWorld size={20} />
              <span className="font-semibold">Our Partners & Ecosystem</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Strategic Partnerships
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Collaborating with leading organizations to deliver world-class sports programs
            </p>
          </div>

          {/* National Partners */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <div className="w-3 h-8 bg-red-500 rounded-full"></div>
              <span>National Partners (Rwanda)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nationalPartners.map((partner, index) => (
                <div
                  key={partner.name}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{partner.logo}</div>
                    <div className="text-xs text-red-400 px-2 py-1 bg-red-500/20 rounded-full">
                      {partner.type}
                    </div>
                  </div>
                  <h4 className="text-white font-medium">{partner.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* International Partners */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <div className="w-3 h-8 bg-blue-500 rounded-full"></div>
              <span>International Partners & Networks</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalPartners.map((partner, index) => (
                <div
                  key={partner.name}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{partner.logo}</div>
                    <div className="text-xs text-blue-400 px-2 py-1 bg-blue-500/20 rounded-full">
                      {partner.type}
                    </div>
                  </div>
                  <h4 className="text-white font-medium">{partner.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="bg-gradient-to-r from-gray-800/30 to-cerulean-blue-900/30 border border-gray-700/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Benefits of Our Partnerships
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "International Standards",
                description: "Access to world-class training methodologies and certification",
                icon: "🌍",
                color: "text-blue-400"
              },
              {
                title: "Athlete Pathways",
                description: "Clear progression from local to international competitions",
                icon: "🏆",
                color: "text-yellow-400"
              },
              {
                title: "Resource Sharing",
                description: "Equipment, expertise, and best practices exchange",
                icon: "🔄",
                color: "text-green-400"
              }
            ].map((benefit, index) => (
              <div key={benefit.title} className="text-center">
                <div className={`text-4xl mb-4 ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;