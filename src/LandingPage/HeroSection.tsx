import { useState, useEffect, useRef } from "react";
import { IconSparkles } from "@tabler/icons-react";
import AuthPages from "../Page/AuthPages";

const HeroSection = () => {
    const [animate, setAnimate] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    // Trigger animation when component mounts
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div ref={heroRef} className="relative flex items-center px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 min-h-[90vh] md:min-h-[85vh] overflow-hidden">
                {/* Mobile-Optimized Background Image with Enhanced Gradient Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/athletes/Champions.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundAttachment: 'fixed', // Creates parallax effect on mobile
                    }}
                >
                    {/* Darker gradient for better text readability on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cerulean-blue-950 via-cerulean-blue-950/95 to-cerulean-blue-950/70 md:to-cerulean-blue-950/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cerulean-blue-950/40 to-cerulean-blue-950/80"></div>
                </div>

                {/* Animated decorative elements - hidden on mobile for performance */}
                <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-bright-sun-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="hidden md:block absolute bottom-20 right-40 w-96 h-96 bg-cerulean-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Content Section - Full width on mobile */}
                <div className="relative z-10 flex flex-col w-full md:w-[65%] gap-6 md:gap-8">
                    {/* Welcome Badge with Icon */}
                    <div className={`group px-4 py-2 bg-gradient-to-r from-bright-sun-400/20 to-bright-sun-500/10 w-fit rounded-full border border-bright-sun-400/40 text-bright-sun-400 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-1 md:mb-2 animate-fade-in backdrop-blur-sm hover:scale-105 transition-transform cursor-default ${animate ? 'active' : ''}`}>
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <IconSparkles size={14} className="animate-pulse" />
                            <span className="whitespace-nowrap">Welcome to The Champion Sport Academy</span>
                        </div>
                    </div>

                    {/* Mobile-optimized Title with adjusted sizes */}
                    <div className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
                        <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                            {["Building", "Champions", "For", "Life"].map((word, index) => (
                                <span
                                    key={index}
                                    className={`inline-block animate-word ${animate ? 'active' : ''}`}
                                    style={{
                                        animationDelay: `${index * 150}ms`,
                                    }}
                                >
                                    {word.toLowerCase() === 'champions' ? (
                                        <span className="bg-gradient-to-r from-bright-sun-400 via-bright-sun-500 to-bright-sun-400 bg-clip-text text-transparent animate-gradient">
                                            {word}
                                        </span>
                                    ) : (
                                        <span className="text-white">{word}</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Subtitle */}
                    <div className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                        <p className={`fade-in-text ${animate ? 'active' : ''}`}
                            style={{ animationDelay: '1200ms' }}>
                            Where passion meets discipline. Join Rwanda's premier sports academy dedicated to nurturing talent, character, and physical excellence in every athlete.
                        </p>
                    </div>

                    {/* Enhanced Values List - Stack on mobile, row on larger screens */}
                    <div className={`flex flex-wrap gap-4 sm:gap-x-10 sm:gap-y-4 mt-2 md:mt-4 ${animate ? 'fade-in' : ''}`}
                        style={{ animationDelay: '1500ms' }}>
                        {['Discipline', 'Friendship', 'Respect', 'Excellence'].map((value, idx) => (
                            <div
                                key={value}
                                className="group flex items-center gap-2 md:gap-3 text-cerulean-blue-200 font-semibold hover:text-white transition-colors cursor-default"
                                style={{ animationDelay: `${1500 + idx * 100}ms` }}
                            >
                                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 group-hover:scale-125 transition-transform shadow-lg shadow-bright-sun-400/50"></span>
                                <span className="text-sm sm:text-base">{value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Feature Highlights Section - Stack vertically on mobile */}
                    <div className={`flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12 pt-6 sm:pt-8 border-t border-white/10 ${animate ? 'fade-in' : ''}`}
                        style={{ animationDelay: '1800ms' }}>
                        <div className="flex items-center gap-3 px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-bright-sun-400/30 transition-colors w-full sm:w-auto">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-bright-sun-400/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg sm:text-xl">🥇</span>
                            </div>
                            <div className="min-w-0">
                                <div className="text-white font-semibold text-sm sm:text-base truncate">Elite Training</div>
                                <div className="text-xs text-gray-400 truncate">World-class facilities</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-bright-sun-400/30 transition-colors w-full sm:w-auto">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-bright-sun-400/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg sm:text-xl">👨‍🏫</span>
                            </div>
                            <div className="min-w-0">
                                <div className="text-white font-semibold text-sm sm:text-base truncate">Expert Coaches</div>
                                <div className="text-xs text-gray-400 truncate">Certified professionals</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-bright-sun-400/30 transition-colors w-full sm:w-auto">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-bright-sun-400/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg sm:text-xl">🌍</span>
                            </div>
                            <div className="min-w-0">
                                <div className="text-white font-semibold text-sm sm:text-base truncate">Global Network</div>
                                <div className="text-xs text-gray-400 truncate">International partnerships</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auth Modal Overlay */}
            {showAuthModal && (
                <AuthPages onClose={() => setShowAuthModal(false)} />
            )}
        </>
    );
};

export default HeroSection;