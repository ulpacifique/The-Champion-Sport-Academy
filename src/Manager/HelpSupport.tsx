// src/Manager/HelpSupport.tsx
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
        { id: "attendance", name: "Attendance", icon: "📊" },
        { id: "salary", name: "Salary Management", icon: "💰" },
        { id: "children", name: "Child Management", icon: "👶" },
        { id: "coaches", name: "Coach Management", icon: "👨‍🏫" },
    ];

    const faqs = [
        {
            id: 1,
            category: "attendance",
            question: "How do I mark attendance for coaches?",
            answer: "Go to the Attendance section, select 'Coaches' tab, and mark present/absent for each coach. Save when done."
        },
        {
            id: 2,
            category: "attendance",
            question: "How is attendance calculated for salary?",
            answer: "Attendance below 80% triggers deductions, while above 90% qualifies for bonuses. See Salary Management for details."
        },
        {
            id: 3,
            category: "salary",
            question: "How do I update a coach's salary?",
            answer: "In Salary Management, click 'Edit Salary' next to the coach, enter new amount, and save."
        },
        {
            id: 4,
            category: "children",
            question: "How do I approve parent registrations?",
            answer: "Go to Child Management, review pending registrations, and click Approve or Reject."
        },
        {
            id: 5,
            category: "coaches",
            question: "How do I add a new coach?",
            answer: "Go to Coach Management, click 'Add Coach', fill in details, and save."
        },
        {
            id: 6,
            category: "general",
            question: "How do I send messages to parents?",
            answer: "Go to Messages, select Parents tab, choose recipient or use Broadcast Message."
        },
    ];

    const supportContacts = [
        {
            id: 1,
            type: "Administrator",
            name: "System Administrator",
            email: "admin@championsports.com",
            phone: "+250 788 111 111",
            hours: "Mon-Fri, 8AM-6PM",
            description: "For system and account issues"
        },
        {
            id: 2,
            type: "Technical Support",
            name: "IT Support Team",
            email: "support@championsports.com",
            phone: "+250 788 222 222",
            hours: "24/7",
            description: "For technical issues with the portal"
        },
        {
            id: 3,
            type: "Finance",
            name: "Finance Department",
            email: "finance@championsports.com",
            phone: "+250 788 333 333",
            hours: "Mon-Fri, 9AM-5PM",
            description: "For salary and payment queries"
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
                <h2 className="text-2xl font-bold text-white">Manager Help & Support</h2>
                <p className="text-gray-400">Get help with manager-specific functions</p>
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
                        <h3 className="text-xl font-semibold text-white mb-4">Manager Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:border-bright-sun-400/30 transition-colors">
                                <div className="text-white font-medium">Generate Monthly Report</div>
                                <div className="text-gray-400 text-sm">Attendance, salary, and performance</div>
                            </button>
                            <button className="w-full text-left p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:border-bright-sun-400/30 transition-colors">
                                <div className="text-white font-medium">Approve Pending Requests</div>
                                <div className="text-gray-400 text-sm">Registrations and leave requests</div>
                            </button>
                            <button className="w-full text-left p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:border-bright-sun-400/30 transition-colors">
                                <div className="text-white font-medium">Process Monthly Salaries</div>
                                <div className="text-gray-400 text-sm">Calculate and process payments</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* How-To Guides */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Manager How-To Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-2xl mb-3">📊</div>
                        <h4 className="text-white font-bold mb-2">Attendance Management</h4>
                        <p className="text-gray-400 text-sm">Complete guide to marking and managing attendance for children and coaches</p>
                        <button className="text-bright-sun-400 hover:text-bright-sun-300 text-sm font-medium mt-3">
                            View Guide →
                        </button>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-2xl mb-3">💰</div>
                        <h4 className="text-white font-bold mb-2">Salary Processing</h4>
                        <p className="text-gray-400 text-sm">Step-by-step guide to calculating and processing coach salaries</p>
                        <button className="text-bright-sun-400 hover:text-bright-sun-300 text-sm font-medium mt-3">
                            View Guide →
                        </button>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-2xl mb-3">👨‍👩‍👧‍👦</div>
                        <h4 className="text-white font-bold mb-2">Parent Communication</h4>
                        <p className="text-gray-400 text-sm">Best practices for communicating with parents and sending updates</p>
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