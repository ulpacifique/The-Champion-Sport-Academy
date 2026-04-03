import { useState, useEffect, useRef, type ReactNode } from "react";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/wedo.mp4`;

const HEADLINE_WORDS = ["We Are The", "Champions", "For", "Life"] as const;

const HERO_ABOUT_PARAGRAPHS: readonly ReactNode[] = [
    <>
        <strong className="text-cerulean-blue-900 dark:text-white">The Champions Sports Academy</strong> is a leading sports organization promoting inclusive sport, physical literacy, and values-based education for all.
    </>,
    <>Founded in 2017 in Kigali, Rwanda, it combines coaching excellence, sport science, and well-being to develop individuals, communities, and sport systems.</>,
    <>
        With a strong focus on children and youth while serving all ages, the Academy creates lasting social impact while driving sustainable growth and contributing to the national sport system and economy.
    </>,
];

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
                    {/* Left (desktop): portrait video */}
                    <div className="flex w-full shrink-0 justify-center lg:w-auto">
                        <div className="relative aspect-[10/11] w-full max-w-[min(100%,360px)] overflow-hidden rounded-2xl border-2 border-cerulean-blue-200 shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/10 sm:max-w-[380px] md:max-w-[min(50vw,420px)] lg:max-w-[min(44vw,440px)] dark:border-white/35 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] dark:ring-white/10">
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

                    {/* Right (desktop): headline + about copy — left-aligned to column edge */}
                    <div className="flex w-full min-w-0 max-w-xl flex-col items-start text-left sm:max-w-2xl lg:w-auto lg:max-w-[min(100%,36rem)] lg:flex-none">
                        <div className="w-full text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl">
                            <div className="flex flex-wrap justify-start gap-x-2 gap-y-1 md:gap-x-3">
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

                        <div
                            className={`mt-8 w-full space-y-4 text-left text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base ${
                                animate ? "opacity-100" : "opacity-0"
                            } transition-opacity duration-700 delay-200`}
                        >
                            {HERO_ABOUT_PARAGRAPHS.map((body, i) => (
                                <p key={i}>{body}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
