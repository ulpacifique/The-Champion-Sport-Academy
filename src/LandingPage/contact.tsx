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
        <div className="min-h-screen bg-white dark:bg-cerulean-blue-900 text-cerulean-blue-900 dark:text-white transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-gray-100 dark:bg-cerulean-blue-950">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}athletes/competion.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Softer scrim so the photo stays visible; text stays readable */}
                <div
                    className="absolute inset-0 z-[1] bg-gradient-to-b from-white/55 via-white/35 to-gray-100/75 dark:from-cerulean-blue-950/65 dark:via-cerulean-blue-900/50 dark:to-cerulean-blue-950/80"
                    aria-hidden
                />

                <div className="relative z-10 max-w-7xl mx-auto text-center drop-shadow-sm">
                    <span className="inline-flex items-center px-4 py-2 bg-bright-sun-600/10 dark:bg-bright-sun-300/20 text-bright-sun-600 dark:text-bright-sun-300 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                        Get in Touch
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">
                        Contact <span className="text-bright-sun-600 dark:text-white">The Champions</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 font-medium">
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
                                <h2 className="text-3xl font-black mb-6 text-cerulean-blue-900 dark:text-white uppercase italic underline underline-offset-8 decoration-bright-sun-600/30 dark:decoration-bright-sun-300/30">Get in Touch</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-8 font-medium leading-relaxed">
                                    Reach out to us through any of these channels. We're committed to
                                    responding to all inquiries within 24 hours.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-4">
                                {/* Email Contact */}
                                <a
                                    href="mailto:niyonoel@gmail.com"
                                    className="group flex items-center gap-4 rounded-xl bg-gray-50 dark:bg-cerulean-blue-800/30 border border-gray-100 dark:border-cerulean-blue-700/50 p-6 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all duration-300 hover:scale-[1.02] shadow-sm dark:shadow-none"
                                >
                                    <div className="p-3 bg-bright-sun-600 dark:bg-gradient-to-br dark:from-bright-sun-100 dark:to-bright-sun-300 rounded-lg group-hover:shadow-lg group-hover:shadow-bright-sun-600/20 dark:group-hover:shadow-bright-sun-200/20 transition-all">
                                        <IconMail className="h-6 w-6 text-white dark:text-gray-900" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Email Us</div>
                                        <div className="text-cerulean-blue-900 dark:text-white font-bold text-lg">niyonoel@gmail.com</div>
                                    </div>
                                    <IconChevronRight className="h-5 w-5 text-bright-sun-600 dark:text-bright-sun-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                {/* Phone Contact */}
                                <a
                                    href="tel:+250788876966"
                                    className="group flex items-center gap-4 rounded-xl bg-gray-50 dark:bg-cerulean-blue-800/30 border border-gray-100 dark:border-cerulean-blue-700/50 p-6 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all duration-300 hover:scale-[1.02] shadow-sm dark:shadow-none"
                                >
                                    <div className="p-3 bg-bright-sun-600 dark:bg-gradient-to-br dark:from-bright-sun-100 dark:to-bright-sun-300 rounded-lg group-hover:shadow-lg group-hover:shadow-bright-sun-600/20 dark:group-hover:shadow-bright-sun-200/20 transition-all">
                                        <IconPhone className="h-6 w-6 text-white dark:text-gray-900" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Call Us</div>
                                        <div className="text-cerulean-blue-900 dark:text-white font-bold text-lg">+250 788 876 966</div>
                                    </div>
                                    <IconChevronRight className="h-5 w-5 text-bright-sun-600 dark:text-bright-sun-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                {/* WhatsApp Contact */}
                                <a
                                    href="https://wa.me/250788876966"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 rounded-xl bg-gray-50 dark:bg-cerulean-blue-800/30 border border-gray-100 dark:border-cerulean-blue-700/50 p-6 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all duration-300 hover:scale-[1.02] shadow-sm dark:shadow-none"
                                >
                                    <div className="p-3 bg-bright-sun-600 dark:bg-gradient-to-br dark:from-bright-sun-100 dark:to-bright-sun-300 rounded-lg group-hover:shadow-lg group-hover:shadow-bright-sun-600/20 dark:group-hover:shadow-bright-sun-200/20 transition-all">
                                        <IconBrandWhatsapp className="h-6 w-6 text-white dark:text-gray-900" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest mb-1">WhatsApp</div>
                                        <div className="text-cerulean-blue-900 dark:text-white font-bold text-lg">+250 788 876 966</div>
                                    </div>
                                    <IconChevronRight className="h-5 w-5 text-bright-sun-600 dark:text-bright-sun-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-xl font-black mb-4 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">Visit Our Academy</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-600 dark:text-gray-300 font-bold">
                                        <IconMapPin className="h-5 w-5 mr-3 text-bright-sun-600 dark:text-bright-sun-300" />
                                        <span>The Champions Sports Academy, Kigali, Rwanda</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300 font-bold">
                                        <IconClock className="h-5 w-5 mr-3 text-bright-sun-600 dark:text-bright-sun-300" />
                                        <span>Saturday - Sunday: 10:00 AM - 5:00 PM<br /><span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">(Home Classes available Mon-Fri)</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 dark:bg-cerulean-blue-900/40 border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none text-left">
                            <h2 className="text-3xl font-black mb-6 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">Send Us a Message</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 font-medium">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
                                            <IconUser className="h-3.5 w-3.5 inline mr-2 text-bright-sun-600 dark:text-bright-sun-300" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-white dark:bg-cerulean-blue-800/50 border border-gray-200 dark:border-cerulean-blue-700 rounded-lg text-cerulean-blue-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-600 dark:focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-600 dark:focus:ring-bright-sun-300 font-bold transition-all"
                                            placeholder="Kayitare Prince"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
                                            <IconMail className="h-3.5 w-3.5 inline mr-2 text-bright-sun-600 dark:text-bright-sun-300" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 bg-white dark:bg-cerulean-blue-800/50 border border-gray-200 dark:border-cerulean-blue-700 rounded-lg text-cerulean-blue-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-600 dark:focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-600 dark:focus:ring-bright-sun-300 font-bold transition-all"
                                            placeholder="prince@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
                                        <IconPhone className="h-3.5 w-3.5 inline mr-2 text-bright-sun-600 dark:text-bright-sun-300" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 bg-white dark:bg-cerulean-blue-800/50 border border-gray-200 dark:border-cerulean-blue-700 rounded-lg text-cerulean-blue-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-600 dark:focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-600 dark:focus:ring-bright-sun-300 font-bold transition-all"
                                        placeholder="+250 788 876 966"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
                                        <IconMessage className="h-3.5 w-3.5 inline mr-2 text-bright-sun-600 dark:text-bright-sun-300" />
                                        What Programme Are You Interested In?
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 bg-white dark:bg-cerulean-blue-800/50 border border-gray-200 dark:border-cerulean-blue-700 rounded-lg text-cerulean-blue-900 dark:text-white focus:outline-none focus:border-bright-sun-600 dark:focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-600 dark:focus:ring-bright-sun-300 font-bold transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-white dark:bg-cerulean-blue-900 text-gray-900 dark:text-white">Select a programme</option>
                                        <option value="gymnastics" className="bg-white dark:bg-cerulean-blue-900 text-gray-900 dark:text-white">Gymnastics</option>
                                        <option value="karate" className="bg-white dark:bg-cerulean-blue-900 text-gray-900 dark:text-white">Karate</option>
                                        <option value="multi-sport" className="bg-white dark:bg-cerulean-blue-900 text-gray-900 dark:text-white">Multi-Sport Activities</option>
                                        <option value="coaching" className="bg-white dark:bg-cerulean-blue-900 text-gray-900 dark:text-white">Coaching Education</option>
                                        <option value="other" className="bg-white dark:bg-cerulean-blue-900 text-gray-900 dark:text-white">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
                                        <IconMessage className="h-3.5 w-3.5 inline mr-2 text-bright-sun-600 dark:text-bright-sun-300" />
                                        Your Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 bg-white dark:bg-cerulean-blue-800/50 border border-gray-200 dark:border-cerulean-blue-700 rounded-lg text-cerulean-blue-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-600 dark:focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-600 dark:focus:ring-bright-sun-300 font-bold transition-all"
                                        placeholder="Tell us about your goals and questions..."
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-bright-sun-600 dark:bg-gradient-to-r dark:from-bright-sun-200 dark:to-bright-sun-300 text-white dark:text-gray-900 font-black hover:bg-bright-sun-700 dark:hover:from-bright-sun-100 dark:hover:to-bright-sun-200 transition-all h-14 text-xl uppercase italic tracking-widest shadow-xl shadow-bright-sun-600/20 dark:shadow-bright-sun-200/20"
                                >
                                    <IconSend className="h-6 w-6 mr-3" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-black mb-12 text-center text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter decoration-bright-sun-600 dark:decoration-bright-sun-300 underline underline-offset-8">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { q: "What age groups do you accept?", a: "We accept children and youth aged 3-17 years. We have age-appropriate programmes for different developmental stages." },
                                { q: "Do you offer trial classes?", a: "Yes! We offer one free trial class for all new students. Contact us to schedule your trial session." },
                                { q: "What are your operating hours?", a: "We're open Saturday and Sunday from 10:00 AM to 5:00 PM for regular classes. We also offer Home Classes from Monday to Friday by appointment." },
                                { q: "How do I register my child?", a: "You can register online through our website, visit us in person, or contact us via phone/email to start the registration process." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-cerulean-blue-800/30 border border-gray-100 dark:border-cerulean-blue-700/50 rounded-2xl p-8 hover:border-bright-sun-600/30 dark:hover:border-bright-sun-300/30 transition-all shadow-sm dark:shadow-none group text-left">
                                    <h3 className="text-xl font-black mb-4 text-cerulean-blue-900 dark:text-white group-hover:text-bright-sun-600 dark:group-hover:text-bright-sun-300 transition-colors uppercase italic tracking-tight">{faq.q}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 md:px-8 lg:px-16 bg-gray-50/50 dark:bg-cerulean-blue-900/10 border-t border-b border-gray-100 dark:border-cerulean-blue-800 transition-colors">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-cerulean-blue-900 dark:text-white uppercase italic tracking-tighter">Start Your Champion Journey Today</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto font-medium">
                        Join hundreds of families who have chosen The Champions Sports Academy for values-driven sport education and holistic development.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            component="a"
                            href="/register"
                            className="px-12 py-5 bg-bright-sun-600 dark:bg-gradient-to-r dark:from-bright-sun-200 dark:to-bright-sun-300 text-white dark:text-gray-900 font-black hover:bg-bright-sun-700 dark:hover:from-bright-sun-100 dark:hover:to-bright-sun-200 transition-all duration-300 shadow-xl shadow-bright-sun-600/20 dark:shadow-bright-sun-200/20 text-xl uppercase tracking-widest italic h-16"
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
