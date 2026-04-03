import { useState, useEffect, useRef } from "react";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/wedo.mp4`;

const HEADLINE_WORDS = ["We Are The", "Champions", "For", "Life"] as const;

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
                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-10">
                    {/* Left: eyebrow + full headline — width fits copy only (no flex-1) so it doesn’t stretch away from the video */}
                    <div className="flex w-full min-w-0 max-w-xl flex-col items-center text-center sm:max-w-2xl lg:w-auto lg:max-w-[min(100%,28rem)] lg:flex-none lg:items-start lg:text-left">
                        
                        <div className="text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl">
                            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3 lg:justify-start">
                                {HEADLINE_WORDS.map((word, index) => (
                                    <span
                                        key={word}
                                        className={`inline-block animate-word ${animate ? "active" : ""}`}
                                        style={{ animationDelay: `${index * 150}ms` }}
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

                    {/* Right: portrait video — sits next to headline with a fixed gap, not at the far edge */}
                    <div className="flex w-full shrink-0 justify-center lg:w-auto">
                        <div className="relative aspect-[9/16] w-full max-w-[min(92vw,380px)] overflow-hidden rounded-2xl border-2 border-cerulean-blue-200 shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/10 sm:max-w-[900px] md:max-w-[min(42vw,320px)] dark:border-white/35 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] dark:ring-white/10">
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
                </div>
            </div>
        </>
    );
};

export default HeroSection;
