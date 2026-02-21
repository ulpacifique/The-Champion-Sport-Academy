import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthPages from "./AuthPages";
import HeroSection from "../LandingPage/HeroSection";

const AuthPageWrapper = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/'); // Redirect to home when closed
    };

    // Open modal on mount
    useEffect(() => {
        // Modal is managed by the wrapper visibility
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