import { useState } from "react";
import {
    IconMail,
    IconLock,
    IconEye,
    IconEyeOff,
    IconCheck
} from "@tabler/icons-react";

interface LoginProps {
    onLoginSuccess: (data: any) => void;
    onNavigateToRegister: () => void;
    onNavigateToForgot: () => void;
    loading: boolean;
    error: string;
    setError: (err: string) => void;
    handleLoginAPI: (email: string, pass: string) => Promise<void>;
}

const Login = ({
    onLoginSuccess,
    onNavigateToRegister,
    onNavigateToForgot,
    loading,
    error,
    setError,
    handleLoginAPI
}: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }
        await handleLoginAPI(email, password);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loading) {
            handleSubmit();
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="relative mb-8 text-center">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 drop-shadow-md pb-2">Welcome Back</h2>
                <p className="text-blue-100/90 text-sm">Sign in to access your dashboard</p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
            </div>

            <div className="space-y-5">
                {/* Email Input */}
                <div className="group">
                    <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative transition-all duration-300 transform group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <IconMail className="absolute left-4 top-3.5 text-blue-200 z-10" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="your.email@example.com"
                            disabled={loading}
                            className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:outline-none focus:border-yellow-400/50 focus:bg-black/30 backdrop-blur-md transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="group">
                    <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                    <div className="relative transition-all duration-300 transform group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <IconLock className="absolute left-4 top-3.5 text-blue-200 z-10" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="*************"
                            disabled={loading}
                            className="w-full pl-12 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:outline-none focus:border-yellow-400/50 focus:bg-black/30 backdrop-blur-md transition-all shadow-inner"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3.5 text-blue-200/50 hover:text-yellow-300 z-10 transition-colors"
                        >
                            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-4 pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${rememberMe ? "bg-gradient-to-br from-yellow-400 to-orange-500 border-transparent shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "bg-white/5 border-white/30 group-hover:border-white/50"
                                }`}>
                                {rememberMe && <IconCheck size={12} className="text-black font-bold" />}
                            </div>
                        </div>
                        <span className="text-blue-100/80 group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <button
                        type="button"
                        onClick={onNavigateToForgot}
                        className="text-yellow-300 hover:text-yellow-200 transition-colors hover:underline decoration-yellow-300/30 underline-offset-4 font-medium"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Login Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-lg tracking-wide bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-[length:200%_auto] hover:bg-right text-white shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6 border border-white/10"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Signing In...</span>
                        </div>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center pt-6 border-t border-white/10">
                <span className="text-blue-100/60 text-sm">New to Champion Academy? </span>
                <button
                    onClick={onNavigateToRegister}
                    className="text-yellow-300 font-bold text-sm hover:text-white transition-all hover:underline decoration-wavy decoration-yellow-300/30 underline-offset-4 ml-1"
                >
                    Create Parent Account
                </button>
            </div>
        </div>
    );
};

export default Login;
