import { useState } from "react";
import { IconMail, IconArrowLeft, IconSend, IconLock, IconShieldCheck, IconEye, IconEyeOff } from "@tabler/icons-react";
import { API_BASE_URL } from "../../Services/Api";

interface ForgotPasswordProps {
    onNavigateToLogin: () => void;
    loading: boolean;
    error: string;
    setError: (err: string) => void;
    setSuccess: (msg: string) => void;
}

const ForgotPassword = ({
    onNavigateToLogin,
    loading: parentLoading,
    error,
    setError,
    setSuccess
}: ForgotPasswordProps) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);

    const loading = parentLoading || localLoading;

    const handleRequestOTP = async () => {
        if (!email) {
            setError("Please enter your email");
            return;
        }

        setLocalLoading(true);
        setError("");
        setSuccess("");

        console.log('📧 Requesting OTP:', {
            url: `${API_BASE_URL}/auth/forgot-password`,
            email: email,
            env_url: process.env.REACT_APP_API_URL
        });

        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Request OTP Error Response:', {
                    status: response.status,
                    body: errorText
                });

                let errorMessage = "Failed to send OTP.";
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }

                setError(errorMessage);
                return;
            }

            const data = await response.json();
            console.log('✅ OTP Request Success:', data);
            setSuccess("OTP has been sent to your email!");
            setStep(2);
        } catch (err: any) {
            setError("Network error. Please try again.");
            console.error("🚨 Request OTP Network Error:", err);
        } finally {
            setLocalLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmPassword) {
            setError("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLocalLoading(true);
        setError("");
        setSuccess("");

        console.log('🔑 Resetting Password:', {
            url: `${API_BASE_URL}/auth/reset-password`,
            email: email,
            env_url: process.env.REACT_APP_API_URL
        });

        try {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Reset Password Error Response:', {
                    status: response.status,
                    body: errorText
                });

                let errorMessage = "Failed to reset password.";
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }

                setError(errorMessage);
                return;
            }

            const data = await response.json();
            console.log('✅ Password Reset Success:', data);
            setSuccess("Password reset successful! Redirecting to login...");
            setTimeout(() => {
                onNavigateToLogin();
            }, 2000);
        } catch (err: any) {
            setError("Network error. Please try again.");
            console.error("🚨 Reset Password Network Error:", err);
        } finally {
            setLocalLoading(false);
        }
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
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg mb-6 animate-pulse-slow ${step === 1 ? "bg-gradient-to-br from-blue-400 to-cyan-500 shadow-blue-500/30" : "bg-gradient-to-br from-bright-sun-200 to-bright-sun-300 shadow-bright-sun-200/30"
                    }`}>
                    {step === 1 ? <IconSend className="text-white w-8 h-8 ml-1" /> : <IconShieldCheck className="text-white w-8 h-8" />}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {step === 1 ? "Forgot Password?" : "Reset Password"}
                </h2>
                <p className="text-blue-200/70 text-sm max-w-xs mx-auto">
                    {step === 1
                        ? "Enter your email address and we'll send you an OTP to reset your password."
                        : `We've sent a 6-digit code to ${email}. Enter it below along with your new password.`
                    }
                </p>
            </div>

            <div className="space-y-5">
                {step === 1 ? (
                    /* Step 1: Email Input */
                    <div className="group">
                        <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative transition-all duration-300 transform group-hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <IconMail className="absolute left-4 top-3.5 text-blue-200/70 z-10" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400/50 focus:bg-black/30 backdrop-blur-md transition-all shadow-inner"
                                placeholder="your.email@example.com"
                                disabled={loading}
                            />
                        </div>
                    </div>
                ) : (
                    /* Step 2: OTP and Password Inputs */
                    <>
                        <div className="group">
                            <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">6-Digit OTP</label>
                            <div className="relative transition-all duration-300 transform group-hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-bright-sun-200/20 to-bright-sun-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <IconShieldCheck className="absolute left-4 top-3.5 text-blue-200/70 z-10" size={20} />
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:outline-none focus:border-bright-sun-300/50 focus:bg-black/30 backdrop-blur-md transition-all shadow-inner tracking-[0.5em] font-bold text-center"
                                    placeholder="000000"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">New Password</label>
                            <div className="relative transition-all duration-300 transform group-hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-bright-sun-200/20 to-bright-sun-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <IconLock className="absolute left-4 top-3.5 text-blue-200/70 z-10" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:outline-none focus:border-bright-sun-300/50 focus:bg-black/30 backdrop-blur-md transition-all shadow-inner"
                                    placeholder="*************"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-blue-200/50 hover:text-bright-sun-200 z-10 transition-colors"
                                >
                                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Confirm Password</label>
                            <div className="relative transition-all duration-300 transform group-hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-bright-sun-200/20 to-bright-sun-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <IconLock className="absolute left-4 top-3.5 text-blue-200/70 z-10" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-200/30 focus:outline-none focus:border-bright-sun-300/50 focus:bg-black/30 backdrop-blur-md transition-all shadow-inner"
                                    placeholder="*************"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </>
                )}

                <button
                    onClick={step === 1 ? handleRequestOTP : handleResetPassword}
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:transform-none ${step === 1
                        ? "bg-gradient-to-r from-blue-500 to-cyan-600 shadow-blue-500/25 hover:shadow-blue-500/40"
                        : "bg-gradient-to-r from-bright-sun-100 via-bright-sun-200 to-bright-sun-300 shadow-bright-sun-300/25 hover:shadow-bright-sun-300/40"}`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{step === 1 ? "Sending OTP..." : "Resetting Password..."}</span>
                        </div>
                    ) : (
                        step === 1 ? "Send Reset OTP" : "Reset Password"
                    )}
                </button>

                {step === 2 && (
                    <button
                        onClick={() => {
                            setStep(1);
                            setError("");
                            setSuccess("");
                        }}
                        className="w-full py-2 text-sm text-blue-200/50 hover:text-white transition-colors"
                        disabled={loading}
                    >
                        Try a different email?
                    </button>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
