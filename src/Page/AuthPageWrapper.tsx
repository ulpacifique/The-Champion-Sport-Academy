import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthPages from "./AuthPages"; 
import HeroSection from "../LandingPage/HeroSection";

const AuthPageWrapper = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    // Determine which page to show based on URL
    const getInitialPage = () => {
        const path = location.pathname;
        if (path.includes('/register')) return 'register';
        if (path.includes('/forgot-password')) return 'forgot';
        return 'login'; // default for /login and /auth
    };

    const handleClose = () => {
        setIsOpen(false);
        navigate('/'); // Redirect to home when closed
    };

    // Open modal on mount
    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <div className="min-h-screen relative">
            {/* HeroSection in background with blur effect */}
            <div className="absolute inset-0">
                <HeroSection />
                {/* Blur overlay - like portrait mode bokeh effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-lg"></div>
            </div>

            {/* Auth Modal in foreground */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <AuthPages onClose={handleClose} />
            </div>
        </div>
    );
};

export default AuthPageWrapper;