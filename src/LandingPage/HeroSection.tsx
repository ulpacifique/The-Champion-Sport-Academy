import { useState, useEffect, useRef } from "react";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/champVideo.mp4`;

const HeroSection = () => {
    const [animate, setAnimate] = useState(false);
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
<div ref={heroRef} className="relative flex flex-col items-center justify-start pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-10 py-12 md:py-16 min-h-[90vh] md:min-h-[85vh] overflow-hidden">
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
                    {/* Light overlay so video stays visible and clear */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-transparent dark:from-cerulean-blue-950/55 dark:via-cerulean-blue-950/25 dark:to-cerulean-blue-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-cerulean-blue-950/45" />
                </div>

                {/* Animated decorative elements - hidden on mobile for performance */}
                <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-bright-sun-300/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="hidden md:block absolute bottom-20 right-40 w-96 h-96 bg-cerulean-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Content: title first and centered, up near header */}
                <div className="relative z-10 flex flex-col items-center text-center w-full max-w-8xl">
                    {/* One line above the title */}
                    <p className={`text-sm sm:text-base md:text-lg text-cerulean-blue-800 dark:text-gray-200 font-semibold uppercase tracking-widest drop-shadow-lg whitespace-nowrap mb-3 ${animate ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                        The Champion Sport Academy
                    </p>

                    {/* First: We Are The Champions For Life — centered, at top */}
                    <div className="text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-bold leading-tight drop-shadow-2xl mb-4 md:mb-6">
                        <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1">
                            {["We Are The", "Champions", "For", "Life"].map((word, index) => (
                                <span
                                    key={index}
                                    className={`inline-block animate-word ${animate ? 'active' : ''}`}
                                    style={{ animationDelay: `${index * 150}ms` }}
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
                    <div className="h-8 md:h-60" />

                    {/* Tagline: Excellence in Sport & Life — Kigali, Rwanda */}
                    <p className={`text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-200 font-medium drop-shadow-lg mb-6 ${animate ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} style={{ transitionDelay: '400ms' }}>
                        Excellence in Sport & Life — Kigali, Rwanda
                    </p>

                    {/* Subtitle – full wording unchanged */}
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mx-auto">
                        <p className={`fade-in-text ${animate ? 'active' : ''}`} style={{ animationDelay: '600ms' }}>
                            Values-driven sport and physical literacy organization founded in 2017. Delivering high-quality sport and education while contributing to national sport development.
                        </p>
                    </div>



                    {/* Feature Highlights Section - Stack vertically on mobile */}

                </div>
            </div>
        </>
    );
};

export default HeroSection;