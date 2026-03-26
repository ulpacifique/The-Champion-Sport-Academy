import { Link } from "react-router-dom";
import {
    IconMapPin,
    IconPhone,
    IconMail,
    IconBrandInstagram,
    IconBrandYoutube,
    IconBrandFacebook,
    IconBrandLinkedin,
    IconLink,
} from "@tabler/icons-react";

const FOOTER_NAV = [
    { label: "Who We Are", to: "/" },
    { label: "What We Do", to: "/events" },
    { label: "Our Founder", to: "/founder" },
    { label: "Contact", to: "/contact" },
] as const;

const PROGRAMME_LINKS = [
    { label: "Karate", to: "/karate" },
    { label: "Gymnastics", to: "/Gymnastics" },
    { label: "Multi-sport & events", to: "/events" },
] as const;

const SOCIAL = [
    { label: "Instagram", href: "https://www.instagram.com/thechampionssportsacademy/?hl=en", icon: IconBrandInstagram },
    { label: "YouTube", href: "https://youtu.be/S_3GBmCgmxU?si=yJe_farJ83_eNNVU", icon: IconBrandYoutube },
    { label: "Facebook", href: "https://web.facebook.com/nkuranyabahizi", icon: IconBrandFacebook },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/noel-nkuranyabahizi-a89ab5176/", icon: IconBrandLinkedin },
    { label: "Threads", href: "https://www.threads.com/@thechampionssportsacademy", icon: IconLink },
] as const;

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-gradient-to-b from-cerulean-blue-950 via-[#151d3f] to-cerulean-blue-950 text-white">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                aria-hidden
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 0%, rgb(255 189 32 / 0.5), transparent 45%), radial-gradient(circle at 80% 100%, rgb(66 130 239 / 0.35), transparent 40%)`,
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-4">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bright-sun-400 text-sm font-black tracking-tight text-cerulean-blue-950 shadow-lg shadow-bright-sun-500/20">
                                TC
                            </span>
                            <div>
                                <p className="text-lg font-black uppercase italic leading-tight tracking-tight text-white md:text-xl">
                                    The Champions
                                </p>
                                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-bright-sun-300/90">
                                    Sports Academy
                                </p>
                            </div>
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed text-gray-400">
                            Values-driven multisport programmes in Kigali—building discipline, friendship, teamwork, and
                            excellence for children and youth.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-bright-sun-300">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {FOOTER_NAV.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="text-sm font-semibold text-gray-400 transition-colors hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programmes */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-bright-sun-300">
                            Programmes
                        </h3>
                        <ul className="space-y-3">
                            {PROGRAMME_LINKS.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.to}
                                        className="text-sm font-semibold text-gray-400 transition-colors hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + social */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-bright-sun-300">
                            Connect
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:niyonoel@gmail.com"
                                    className="group flex gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                                >
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-bright-sun-300 ring-1 ring-white/10 transition-colors group-hover:bg-bright-sun-400/15 group-hover:text-bright-sun-200">
                                        <IconMail size={18} stroke={1.6} />
                                    </span>
                                    <span className="pt-1.5 font-medium leading-snug">niyonoel@gmail.com</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+250788876966"
                                    className="group flex gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                                >
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-bright-sun-300 ring-1 ring-white/10 transition-colors group-hover:bg-bright-sun-400/15 group-hover:text-bright-sun-200">
                                        <IconPhone size={18} stroke={1.6} />
                                    </span>
                                    <span className="pt-1.5 font-medium">+250 788 876 966</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/iJ1AQj4vjfrzizo28"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                                >
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-bright-sun-300 ring-1 ring-white/10 transition-colors group-hover:bg-bright-sun-400/15 group-hover:text-bright-sun-200">
                                        <IconMapPin size={18} stroke={1.6} />
                                    </span>
                                    <span className="pt-1.5 font-medium leading-snug">Des Angel, Kigali, Rwanda</span>
                                </a>
                            </li>
                        </ul>

                        <p className="mb-3 mt-8 text-xs font-black uppercase tracking-[0.2em] text-bright-sun-300">
                            Follow
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {SOCIAL.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 ring-1 ring-white/10 transition-all hover:bg-bright-sun-400/20 hover:text-bright-sun-200 hover:ring-bright-sun-400/30"
                                >
                                    <Icon size={18} stroke={1.6} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
                    <p className="text-center text-xs text-gray-500 md:text-left">
                        © {year} The Champions Sports Academy. All rights reserved.
                    </p>
                    <p className="text-center text-xs text-gray-500 md:text-right">
                        Site by{" "}
                        <span className="font-semibold text-bright-sun-300/90">eng.Pacifique</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
