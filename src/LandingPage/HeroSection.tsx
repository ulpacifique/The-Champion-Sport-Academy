import { useState, useEffect, useRef } from "react";
import { IconSparkles } from "@tabler/icons-react";
import AuthPages from "../Page/AuthPages";

const HERO_VIDEO_SRC = `${process.env.PUBLIC_URL || ""}/athletes/champVideo.mp4`;

const HeroSection = () => {
    const [animate, setAnimate] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Trigger animation when component mounts
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Force video to play: direct ref, no async URL. Run on mount and on every event that signals readiness.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        const attemptPlay = () => {
            const p = video.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
        };

        video.addEventListener("loadstart", attemptPlay);
        video.addEventListener("loadedmetadata", attemptPlay);
        video.addEventListener("loadeddata", attemptPlay);
        video.addEventListener("canplay", attemptPlay);
        video.addEventListener("canplaythrough", attemptPlay);
        video.addEventListener("playing", attemptPlay);

        attemptPlay();
        const t = setTimeout(attemptPlay, 100);
        const t2 = setTimeout(attemptPlay, 500);

        return () => {
            clearTimeout(t);
            clearTimeout(t2);
            video.removeEventListener("loadstart", attemptPlay);
            video.removeEventListener("loadedmetadata", attemptPlay);
            video.removeEventListener("loadeddata", attemptPlay);
            video.removeEventListener("canplay", attemptPlay);
            video.removeEventListener("canplaythrough", attemptPlay);
            video.removeEventListener("playing", attemptPlay);
        };
    }, []);

    return (
        <>
            <div ref={heroRef} className="relative flex items-center px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 min-h-[90vh] md:min-h-[85vh] overflow-hidden">
                {/* Background Video - loop, visible with light overlay */}
                <div className="absolute inset-0 z-0">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        src={HERO_VIDEO_SRC}
                        onContextMenu={(e) => e.preventDefault()}
                        aria-hidden
                    />
                    {/* Light overlay so video stays visible; subtle tint for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent dark:from-cerulean-blue-950/75 dark:via-cerulean-blue-950/40 dark:to-cerulean-blue-950/15" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-cerulean-blue-950/60" />
                </div>

                {/* Animated decorative elements - hidden on mobile for performance */}
                <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-bright-sun-300/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="hidden md:block absolute bottom-20 right-40 w-96 h-96 bg-cerulean-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Content Section - Full width on mobile */}
                <div className="relative z-10 flex flex-col w-full md:w-[65%] gap-6 md:gap-8">
                    {/* Welcome Badge with Icon */}
                    <div className={`group px-4 py-2 bg-gradient-to-r from-bright-sun-500/10 to-bright-sun-600/5 dark:from-bright-sun-200/20 dark:to-bright-sun-300/10 w-fit rounded-full border border-bright-sun-500/20 dark:border-bright-sun-200/40 text-bright-sun-600 dark:text-bright-sun-300 font-bold text-xs sm:text-sm tracking-wider uppercase mb-1 md:mb-2 animate-fade-in backdrop-blur-sm hover:scale-105 transition-transform cursor-default ${animate ? 'active' : ''}`}>
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <IconSparkles size={14} className="animate-pulse" />
                            <span className="whitespace-nowrap">Welcome to The Champion Sport Academy</span>
                        </div>
                    </div>

                    {/* Mobile-optimized Title with adjusted sizes */}
                    <div className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
                        <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                            {["We Are The", "Champions", "For", "Life"].map((word, index) => (
                                <span
                                    key={index}
                                    className={`inline-block animate-word ${animate ? 'active' : ''}`}
                                    style={{
                                        animationDelay: `${index * 150}ms`,
                                    }}
                                >
                                    {word.toLowerCase() === 'champions' ? (
                                        <span className="bg-gradient-to-r from-bright-sun-500 via-bright-sun-600 to-bright-sun-500 dark:from-bright-sun-200 dark:via-bright-sun-300 dark:to-bright-sun-200 bg-clip-text text-transparent animate-gradient">
                                            {word}
                                        </span>
                                    ) : (
                                        <span className="text-cerulean-blue-900 dark:text-white uppercase">{word}</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Subtitle */}
                    <div className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-200 max-w-2xl leading-relaxed font-medium">
                        <p className={`fade-in-text ${animate ? 'active' : ''}`}
                            style={{ animationDelay: '1200ms' }}>
                            The Champions Sports Academy Ltd (CSA) is a professional, values-driven sport and physical literacy organization founded in 2017 in Kigali, Rwanda.
                            The Academy operates as both a structured sport enterprise and a social impact institution, delivering high-quality sport and education services while contributing to national sport development.
                        </p>
                    </div>



                    {/* Feature Highlights Section - Stack vertically on mobile */}

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