import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";

const API_BASE_URL = "http://localhost:8081/api";

const AuthPages = ({ onClose }: { onClose?: () => void }) => {
    const [currentPage, setCurrentPage] = useState<"login" | "register" | "forgot">("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLoginAPI = async (email: string, pass: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password: pass })
            });

            const data = await response.json();

            if (response.ok) {
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
            } else {
                setError(data.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterAPI = async (formData: any) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
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
            } else {
                setError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
            {/* Main Card */}
            <div className={`relative w-full transition-all duration-500 ease-out my-8 ${currentPage === "register" ? "max-w-2xl" : "max-w-md"
                }`}>
                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute -top-4 -right-4 z-50 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-90 transition-all border-2 border-white/20"
                    >
                        <IconX size={20} />
                    </button>
                )}

                {/* Glass Card */}
                <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[500px]">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-500"></div>
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl"></div>

                    {/* Content Area */}
                    <div className="p-8 relative z-10">
                        {/* Error/Success Messages */}
                        {(error || success) && (
                            <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 animate-slide-down shadow-lg ${error
                                ? "bg-red-500/20 border border-red-500/30 text-red-200"
                                : "bg-green-500/20 border border-green-500/30 text-green-200"
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${error ? "bg-red-400" : "bg-green-400"}`}></div>
                                {error || success}
                            </div>
                        )}

                        {/* Page Content */}
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
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
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
                .animate-spin-slow { animation: spin 3s linear infinite; }
                .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            `}</style>
        </div>
    );
};

export default AuthPages;