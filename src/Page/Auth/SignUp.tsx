import { useState } from "react";
import {
    IconMail,
    IconLock,
    IconEye,
    IconEyeOff,
    IconCheck,
    IconUser,
    IconPhone,
    IconHome,
    IconArrowLeft,
    IconX,
    IconShieldCheck
} from "@tabler/icons-react";

interface SignUpProps {
    onRegisterSuccess: (data: any) => void;
    onNavigateToLogin: () => void;
    loading: boolean;
    error: string;
    setError: (err: string) => void;
    handleRegisterAPI: (data: any) => Promise<void>;
}

const SignUp = ({
    onRegisterSuccess,
    onNavigateToLogin,
    loading,
    error,
    setError,
    handleRegisterAPI
}: SignUpProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async () => {
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            setError("Please fill all required fields");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        await handleRegisterAPI({
            firstName,
            lastName,
            email,
            password,
            phoneNumber: phone,
            address,
            role: "PARENT"
        });
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

            <div className="text-center mb-8 mt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4 rotate-3 hover:rotate-6 transition-transform duration-500">
                    <IconUser className="text-white w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-blue-200/70 text-sm">Join the Champion Sport Academy family</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div className="group">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">First Name *</label>
                        <div className="relative">
                            <IconUser className="absolute left-4 top-3.5 text-blue-200/70" size={18} />
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-purple-400/50 focus:bg-black/30 backdrop-blur-sm transition-all outline-none"
                                placeholder="John"
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="group">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Last Name *</label>
                        <div className="relative">
                            <IconUser className="absolute left-4 top-3.5 text-blue-200/70" size={18} />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-purple-400/50 focus:bg-black/30 backdrop-blur-sm transition-all outline-none"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="group md:col-span-2">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Email Address *</label>
                        <div className="relative">
                            <IconMail className="absolute left-4 top-3.5 text-blue-200/70" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-purple-400/50 focus:bg-black/30 backdrop-blur-sm transition-all outline-none"
                                placeholder="parent@example.com"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="group">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Phone *</label>
                        <div className="relative">
                            <IconPhone className="absolute left-4 top-3.5 text-blue-200/70" size={18} />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-purple-400/50 focus:bg-black/30 backdrop-blur-sm transition-all outline-none"
                                placeholder="+250..."
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="group">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Address</label>
                        <div className="relative">
                            <IconHome className="absolute left-4 top-3.5 text-blue-200/70" size={18} />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-purple-400/50 focus:bg-black/30 backdrop-blur-sm transition-all outline-none"
                                placeholder="City, District"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="group">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Password *</label>
                        <div className="relative">
                            <IconLock className="absolute left-4 top-3.5 text-blue-200/70" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-10 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-purple-400/50 focus:bg-black/30 backdrop-blur-sm transition-all outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-white/50 hover:text-white transition-colors"
                            >
                                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="group">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Confirm *</label>
                        <div className="relative">
                            <IconShieldCheck className="absolute left-4 top-3.5 text-blue-200/70" size={18} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-11 pr-10 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-purple-400/50 focus:bg-black/30 backdrop-blur-sm transition-all outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3.5 text-white/50 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Password Match Status */}
                {confirmPassword && (
                    <div className={`text-xs flex items-center gap-2 ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                        {password === confirmPassword ? <IconCheck size={14} /> : <IconX size={14} />}
                        {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 mt-4 disabled:opacity-50 disabled:transform-none"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </div>
        </div>
    );
};

export default SignUp;
