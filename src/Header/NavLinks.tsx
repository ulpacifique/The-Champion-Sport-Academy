import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";

const NavLinks = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Mix of hash links for HomePage sections and route links for other pages
    const links = [
        // { name: "Home", url: "#home", type: "hash" },
        { name: "Who We Are", url: "/", type: "route" },
        { name: "What We Do", url: "/events", type: "route" }, // New Events page link
        { name: "Karate", url: "/karate", type: "route" },
        { name: "Gymnastics", url: "/gymnastics", type: "route" },
        { name: "Our Founder", url: "/founder", type: "route" },
        { name: "Contact", url: "/contact", type: "route" },
    ];

    const location = useLocation();

    const handleHashLinkClick = (hash: string) => {
        setIsOpen(false);

        // Remove # if present
        const sectionId = hash.replace('#', '');

        if (sectionId === 'home') {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to section
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 80; // Adjust for fixed header height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleRouteLinkClick = () => {
        setIsOpen(false);
    };

    // Check if current hash matches link for active state
    const isHashActive = (hash: string) => {
        return window.location.hash === hash;
    };

    // Check if current route matches link for active state
    const isRouteActive = (route: string) => {
        return location.pathname === route;
    };

    return (
        <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 h-full">
                {links.map((link, index) => {
                    const isActive = link.type === "hash" ? isHashActive(link.url) : isRouteActive(link.url);

                    const LinkContent = (
                        <div className="relative flex flex-col items-center justify-center h-full px-3 lg:px-4 group cursor-pointer">
                            <span className={`text-sm lg:text-base font-bold tracking-tight transition-all duration-300 whitespace-nowrap ${isActive ? "text-bright-sun-600 dark:text-bright-sun-300" : "text-gray-500 dark:text-gray-300 group-hover:text-cerulean-blue-900 dark:group-hover:text-white"
                                }`}>
                                {link.name}
                            </span>

                            {/* Modern Bottom Indicator */}
                            <div className={`absolute bottom-0 h-1 bg-gradient-to-r from-bright-sun-200 to-bright-sun-400 rounded-t-full transition-all duration-500 ${isActive ? "w-2/3 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-50"
                                }`} />
                        </div>
                    );

                    if (link.type === "hash") {
                        return (
                            <button
                                key={index}
                                onClick={() => handleHashLinkClick(link.url)}
                                className="h-full focus:outline-none"
                            >
                                {LinkContent}
                            </button>
                        );
                    } else {
                        return (
                            <Link
                                key={index}
                                to={link.url}
                                onClick={handleRouteLinkClick}
                                className="h-full"
                            >
                                {LinkContent}
                            </Link>
                        );
                    }
                })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-cerulean-blue-900 dark:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all border border-gray-200 dark:border-white/5 active:scale-90"
                aria-label="Toggle menu"
            >
                {isOpen ? <IconX size={24} className="text-bright-sun-600 dark:text-bright-sun-300" /> : <IconMenu2 size={24} />}
            </button>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-white/60 dark:bg-cerulean-blue-900/80 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Mobile Menu */}
                    <div className="fixed top-24 left-4 right-4 bg-white dark:bg-cerulean-blue-900 border border-gray-100 dark:border-white/10 shadow-2xl z-[100] md:hidden rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex flex-col p-2">
                            <div className="px-4 py-3 mb-2 border-b border-gray-100 dark:border-white/5 text-center">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-bright-sun-600 dark:text-bright-sun-300/60 font-bold">Navigation Menu</span>
                            </div>
                            {links.map((link, index) => {
                                const isActive = link.type === "hash" ? isHashActive(link.url) : isRouteActive(link.url);

                                const MobileLinkContent = (
                                    <div className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive
                                            ? "bg-bright-sun-100 dark:bg-bright-sun-300/10 text-bright-sun-600 dark:text-bright-sun-300 border border-bright-sun-200 dark:border-bright-sun-300/20"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-cerulean-blue-900 dark:hover:text-white border border-transparent"
                                        }`}>
                                        <span className="font-bold tracking-tight">{link.name}</span>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-bright-sun-300 shadow-[0_0_8px_rgba(255,191,0,0.6)]" />}
                                    </div>
                                );

                                if (link.type === "hash") {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleHashLinkClick(link.url)}
                                            className="w-full text-left"
                                        >
                                            {MobileLinkContent}
                                        </button>
                                    );
                                } else {
                                    return (
                                        <Link
                                            key={index}
                                            to={link.url}
                                            onClick={handleRouteLinkClick}
                                        >
                                            {MobileLinkContent}
                                        </Link>
                                    );
                                }
                            })}

                            <div className="mt-2 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium text-center">
                                    © 2026 THE CHAMPIONS SPORTS ACADEMY
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default NavLinks;