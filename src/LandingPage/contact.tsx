// src/Pages/Contact.tsx
import { Button } from "@mantine/core";
import {
    IconMail,
    IconPhone,
    IconBrandWhatsapp,
    IconMapPin,
    IconClock,
    IconChevronRight,
    IconUser,
    IconMessage,
    IconSend
} from "@tabler/icons-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert('Thank you for your message! We will contact you soon.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cerulean-blue-950 to-cerulean-blue-900 text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cerulean-blue-900/50 to-cerulean-blue-800/30 z-0"></div>
                <div
                    className="absolute inset-0 opacity-5 z-0"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/athletes/Champions.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <span className="inline-flex items-center px-4 py-2 bg-bright-sun-400/20 text-bright-sun-400 rounded-full text-sm font-medium mb-4">
                        Get in Touch
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-sun-400 to-bright-sun-300">The Champions</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Have questions about our programmes? Ready to start your champion journey?
                        Our team is here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-white">Get in Touch</h2>
                                <p className="text-gray-300 mb-8">
                                    Reach out to us through any of these channels. We're committed to
                                    responding to all inquiries within 24 hours.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-4">
                                {/* Email Contact */}
                                <a
                                    href="mailto:niyonoel@gmail.com"
                                    className="group flex items-center gap-4 rounded-xl bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 p-6 hover:bg-cerulean-blue-700/30 hover:border-bright-sun-400/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="p-3 bg-gradient-to-br from-bright-sun-400 to-bright-sun-500 rounded-lg group-hover:shadow-lg group-hover:shadow-bright-sun-400/20 transition-all">
                                        <IconMail className="h-6 w-6 text-gray-900" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-gray-400 text-sm mb-1">Email Us</div>
                                        <div className="text-white font-semibold text-lg">niyonoel@gmail.com</div>
                                    </div>
                                    <IconChevronRight className="h-5 w-5 text-bright-sun-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                {/* Phone Contact */}
                                <a
                                    href="tel:+250788876966"
                                    className="group flex items-center gap-4 rounded-xl bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 p-6 hover:bg-cerulean-blue-700/30 hover:border-bright-sun-400/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="p-3 bg-gradient-to-br from-bright-sun-400 to-bright-sun-500 rounded-lg group-hover:shadow-lg group-hover:shadow-bright-sun-400/20 transition-all">
                                        <IconPhone className="h-6 w-6 text-gray-900" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-gray-400 text-sm mb-1">Call Us</div>
                                        <div className="text-white font-semibold text-lg">+250 788 876 966</div>
                                    </div>
                                    <IconChevronRight className="h-5 w-5 text-bright-sun-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                {/* WhatsApp Contact */}
                                <a
                                    href="https://wa.me/250788876966"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 rounded-xl bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 p-6 hover:bg-cerulean-blue-700/30 hover:border-bright-sun-400/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="p-3 bg-gradient-to-br from-bright-sun-400 to-bright-sun-500 rounded-lg group-hover:shadow-lg group-hover:shadow-bright-sun-400/20 transition-all">
                                        <IconBrandWhatsapp className="h-6 w-6 text-gray-900" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-gray-400 text-sm mb-1">WhatsApp</div>
                                        <div className="text-white font-semibold text-lg">+250 788 876 966</div>
                                    </div>
                                    <IconChevronRight className="h-5 w-5 text-bright-sun-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-gradient-to-br from-cerulean-blue-800/30 to-cerulean-blue-900/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold mb-4 text-white">Visit Our Academy</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-300">
                                        <IconMapPin className="h-5 w-5 mr-3 text-bright-sun-400" />
                                        <span>The Champions Sports Academy, Kigali, Rwanda</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <IconClock className="h-5 w-5 mr-3 text-bright-sun-400" />
                                        <span>Saturday - Sunday: 10:00 AM - 5:00 PM (Home Classes available Mon-Fri)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gradient-to-br from-cerulean-blue-800/30 to-cerulean-blue-900/30 border border-cerulean-blue-700/50 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold mb-6 text-white">Send Us a Message</h2>
                            <p className="text-gray-300 mb-8">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <IconUser className="h-4 w-4 inline mr-2 text-bright-sun-400" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400 focus:ring-1 focus:ring-bright-sun-400"
                                            placeholder="Kayitare Prince"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <IconMail className="h-4 w-4 inline mr-2 text-bright-sun-400" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400 focus:ring-1 focus:ring-bright-sun-400"
                                            placeholder="prince@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <IconPhone className="h-4 w-4 inline mr-2 text-bright-sun-400" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400 focus:ring-1 focus:ring-bright-sun-400"
                                        placeholder="+250 788 876 966"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <IconMessage className="h-4 w-4 inline mr-2 text-bright-sun-400" />
                                        What Programme Are You Interested In?
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white focus:outline-none focus:border-bright-sun-400 focus:ring-1 focus:ring-bright-sun-400"
                                    >
                                        <option value="">Select a programme</option>
                                        <option value="gymnastics">Gymnastics</option>
                                        <option value="karate">Karate</option>
                                        <option value="multi-sport">Multi-Sport Activities</option>
                                        <option value="coaching">Coaching Education</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <IconMessage className="h-4 w-4 inline mr-2 text-bright-sun-400" />
                                        Your Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 bg-cerulean-blue-800/50 border border-cerulean-blue-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400 focus:ring-1 focus:ring-bright-sun-400"
                                        placeholder="Tell us about your goals and questions..."
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-semibold hover:from-bright-sun-500 hover:to-bright-sun-600 transition-all h-12 text-lg"
                                >
                                    <IconSend className="h-5 w-5 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold mb-3 text-white">What age groups do you accept?</h3>
                                <p className="text-gray-300">
                                    We accept children and youth aged 3-17 years. We have age-appropriate programmes for different developmental stages.
                                </p>
                            </div>
                            <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold mb-3 text-white">Do you offer trial classes?</h3>
                                <p className="text-gray-300">
                                    Yes! We offer one free trial class for all new students. Contact us to schedule your trial session.
                                </p>
                            </div>
                            <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold mb-3 text-white">What are your operating hours?</h3>
                                <p className="text-gray-300">
                                    We're open Saturday and Sunday from 10:00 AM to 5:00 PM for regular classes. We also offer Home Classes from Monday to Friday by appointment.
                                </p>
                            </div>
                            <div className="bg-cerulean-blue-800/30 border border-cerulean-blue-700/50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold mb-3 text-white">How do I register my child?</h3>
                                <p className="text-gray-300">
                                    You can register online through our website, visit us in person, or contact us via phone/email to start the registration process.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-cerulean-blue-800/30 to-cerulean-blue-900/30 border-t border-b border-cerulean-blue-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">Start Your Champion Journey Today</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Join hundreds of families who have chosen The Champions Sports Academy for values-driven sport education and holistic development.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            component="a"
                            href="/register"
                            className="px-8 py-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-semibold hover:from-bright-sun-500 hover:to-bright-sun-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                        >
                            Register Now
                        </Button>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;