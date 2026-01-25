const Footer = () => {
    return (
        <footer className="mt-auto py-10 bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Main Sections - Responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
                    {/* Academy Info */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="text-white text-xl md:text-2xl font-bold mb-4">
                            Champion Sports Academy
                        </div>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            Multisport organization dedicated to promoting health and well-being 
                            through sports. Values: Discipline, Friendship, Teamwork, Excellence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Quick Links</h3>
                        <ul className="space-y-2 md:space-y-3">
                            {['Home', 'About Us', 'Programs', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a 
                                        href="#" 
                                        className="text-gray-400 hover:text-bright-sun-400 text-sm md:text-base transition-colors duration-200 block py-1"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sports */}
                    <div>
                        <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Sports</h3>
                        <ul className="space-y-2 md:space-y-3">
                            {['Gymnastics', 'Karate', 'Traditional Dance', 'Badminton'].map((sport) => (
                                <li key={sport}>
                                    <a 
                                        href="#" 
                                        className="text-gray-400 hover:text-bright-sun-400 text-sm md:text-base transition-colors duration-200 block py-1"
                                    >
                                        {sport}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Find Us</h3>
                        <ul className="space-y-3 md:space-y-4">
                            <li className="flex items-start space-x-3">
                                <span className="text-bright-sun-400 mt-1">📞</span>
                                <a 
                                    href="tel:+250788876966" 
                                    className="text-gray-400 hover:text-bright-sun-400 text-sm md:text-base transition-colors duration-200"
                                >
                                    +250 788 876 966
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="text-bright-sun-400 mt-1">📍</span>
                                <a 
                                    href="https://maps.app.goo.gl/iJ1AQj4vjfrzizo28" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-bright-sun-400 text-sm md:text-base transition-colors duration-200"
                                >
                                    Des Angel Kigali, Rwanda
                                </a>
                            </li>
                        </ul>
                        
                        {/* Social Media */}
                        <div className="mt-6 md:mt-8">
                            <h4 className="text-white text-sm md:text-base font-semibold mb-3 md:mb-4">Follow Us</h4>
                            <div className="flex flex-wrap gap-3 md:gap-4">
                                {[
                                    { name: 'Instagram', href: 'https://www.instagram.com/thechampionssportsacademy/?hl=en', color: 'hover:text-pink-500' },
                                    { name: 'YouTube', href: 'https://youtu.be/S_3GBmCgmxU?si=yJe_farJ83_eNNVU', color: 'hover:text-red-500' },
                                    { name: 'Threads', href: 'https://www.threads.com/@thechampionssportsacademy', color: 'hover:text-gray-300' },
                                    { name: 'Facebook', href: 'https://web.facebook.com/nkuranyabahizi', color: 'hover:text-blue-600' },
                                    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/noel-nkuranyabahizi-a89ab5176/', color: 'hover:text-blue-400' },
                                ].map((social) => (
                                    <a 
                                        key={social.name}
                                        href={social.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`text-gray-400 ${social.color} text-sm md:text-base transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-800/50`}
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright & Developer */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-500 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} Champion Sports Academy. All rights reserved.
                        </div>
                        
                        <div className="text-gray-500 text-sm text-center md:text-left">
                            Designed & Developed By{' '}
                            <span className="text-bright-sun-400 font-medium">eng.Pacifique</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;