import { Link, useNavigate } from "react-router-dom";
import AuthPages from "./AuthPages";

const AuthPageWrapper = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-cerulean-blue-900 via-cerulean-blue-800 to-cerulean-blue-900 dark:from-cerulean-blue-950 dark:via-cerulean-blue-900 dark:to-cerulean-blue-950">
            {/* Top bar: back to home */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm transition-colors"
                >
                    <span className="inline-block w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">←</span>
                    Back to home
                </Link>
                <Link to="/" className="flex items-center gap-2">
                    <img src={`${import.meta.env.BASE_URL}champion-logo.png`} alt="Champion" className="w-10 h-10 object-contain" />
                    <span className="text-white font-bold uppercase tracking-tight hidden sm:inline">Champions Academy</span>
                </Link>
            </div>

            {/* Main content: centered auth form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                <AuthPages onClose={handleClose} />
            </div>
        </div>
    );
};

export default AuthPageWrapper;
