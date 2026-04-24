import { useState, useEffect, useRef, type ReactNode } from "react";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/wedo.mp4`;
const HERO_BANNER_SRC = `${import.meta.env.BASE_URL}athletes/we.jpeg`;

const HERO_ABOUT_PARAGRAPHS: readonly ReactNode[] = [
    <>
        <strong className="text-cerulean-blue-900 dark:text-white">WE ARE THE CHAMPIONS FOR LIFE

</strong> The Champions Sports Academy Ltd is a Kigali-based, high-performance and socio-economic impact sports organization founded in 2017 by Noel Nkuranyabahizi—International Elite Sports Coach, Olympic scholar, and social worker in sport—together with a multidisciplinary team of professionals.
The Academy advances inclusive sport, physical literacy, and values-based education as drivers of human capital development, lifelong well-being, and sustainable socio-economic progress.
    </>,
    <>
    Our work aligns with the World Health Organization (WHO )recommendations on physical activity and health, the United Nations Sustainable Development Goals notably SDG 3 (Good Health and Well-being), SDG 4 (Quality Education), and SDG 8 (Decent Work and Economic Growth), Rwanda Vision 2050, the Rwanda National Sports Development Policy, and the International Olympic Committee Olympic Agenda 2020+5, positioning sport as a catalyst for health, education, inclusion, and economic growth.
    As a centre of excellence, we deliver integrated services in youth development, sport programme design and management, event organization, and coaching education, combining high-performance coaching, sport science, safeguarding, inclusion, and holistic well-being.</>,
    <>
         
    Operating through a hybrid model that integrates social impact and sustainable business, we serve children and youth, families, institutions, and partners, creating pathways for physical literacy, talent development, character formation, and lifelong engagement in sport.
    The Champions Sports Academy Ltd builds champions—not only for sport, but for life.
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
                className="relative flex min-h-[85vh] flex-col overflow-hidden bg-white px-4 py-6 sm:px-5 sm:py-6 md:min-h-[80vh] md:px-8 md:py-10 dark:bg-cerulean-blue-900"
            >
                <div className="relative z-10 mx-auto w-full max-w-7xl">
                    {/* Top-aligned row: ~40% video | ~60% banner + copy (same starting line) */}
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
                        {/* Left — portrait video */}
                        <div className="flex w-full shrink-0 justify-center lg:w-[40%] lg:justify-start lg:pt-0">
                            <div className="relative aspect-[3/3] w-full max-w-[min(92vw,280px)] overflow-hidden rounded-2xl border-2 border-cerulean-blue-200 shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/10 dark:border-white/35 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] dark:ring-white/10 sm:max-w-[300px] lg:max-w-none lg:self-start">
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

                        {/* Right — banner image, then about (aligned to top with video) */}
                        <div className="flex min-w-0 flex-1 flex-col gap-5 lg:w-[60%] lg:pt-0">
                            <div className="overflow-hidden rounded-2xl border-2 border-cerulean-blue-200 bg-cerulean-blue-950 shadow-xl shadow-cerulean-blue-900/20 ring-1 ring-cerulean-blue-900/30 dark:border-white/15 dark:ring-white/10">
                                <img
                                    src={HERO_BANNER_SRC}
                                    alt="The Champions Sports Academy — logo, title, values, and contact"
                                    className="block h-auto w-full object-contain object-top"
                                    draggable={false}
                                    loading="eager"
                                    decoding="async"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </div>

                            <div
                                className={`w-full space-y-3 text-left text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:space-y-4 sm:text-base ${
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
            </div>
        </>
    );
};

export default HeroSection;
