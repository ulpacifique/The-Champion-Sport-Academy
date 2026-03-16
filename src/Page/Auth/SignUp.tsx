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

    const inputClass = "w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-bright-sun-500 dark:focus:border-bright-sun-300/50 focus:ring-2 focus:ring-bright-sun-200/20 dark:focus:ring-transparent transition-all";
    const labelClass = "block text-gray-600 dark:text-blue-100 text-xs font-bold uppercase tracking-wider mb-2";
    const iconClass = "absolute left-4 top-3.5 text-gray-400 dark:text-blue-200/70";

    return (
        <div className="animate-fade-in-up">
            <button
                onClick={onNavigateToLogin}
                className="text-gray-500 dark:text-blue-200/60 hover:text-gray-700 dark:hover:text-white flex items-center gap-2 transition-all duration-300 group mb-4"
            >
                <div className="bg-gray-100 dark:bg-white/5 p-2 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-white/10">
                    <IconArrowLeft size={16} />
                </div>
                <span className="text-sm font-medium">Back to Login</span>
            </button>

            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-bright-sun-400 to-bright-sun-500 dark:from-bright-sun-200 dark:to-bright-sun-300 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-bright-sun-200/30 mb-4 rotate-3 hover:rotate-6 transition-transform duration-500">
                    <IconUser className="text-white w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
                <p className="text-gray-500 dark:text-blue-200/70 text-sm">Join the Champion Sport Academy family</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                        <label className={labelClass}>First Name *</label>
                        <div className="relative">
                            <IconUser className={iconClass} size={18} />
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} placeholder="John" />
                        </div>
                    </div>
                    <div className="group">
                        <label className={labelClass}>Last Name *</label>
                        <div className="relative">
                            <IconUser className={iconClass} size={18} />
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} placeholder="Doe" />
                        </div>
                    </div>
                    <div className="group md:col-span-2">
                        <label className={labelClass}>Email Address *</label>
                        <div className="relative">
                            <IconMail className={iconClass} size={18} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="parent@example.com" />
                        </div>
                    </div>
                    <div className="group">
                        <label className={labelClass}>Phone *</label>
                        <div className="relative">
                            <IconPhone className={iconClass} size={18} />
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+250..." />
                        </div>
                    </div>
                    <div className="group">
                        <label className={labelClass}>Address</label>
                        <div className="relative">
                            <IconHome className={iconClass} size={18} />
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} placeholder="City, District" />
                        </div>
                    </div>
                    <div className="group">
                        <label className={labelClass}>Password *</label>
                        <div className="relative">
                            <IconLock className={iconClass} size={18} />
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 dark:text-white/50 hover:text-gray-600 dark:hover:text-white transition-colors">
                                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="group">
                        <label className={labelClass}>Confirm *</label>
                        <div className="relative">
                            <IconShieldCheck className={iconClass} size={18} />
                            <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400 dark:text-white/50 hover:text-gray-600 dark:hover:text-white transition-colors">
                                {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                {confirmPassword && (
                    <div className={`text-xs flex items-center gap-2 ${password === confirmPassword ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {password === confirmPassword ? <IconCheck size={14} /> : <IconX size={14} />}
                        {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 dark:from-bright-sun-200 dark:to-bright-sun-300 text-white shadow-lg shadow-bright-sun-200/25 hover:shadow-bright-sun-200/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-4 disabled:opacity-50 disabled:transform-none"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </div>
        </div>
    );
};

export default SignUp;
