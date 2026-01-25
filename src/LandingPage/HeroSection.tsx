import { useState, useEffect, useRef } from "react";
import { IconSearch } from "@tabler/icons-react";
import { TextInput } from "@mantine/core";
import AuthPages from "../Page/AuthPages";
import { useLocation } from "react-router-dom";


const HeroSection = () => {
    // Array of sports images for carousel
    const sportsImages = [
        "/sports/GIFTSTUDIO-1.jpg",
        "/sports/GIFTSTUDIO(1)-1.jpg",
        "/sports/GIFTSTUDIO(1).jpg",
        "/sports/GIFTSTUDIO(166).jpg",
        "/sports/GIFTSTUDIO(167).jpg",
        "/sports/GIFTSTUDIO(169).jpg"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false); // Add auth modal state
    const heroRef = useRef<HTMLDivElement>(null);


    const location = useLocation();
    const [isAuthPage, setIsAuthPage] = useState(false);
    // Trigger animation when component mounts
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Auto-rotate images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === sportsImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [sportsImages.length]);

    // For manual navigation
    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === sportsImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? sportsImages.length - 1 : prevIndex - 1
        );
    };

    // Split text into words for animation
    const titleWords = ["We are ", "The", "Champions", "for", "Life"];

    return (
        <>
            <div ref={heroRef} className="relative flex items-center px-10 py-32 min-h-[85vh] overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/athletes/Champions.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Gradient Overlay: Dark on left, transparent on right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cerulean-blue-950 via-cerulean-blue-950/90 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 flex flex-col w-full md:w-[60%] gap-8">
                    {/* Welcome Label */}
                    <div className={`px-4 py-1 bg-bright-sun-400/20 w-fit rounded-full border border-bright-sun-400/30 text-bright-sun-400 font-semibold text-sm tracking-wider uppercase mb-2 animate-fade-in ${animate ? 'active' : ''}`}>
                        Welcome to The Champion Sport Academy
                    </div>

                    {/* Animated Title */}
                    <div className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                        {["Building", "Champions", "For", "Life"].map((word, index) => (
                            <span
                                key={index}
                                className={`inline-block mr-3 animate-word ${animate ? 'active' : ''}`}
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                    color: word.toLowerCase() === 'champions'
                                        ? '#ffbe20'  // bright-sun-400
                                        : 'white'
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </div>

                    {/* Animated Subtitle */}
                    <div className="text-xl text-gray-200 max-w-2xl leading-relaxed">
                        <p className={`fade-in-text ${animate ? 'active' : ''}`}
                            style={{ animationDelay: '1200ms' }}>
                            Where passion meets discipline. Join Rwanda's premier sports academy dedicated to nurturing talent, character, and physical excellence in every athlete.
                        </p>
                    </div>

                    {/* Values List */}
                    <div className={`flex flex-wrap gap-x-8 gap-y-3 mt-2 text-cerulean-blue-200 font-medium ${animate ? 'fade-in' : ''}`}
                        style={{ animationDelay: '1500ms' }}>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bright-sun-400"></span> Discipline
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bright-sun-400"></span> Friendship
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bright-sun-400"></span> Respect
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bright-sun-400"></span> Excellence
                        </div>
                    </div>

                    {/* Search/Filter Section */}
                    <div className={`flex flex-wrap gap-3 mt-6 p-2 bg-cerulean-blue-900/50 backdrop-blur-sm border border-cerulean-blue-700/50 rounded-xl w-fit ${animate ? 'fade-in' : ''}`}
                        style={{ animationDelay: '1800ms' }}>
                        <TextInput
                            className="bg-transparent [&_input]:bg-transparent [&_input]:border-none [&_input]:text-white min-w-[200px]"
                            variant="unstyled"
                            placeholder="Find your sport..."
                            leftSection={<IconSearch size={18} className="text-gray-400" />}
                        />
                        <div className={`animated-button flex items-center justify-center bg-bright-sun-400 text-cerulean-blue-950 font-bold rounded-lg px-6 py-2.5 hover:bg-bright-sun-500 cursor-pointer transition-all hover:scale-105 active:scale-95 ${animate ? 'active' : ''}`}
                            style={{ animationDelay: '2000ms' }}>
                            Explore Programmes
                        </div>
                    </div>

                    {/* Stats */}
                    <div className={`flex gap-12 mt-8 pt-8 border-t border-white/10 ${animate ? 'fade-in' : ''}`}
                        style={{ animationDelay: '2200ms' }}>
                        <div>
                            <div className="text-4xl font-bold text-white mb-1">500+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Athletes</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-1">20+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Years Exp.</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-1">15+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Sports</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auth Modal Overlay - ADD THIS */}
            {showAuthModal && (
                <AuthPages onClose={() => setShowAuthModal(false)} />
            )}
        </>
    );
};

export default HeroSection;