// src/Parent/HelpSupport.tsx
import { useState } from "react";
import { 
    IconHelp,
    IconMail,
    IconPhone,
    IconMessage,
    IconExternalLink,
    IconSearch,
    IconChevronRight,
    IconClock
} from "@tabler/icons-react";

const HelpSupport = () => {
    const [activeTab, setActiveTab] = useState("faq");
    const [searchQuery, setSearchQuery] = useState("");

    const faqCategories = [
        { id: "general", name: "General", icon: "📚" },
        { id: "progress", name: "Progress Tracking", icon: "📊" },
        { id: "payment", name: "Payments", icon: "💰" },
        { id: "classes", name: "Classes & Schedules", icon: "📅" },
        { id: "technical", name: "Technical Issues", icon: "🔧" },
    ];

    const faqs = [
        {
            id: 1,
            category: "general",
            question: "How do I register my child?",
            answer: "Go to the 'Manage Children' section and click 'Register New Child'. Fill in the required information and submit the form."
        },
        {
            id: 2,
            category: "general",
            question: "What sports do you offer?",
            answer: "We currently offer Karate and Gymnastics training for children aged 4-18."
        },
        {
            id: 3,
            category: "progress",
            question: "How often is progress updated?",
            answer: "Coaches update progress weekly. You can view real-time updates in the Progress Tracking section."
        },
        {
            id: 4,
            category: "progress",
            question: "Can I see my child's achievements?",
            answer: "Yes, all achievements and milestones are visible in the Progress Tracking section under 'Achievement Milestones'."
        },
        {
            id: 5,
            category: "payment",
            question: "What payment methods do you accept?",
            answer: "We accept mobile money, bank transfers, and cash payments at our academy office."
        },
        {
            id: 6,
            category: "classes",
            question: "How do I check class schedules?",
            answer: "Class schedules are available in the Dashboard and can also be provided by your child's coach."
        },
        {
            id: 7,
            category: "technical",
            question: "I can't access my account",
            answer: "Try resetting your password. If the issue persists, contact our technical support team."
        },
    ];

    const supportContacts = [
        {
            id: 1,
            type: "Administrator",
            name: "Admin Office",
            email: "admin@championsports.com",
            phone: "+250 788 123 456",
            hours: "Mon-Fri, 8AM-5PM",
            description: "For account and administrative issues"
        },
        {
            id: 2,
            type: "Technical Support",
            name: "IT Department",
            email: "support@championsports.com",
            phone: "+250 788 654 321",
            hours: "24/7",
            description: "For technical issues with the portal"
        },
        {
            id: 3,
            type: "Coaching",
            name: "Head Coach",
            email: "coach@championsports.com",
            phone: "+250 788 987 654",
            hours: "Mon-Sat, 7AM-7PM",
            description: "For training-related questions"
        },
    ];

    const filteredFaqs = searchQuery 
        ? faqs.filter(faq => 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : faqs.filter(faq => activeTab === "faq" || faq.category === activeTab);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-white">Help & Support</h2>
                <p className="text-gray-400">Get help and contact support</p>
            </div>

            {/* Search Bar */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="relative">
                    <IconSearch className="absolute left-4 top-3.5 text-gray-400" size={24} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for help articles..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400 text-lg"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - FAQ Categories */}
                <div className="lg:col-span-2 space-y-8">
                    {/* FAQ Categories */}
                    {!searchQuery && (
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-white mb-6">FAQ Categories</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setActiveTab("faq")}
                                    className={`p-4 rounded-xl border transition-all ${activeTab === "faq" 
                                        ? 'bg-bright-sun-400/20 border-bright-sun-400/30' 
                                        : 'bg-gray-700/50 border-gray-600/50 hover:border-bright-sun-400/30'}`}
                                >
                                    <div className="text-2xl mb-2">📚</div>
                                    <div className="text-white font-medium">All FAQs</div>
                                </button>
                                {faqCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveTab(category.id)}
                                        className={`p-4 rounded-xl border transition-all ${activeTab === category.id 
                                            ? 'bg-bright-sun-400/20 border-bright-sun-400/30' 
                                            : 'bg-gray-700/50 border-gray-600/50 hover:border-bright-sun-400/30'}`}
                                    >
                                        <div className="text-2xl mb-2">{category.icon}</div>
                                        <div className="text-white font-medium">{category.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ List */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-6">
                            {searchQuery ? "Search Results" : "Frequently Asked Questions"}
                        </h3>
                        
                        <div className="space-y-4">
                            {filteredFaqs.length === 0 ? (
                                <div className="text-center py-8">
                                    <IconHelp className="mx-auto text-gray-500" size={48} />
                                    <p className="text-gray-400 mt-4">No results found for "{searchQuery}"</p>
                                    <p className="text-gray-500 mt-2">Try different keywords or contact support</p>
                                </div>
                            ) : (
                                filteredFaqs.map((faq) => (
                                    <div key={faq.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-white font-bold">{faq.question}</div>
                                                <div className="text-gray-400 text-sm mt-2">{faq.answer}</div>
                                            </div>
                                            <IconChevronRight className="text-gray-500 flex-shrink-0" size={20} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Contact Support */}
                <div className="space-y-8">
                    {/* Contact Support */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <IconMessage className="text-bright-sun-400" size={24} />
                            <h3 className="text-xl font-semibold text-white">Contact Support</h3>
                        </div>

                        <div className="space-y-6">
                            {supportContacts.map((contact) => (
                                <div key={contact.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-bright-sun-400 font-bold text-sm">{contact.type}</div>
                                            <div className="text-white font-bold text-lg">{contact.name}</div>
                                        </div>
                                        <IconExternalLink className="text-gray-500" size={20} />
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <IconMail size={16} className="mr-2" />
                                            <a href={`mailto:${contact.email}`} className="hover:text-bright-sun-400">
                                                {contact.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <IconPhone size={16} className="mr-2" />
                                            <a href={`tel:${contact.phone}`} className="hover:text-bright-sun-400">
                                                {contact.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <IconClock size={16} className="mr-2" />
                                            <span>{contact.hours}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-400 text-sm mt-3">{contact.description}</p>
                                    
                                    <button className="w-full mt-4 py-2 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all">
                                        Contact Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-r from-bright-sun-400/10 to-cerulean-blue-500/10 border border-bright-sun-400/20 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:border-bright-sun-400/30 transition-colors">
                                <div className="text-white font-medium">Send Message to Administrator</div>
                                <div className="text-gray-400 text-sm">Get help with account issues</div>
                            </button>
                            <button className="w-full text-left p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:border-bright-sun-400/30 transition-colors">
                                <div className="text-white font-medium">View Tutorial Videos</div>
                                <div className="text-gray-400 text-sm">Learn how to use the portal</div>
                            </button>
                            <button className="w-full text-left p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:border-bright-sun-400/30 transition-colors">
                                <div className="text-white font-medium">Download User Guide</div>
                                <div className="text-gray-400 text-sm">Complete guide in PDF format</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* How-To Guides */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">How-To Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-2xl mb-3">📝</div>
                        <h4 className="text-white font-bold mb-2">Register a Child</h4>
                        <p className="text-gray-400 text-sm">Step-by-step guide to registering your child for sports training</p>
                        <button className="text-bright-sun-400 hover:text-bright-sun-300 text-sm font-medium mt-3">
                            View Guide →
                        </button>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-2xl mb-3">📊</div>
                        <h4 className="text-white font-bold mb-2">Track Progress</h4>
                        <p className="text-gray-400 text-sm">Learn how to monitor your child's development and achievements</p>
                        <button className="text-bright-sun-400 hover:text-bright-sun-300 text-sm font-medium mt-3">
                            View Guide →
                        </button>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-2xl mb-3">💬</div>
                        <h4 className="text-white font-bold mb-2">Communicate with Coaches</h4>
                        <p className="text-gray-400 text-sm">How to effectively communicate with your child's instructors</p>
                        <button className="text-bright-sun-400 hover:text-bright-sun-300 text-sm font-medium mt-3">
                            View Guide →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;