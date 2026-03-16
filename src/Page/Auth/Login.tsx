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
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bright-sun-600 via-bright-sun-500 to-bright-sun-600 dark:from-bright-sun-200 dark:via-bright-sun-100 dark:to-bright-sun-200 drop-shadow-md pb-2">Welcome Back</h2>
                <p className="text-gray-500 dark:text-blue-100/90 text-sm">Sign in to access your dashboard</p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-bright-sun-400 dark:via-bright-sun-300 to-transparent opacity-50" />
            </div>

            <div className="space-y-5">
                <div className="group">
                    <label className="block text-gray-600 dark:text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative transition-all duration-300 group-hover:opacity-90">
                        <IconMail className="absolute left-4 top-3.5 text-gray-400 dark:text-blue-200 z-10" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="your.email@example.com"
                            disabled={loading}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-blue-200/30 focus:outline-none focus:border-bright-sun-500 dark:focus:border-bright-sun-300/50 focus:ring-2 focus:ring-bright-sun-200/20 dark:focus:ring-transparent transition-all"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-gray-600 dark:text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                    <div className="relative transition-all duration-300 group-hover:opacity-90">
                        <IconLock className="absolute left-4 top-3.5 text-gray-400 dark:text-blue-200 z-10" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="••••••••"
                            disabled={loading}
                            className="w-full pl-12 pr-12 py-3.5 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-blue-200/30 focus:outline-none focus:border-bright-sun-500 dark:focus:border-bright-sun-300/50 focus:ring-2 focus:ring-bright-sun-200/20 dark:focus:ring-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3.5 text-gray-400 dark:text-blue-200/50 hover:text-bright-sun-600 dark:hover:text-bright-sun-200 z-10 transition-colors"
                        >
                            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-4 pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="sr-only" />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${rememberMe ? "bg-gradient-to-br from-bright-sun-400 to-bright-sun-500 dark:from-bright-sun-200 dark:to-bright-sun-300 border-transparent shadow-[0_0_10px_rgba(250,204,21,0.4)]" : "bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/30 group-hover:border-gray-400 dark:group-hover:border-white/50"}`}>
                                {rememberMe && <IconCheck size={12} className="text-gray-900 dark:text-white font-bold" />}
                            </div>
                        </div>
                        <span className="text-gray-600 dark:text-blue-100/80 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <button type="button" onClick={onNavigateToForgot} className="text-bright-sun-600 dark:text-bright-sun-300 hover:text-bright-sun-700 dark:hover:text-bright-sun-200 transition-colors hover:underline underline-offset-4 font-medium">
                        Forgot Password?
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-lg tracking-wide bg-gradient-to-r from-bright-sun-400 via-bright-sun-500 to-bright-sun-400 dark:from-bright-sun-100 dark:via-bright-sun-200 dark:to-bright-sun-300 text-white shadow-xl shadow-bright-sun-300/30 hover:shadow-bright-sun-400/40 transform hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Signing In...</span>
                        </div>
                    ) : "Sign In"}
                </button>
            </div>

            <div className="mt-8 text-center pt-6 border-t border-gray-200 dark:border-white/10">
                <span className="text-gray-500 dark:text-blue-100/60 text-sm">New to Champion Academy? </span>
                <button onClick={onNavigateToRegister} className="text-bright-sun-600 dark:text-bright-sun-200 font-bold text-sm hover:underline underline-offset-4 ml-1 transition-colors">
                    Create Parent Account
                </button>
            </div>
        </div>
    );
};

export default Login;
