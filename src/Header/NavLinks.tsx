import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";

const NavLinks = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Mix of hash links for HomePage sections and route links for other pages
    const links = [
        // { name: "Home", url: "#home", type: "hash" },
        { name: "Home", url: "/", type: "route" },
        { name: "Events", url: "/events", type: "route" }, // New Events page link
        { name: "Karate", url: "/karate", type: "route" },
        { name: "Gymnastics", url: "/gymnastics", type: "route" },
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
            <div className="hidden md:flex gap-6 text-cerulean-blue-300 h-full items-center">
                {links.map((link, index) => {
                    if (link.type === "hash") {
                        return (
                            <button
                                key={index}
                                onClick={() => handleHashLinkClick(link.url)}
                                className={`${isHashActive(link.url)
                                    ? "border-bright-sun-400 text-bright-sun-400"
                                    : "border-transparent hover:text-bright-sun-400"
                                    } border-t-[3px] h-full flex items-center transition-colors px-3`}
                            >
                                {link.name}
                            </button>
                        );
                    } else {
                        return (
                            <Link
                                key={index}
                                to={link.url}
                                onClick={handleRouteLinkClick}
                                className={`${isRouteActive(link.url)
                                    ? "border-bright-sun-400 text-bright-sun-400"
                                    : "border-transparent hover:text-bright-sun-400"
                                    } border-t-[3px] h-full flex items-center transition-colors px-3`}
                            >
                                {link.name}
                            </Link>
                        );
                    }
                })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-white hover:bg-cerulean-blue-900 rounded-lg transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Mobile Menu */}
                    <div className="fixed top-24 left-0 right-0 bg-cerulean-blue-950 border-t border-cerulean-blue-800 shadow-xl z-50 md:hidden animate-slideDown">
                        <div className="flex flex-col">
                            {links.map((link, index) => {
                                if (link.type === "hash") {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleHashLinkClick(link.url)}
                                            className={`px-6 py-4 border-l-4 transition-colors text-left ${isHashActive(link.url)
                                                ? "border-bright-sun-400 text-bright-sun-400 bg-cerulean-blue-900/50"
                                                : "border-transparent text-cerulean-blue-300 hover:bg-cerulean-blue-900/30 hover:text-bright-sun-400"
                                                }`}
                                        >
                                            {link.name}
                                        </button>
                                    );
                                } else {
                                    return (
                                        <Link
                                            key={index}
                                            to={link.url}
                                            onClick={handleRouteLinkClick}
                                            className={`px-6 py-4 border-l-4 transition-colors text-left ${isRouteActive(link.url)
                                                ? "border-bright-sun-400 text-bright-sun-400 bg-cerulean-blue-900/50"
                                                : "border-transparent text-cerulean-blue-300 hover:bg-cerulean-blue-900/30 hover:text-bright-sun-400"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default NavLinks;