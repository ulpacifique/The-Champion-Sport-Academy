import { useState } from "react";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";

import { API_BASE_URL } from "../Services/Api";

const AuthPages = ({ onClose }: { onClose?: () => void }) => {
    const [currentPage, setCurrentPage] = useState<"login" | "register" | "forgot">("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLoginAPI = async (email: string, pass: string) => {
        setLoading(true);
        setError("");

        console.log('🔐 Attempting Login:', {
            url: `${API_BASE_URL}/auth/login`,
            email: email,
            env_url: import.meta.env.VITE_API_URL
        });

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password: pass })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Login Error Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText
                });

                let errorMessage = "Login failed.";
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
            console.log('✅ Login Success:', data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({
                id: data.id,
                email: data.email,
                role: data.role,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber
            }));

            setSuccess("Login successful! Redirecting...");

            setTimeout(() => {
                if (onClose) onClose();
                const dashboardMap: Record<string, string> = {
                    'ADMIN': '/admin/dashboard',
                    'MANAGER': '/manager/dashboard',
                    'COACH': '/coach/dashboard',
                    'PARENT': '/parent/dashboard'
                };
                window.location.href = dashboardMap[data.role] || '/';
            }, 1000);
        } catch (err: any) {
            setError("Network error. Please try again.");
            console.error("🚨 Login Network Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterAPI = async (formData: any) => {
        setLoading(true);
        setError("");

        console.log('📝 Attempting Registration:', {
            url: `${API_BASE_URL}/auth/register`,
            env_url: import.meta.env.VITE_API_URL
        });

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Registration Error Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText
                });

                let errorMessage = "Registration failed.";
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
            console.log('✅ Registration Success:', data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({
                id: data.id,
                email: data.email,
                role: data.role,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber
            }));

            setSuccess("Registration successful! Redirecting...");

            setTimeout(() => {
                if (onClose) onClose();
                window.location.href = data.role === 'PARENT' ? '/parent/dashboard' : '/';
            }, 1500);
        } catch (err: any) {
            setError("Network error. Please try again.");
            console.error("🚨 Registration Network Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`w-full transition-all duration-500 ease-out ${currentPage === "register" ? "max-w-2xl" : "max-w-md"}`}>
            {/* Card: solid background, no overlay */}
            <div className="relative bg-white dark:bg-cerulean-blue-900/95 border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[420px]">
                {/* Top accent */}
                <div className="h-1 bg-gradient-to-r from-bright-sun-400 via-bright-sun-300 to-bright-sun-400 dark:from-bright-sun-500 dark:via-bright-sun-400 dark:to-bright-sun-500" />

                <div className="p-8 sm:p-10 relative">
                    {/* Error/Success Messages */}
                    {(error || success) && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 shadow-lg ${error
                            ? "bg-red-500/15 dark:bg-red-500/20 border border-red-500/30 text-red-700 dark:text-red-200"
                            : "bg-green-500/15 dark:bg-green-500/20 border border-green-500/30 text-green-700 dark:text-green-200"
                            }`}>
                            <div className={`w-2 h-2 rounded-full shrink-0 ${error ? "bg-red-500" : "bg-green-500"}`} />
                            <span>{error || success}</span>
                        </div>
                    )}

                    {currentPage === "login" && (
                        <Login
                            onLoginSuccess={() => { }}
                            onNavigateToRegister={() => {
                                setCurrentPage("register");
                                setError("");
                                setSuccess("");
                            }}
                            onNavigateToForgot={() => {
                                setCurrentPage("forgot");
                                setError("");
                                setSuccess("");
                            }}
                            loading={loading}
                            error={error}
                            setError={setError}
                            handleLoginAPI={handleLoginAPI}
                        />
                    )}

                    {currentPage === "register" && (
                        <SignUp
                            onRegisterSuccess={() => { }}
                            onNavigateToLogin={() => {
                                setCurrentPage("login");
                                setError("");
                                setSuccess("");
                            }}
                            loading={loading}
                            error={error}
                            setError={setError}
                            handleRegisterAPI={handleRegisterAPI}
                        />
                    )}

                    {currentPage === "forgot" && (
                        <ForgotPassword
                            onNavigateToLogin={() => {
                                setCurrentPage("login");
                                setError("");
                                setSuccess("");
                            }}
                            loading={loading}
                            error={error}
                            setError={setError}
                            setSuccess={setSuccess}
                        />
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out; }
                .animate-slide-down { animation: slide-down 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default AuthPages;