// src/Admin/BroadcastMessage.tsx
import { useState } from "react";
import { IconSend, IconUsers, IconMail, IconCalendar } from "@tabler/icons-react";

const BroadcastMessage = () => {
    const [message, setMessage] = useState("");
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");

    const recipientGroups = [
        { id: "all", label: "All Users", count: 156 },
        { id: "parents", label: "Parents", count: 89 },
        { id: "coaches", label: "Coaches", count: 24 },
        { id: "athletes", label: "Athletes", count: 156 },
        { id: "secretary", label: "Secretary Staff", count: 8 },
        { id: "soccer", label: "Soccer Team", count: 45 },
        { id: "basketball", label: "Basketball Team", count: 32 },
        { id: "swimming", label: "Swimming Team", count: 28 },
    ];

    const messageTemplates = [
        "Practice cancelled due to weather conditions.",
        "Payment reminder: Please clear pending dues by end of week.",
        "Important meeting scheduled for all parents this Saturday.",
        "New equipment has arrived at the academy.",
        "Tournament registration is now open.",
        "Maintenance scheduled: Pool will be closed tomorrow.",
    ];

    const toggleGroup = (groupId: string) => {
        setSelectedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        );
    };

    const handleSendBroadcast = () => {
        if (message.trim() && selectedGroups.length > 0) {
            const broadcastData = {
                message,
                groups: selectedGroups,
                schedule: scheduleDate && scheduleTime 
                    ? `${scheduleDate} ${scheduleTime}`
                    : 'immediate',
                totalRecipients: selectedGroups.reduce((total, groupId) => {
                    const group = recipientGroups.find(g => g.id === groupId);
                    return total + (group?.count || 0);
                }, 0)
            };
            console.log("Sending broadcast:", broadcastData);
            // Reset form
            setMessage("");
            setSelectedGroups([]);
            setScheduleDate("");
            setScheduleTime("");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Broadcast Message</h2>
                <p className="text-gray-400">Send important announcements to multiple recipients</p>
            </div>

            {/* Recipient Selection */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <IconUsers className="mr-2 text-bright-sun-400" /> Select Recipients
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {recipientGroups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => toggleGroup(group.id)}
                            className={`p-4 rounded-xl border transition-all ${
                                selectedGroups.includes(group.id)
                                    ? 'bg-bright-sun-400/20 border-bright-sun-400 text-bright-sun-400'
                                    : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                            }`}
                        >
                            <div className="text-lg font-semibold">{group.count}</div>
                            <div className="text-sm">{group.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Composition */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <IconMail className="mr-2 text-bright-sun-400" /> Compose Message
                </h3>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your broadcast message here..."
                    className="w-full h-48 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400 resize-none"
                />
                
                {/* Quick Templates */}
                <div className="mt-4">
                    <p className="text-gray-400 text-sm mb-2">Quick Templates:</p>
                    <div className="flex flex-wrap gap-2">
                        {messageTemplates.map((template, index) => (
                            <button
                                key={index}
                                onClick={() => setMessage(template)}
                                className="text-sm bg-gray-700/50 text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                {template}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Schedule Options */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <IconCalendar className="mr-2 text-bright-sun-400" /> Schedule (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 mb-2">Schedule Date</label>
                        <input
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Schedule Time</label>
                        <input
                            type="time"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>
                </div>
            </div>

            {/* Summary and Send */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-400">Selected Groups:</p>
                        <p className="text-white font-semibold">
                            {selectedGroups.length > 0 
                                ? selectedGroups.map(id => recipientGroups.find(g => g.id === id)?.label).join(", ")
                                : "None selected"
                            }
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Total Recipients:</p>
                        <p className="text-white font-semibold">
                            {selectedGroups.reduce((total, groupId) => {
                                const group = recipientGroups.find(g => g.id === groupId);
                                return total + (group?.count || 0);
                            }, 0)} users
                        </p>
                    </div>
                </div>
            </div>

            {/* Send Button */}
            <div className="text-center">
                <button
                    onClick={handleSendBroadcast}
                    disabled={!message.trim() || selectedGroups.length === 0}
                    className={`inline-flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                        message.trim() && selectedGroups.length > 0
                            ? 'bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 hover:shadow-lg hover:scale-105'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <IconSend size={24} />
                    <span>
                        {scheduleDate && scheduleTime ? 'Schedule Broadcast' : 'Send Broadcast Now'}
                    </span>
                </button>
                <p className="text-gray-400 text-sm mt-4">
                    This message will be sent via SMS, Email, and in-app notifications
                </p>
            </div>
        </div>
    );
};

export default BroadcastMessage;