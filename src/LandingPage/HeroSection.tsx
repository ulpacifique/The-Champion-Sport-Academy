import { useState, useEffect, useRef } from "react";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/wedo.mp4`;

const HEADLINE_LEFT = "We Are The";
const HEADLINE_RIGHT = ["Champions", "For", "Life"] as const;

const HeroSection = () => {
    const [animate, setAnimate] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
            <div
                ref={heroRef}
                className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-white px-4 py-12 sm:px-6 sm:pt-8 md:min-h-[85vh] md:px-10 md:py-16 dark:bg-cerulean-blue-900"
            >
                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-6 xl:gap-10">
                    {/* Left: titles */}
                    <div className="flex w-full flex-col items-center text-center lg:min-w-0 lg:max-w-xl lg:flex-1 lg:items-start lg:text-left">
                        <p
                            className={`mb-3 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-cerulean-blue-800 dark:text-white/90 sm:text-base md:text-lg ${
                                animate ? "opacity-100" : "opacity-0"
                            } transition-opacity duration-500`}
                        >
                            The Champion Sport Academy
                        </p>

                        <div className="mb-2 text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl">
                            <span
                                className={`inline-block animate-word ${animate ? "active" : ""}`}
                                style={{ animationDelay: "0ms" }}
                            >
                                <span className="uppercase text-cerulean-blue-900 dark:text-white">{HEADLINE_LEFT}</span>
                            </span>
                        </div>
                    </div>

                    {/* Center: portrait video (balanced by flex-1 columns on left/right at lg+) */}
                    <div className="flex w-full shrink-0 justify-center lg:w-auto">
                        <div className="relative aspect-[9/16] w-full max-w-[min(100%,280px)] overflow-hidden rounded-2xl border-2 border-cerulean-blue-200 shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/10 sm:max-w-[300px] md:max-w-[min(42vw,320px)] dark:border-white/35 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] dark:ring-white/10">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                className="pointer-events-none h-full w-full select-none object-cover"
                                src={HERO_VIDEO_SRC}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>

                    {/* Right: Champions / For / Life */}
                    <div className="flex min-w-0 w-full flex-1 flex-col items-end text-right">
                        <div className="text-3xl font-bold leading-[1.1] drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl">
                            {HEADLINE_RIGHT.map((word, index) => (
                                <span
                                    key={word}
                                    className={`block animate-word ${animate ? "active" : ""}`}
                                    style={{ animationDelay: `${(index + 1) * 150}ms` }}
                                >
                                    {word.toLowerCase() === "champions" ? (
                                        <span className="animate-gradient bg-gradient-to-r from-bright-sun-500 via-bright-sun-600 to-bright-sun-500 bg-clip-text text-transparent dark:from-bright-sun-300 dark:via-bright-sun-400 dark:to-bright-sun-300">
                                            {word}
                                        </span>
                                    ) : (
                                        <span className="uppercase text-cerulean-blue-900 dark:text-white">{word}</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
