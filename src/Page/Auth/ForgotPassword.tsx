import { useState } from "react";
import { IconMail, IconArrowLeft, IconSend } from "@tabler/icons-react";

interface ForgotPasswordProps {
    onNavigateToLogin: () => void;
    loading: boolean;
    error: string;
    setError: (err: string) => void;
    setSuccess: (msg: string) => void;
}

const ForgotPassword = ({
    onNavigateToLogin,
    loading,
    error,
    setError,
    setSuccess
}: ForgotPasswordProps) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        if (!email) {
            setError("Please enter your email");
            return;
        }

        // Mock API call
        setSuccess("Password reset link sent to your email!");
        setTimeout(() => {
            onNavigateToLogin();
        }, 3000);
    };

    return (
        <div className="animate-fade-in-up">
            <button
                onClick={onNavigateToLogin}
                className="absolute top-0 left-0 text-blue-200/60 hover:text-white flex items-center gap-2 hover:-translate-x-1 transition-all duration-300 group"
            >
                <div className="bg-white/5 p-2 rounded-full group-hover:bg-white/10">
                    <IconArrowLeft size={16} />
                </div>
                <span className="text-sm font-medium">Back to Login</span>
            </button>

            <div className="text-center mb-8 mt-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 animate-pulse-slow">
                    <IconSend className="text-white w-8 h-8 ml-1" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
                <p className="text-blue-200/70 text-sm max-w-xs mx-auto">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <div className="space-y-6">
                {/* Email Input */}
                <div className="group">
                    <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative">
                        <IconMail className="absolute left-4 top-3.5 text-blue-200/70" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400/50 focus:bg-black/30 backdrop-blur-md transition-all shadow-inner"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
