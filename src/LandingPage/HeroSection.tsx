import { useState, useEffect, useRef, type ReactNode } from "react";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}athletes/wedo.mp4`;
const HERO_IMAGE_SRC = `${import.meta.env.BASE_URL}athletes/we.jpeg`;

const HERO_ABOUT_PARAGRAPHS: readonly ReactNode[] = [
    <>
        <strong className="text-cerulean-blue-900 dark:text-white">WE ARE THE CHAMPIONS FOR LIFE

</strong> The Champions Sports Academy Ltd is a leading sports company based in Kigali, Rwanda, dedicated to advancing inclusive sport, physical literacy, and values-based education.
    </>,
    <>Founded in 2017, the Academy delivers professional services in youth development, sport programme design and management, event organization, and coaching education at national and international levels, combining coaching excellence, sport science, and well-being to achieve high-quality outcomes.</>,
    <>
          Positioned as a centre of excellence in sport development, the Academy serves individuals, communities, and institutions while contributing to the strengthening of sport systems.
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
                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-6 xl:gap-8">
                    {/* Left (desktop): portrait video — unchanged position */}
                    <div className="flex w-full shrink-0 justify-center lg:w-auto">
                        <div className="relative aspect-[7/9] w-full max-w-[min(100%,200px)] overflow-hidden rounded-2xl border-2 border-cerulean-blue-200 shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/10 sm:max-w-[280px] md:max-w-[min(50vw,420px)] lg:max-w-[min(44vw,440px)] dark:border-white/35 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] dark:ring-white/10">
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

                    {/* Right (desktop): landscape image, then about */}
                    <div className="flex w-full min-w-0 max-w-xl flex-col items-start text-left sm:max-w-2xl lg:w-auto lg:max-w-[min(190%,36rem)] lg:flex-none">
                        <div className="relative w-full overflow-hidden rounded-2xl border-2 border-cerulean-blue-200 shadow-lg shadow-cerulean-blue-900/10 ring-2 ring-cerulean-blue-900/10 dark:border-white/35 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] dark:ring-white/10">
                            <div className="relative aspect-auto min-h-[180px] w-full sm:min-h-[200px]">
                                <img
                                    src={HERO_IMAGE_SRC}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </div>
                        </div>

                        <div
                            className={`mt-5 w-full space-y-3 text-left text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:mt-6 sm:space-y-4 sm:text-base ${
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
