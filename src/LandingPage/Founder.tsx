import { useState, useEffect } from "react";
import { IconUserCheck, IconMail, IconPhone } from "@tabler/icons-react";

const Founder = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {/* Founder & CEO Section */}
            <div className="container mx-auto px-4 py-16">
                <div className={`bg-gray-800/30 border border-gray-700/50 rounded-2xl p-12 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-48 h-48 bg-gradient-to-br from-bright-sun-200 to-bright-sun-300 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-2xl">
                            <IconUserCheck size={80} className="text-gray-900" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-2">Noël Nkuranyabahizi</h2>
                            <div className="text-bright-sun-300 text-xl font-semibold mb-6">Founder & CEO</div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                Leading the vision of developing "Champions for Life" with a commitment to
                                professionalism, excellence, and community impact through sport and education.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <IconMail size={20} className="text-bright-sun-300" />
                                    <span>noel@thechampions.rw</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <IconPhone size={20} className="text-bright-sun-300" />
                                    <span>Kigali, Rwanda</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Founder;
