import { useState, useEffect, useCallback } from "react";
import {
    IconTrendingUp,
    IconTrophy,
    IconCalendarEvent,
    IconChartBar,
    IconStar,
    IconProgress,
    IconVideo,
    IconClipboardCheck,
    IconPhone,
    IconClock,
    IconLocation
} from "@tabler/icons-react";
import ChildProgressModal from "../Admin/ChildProgressModal";
import { eventAPI } from "../Services/Api";
import parentAPI from "../Services/ParentApi";

interface ParentDashboardProps {
    selectedChild: any;
}

const ParentDashboard = ({ selectedChild }: ParentDashboardProps) => {
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [events, setEvents] = useState<any[]>([]);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [dashboardStats, setDashboardStats] = useState<any>({
        classesThisWeek: 0,
        achievements: 0,
        recentActivities: []
    });
    const [isLoadingStats, setIsLoadingStats] = useState(false);

    const fetchDynamicContent = useCallback(async () => {
        try {
            const [eventsRes, announcementsRes] = await Promise.all([
                eventAPI.getEventsByType('EVENT'),
                eventAPI.getEventsByType('ANNOUNCEMENT')
            ]);
            setEvents(eventsRes.data);
            setAnnouncements(announcementsRes.data);
        } catch (error) {
            console.error("Failed to fetch dashboard content", error);
        }
    }, []);

    const fetchDashboardStats = useCallback(async () => {
        if (!selectedChild?.id) return;
        setIsLoadingStats(true);
        try {
            const response = await parentAPI.getDashboardStats(selectedChild.id);
            setDashboardStats(response.data);
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setIsLoadingStats(false);
        }
    }, [selectedChild?.id]);

    useEffect(() => {
        fetchDynamicContent();
    }, [fetchDynamicContent]);

    useEffect(() => {
        if (selectedChild?.id) {
            fetchDashboardStats();
        }
    }, [selectedChild?.id, fetchDashboardStats]);

    const stats = [
        {
            title: "Overall Progress",
            value: selectedChild ? `${selectedChild.progress}%` : "0%",
            change: "+5%",
            trend: "up",
            icon: <IconTrendingUp className="text-green-400" size={24} />,
            color: "from-green-500/20 to-green-600/20",
            borderColor: "border-green-500/30"
        },
        {
            title: "Current Level",
            value: selectedChild?.belt || selectedChild?.level || "Beginner",
            change: "Next: Orange Belt",
            trend: "up",
            icon: <IconTrophy className="text-bright-sun-300" size={24} />,
            color: "from-bright-sun-200/20 to-bright-sun-300/20",
            borderColor: "border-bright-sun-300/30"
        },
        {
            title: "Classes This Week",
            value: isLoadingStats ? "..." : String(dashboardStats.classesThisWeek || 0),
            change: "Attendance tracked",
            trend: "neutral",
            icon: <IconCalendarEvent className="text-blue-400" size={24} />,
            color: "from-blue-500/20 to-blue-600/20",
            borderColor: "border-blue-500/30"
        },
        {
            title: "Achievements",
            value: isLoadingStats ? "..." : String(dashboardStats.achievements || 0),
            change: "Skills mastered",
            trend: "up",
            icon: <IconStar className="text-purple-400" size={24} />,
            color: "from-purple-500/20 to-purple-600/20",
            borderColor: "border-purple-500/30"
        },
    ];


    const quickActions = [
        {
            title: "View Detailed Progress",
            icon: <IconProgress className="text-bright-sun-300" size={24} />,
            action: () => setIsProgressModalOpen(true),
            color: "bg-gradient-to-br from-bright-sun-200/20 to-bright-sun-300/20"
        },
        {
            title: "Watch Training Videos",
            icon: <IconVideo className="text-blue-400" size={24} />,
            action: () => console.log("Watch videos"),
            color: "bg-gradient-to-br from-blue-500/20 to-blue-600/20"
        },
        {
            title: "Send Message to Coach",
            icon: <IconClipboardCheck className="text-green-400" size={24} />,
            action: () => console.log("Message coach"),
            color: "bg-gradient-to-br from-green-500/20 to-green-600/20"
        },
        {
            title: "View Report Card",
            icon: <IconChartBar className="text-purple-400" size={24} />,
            action: () => console.log("View report"),
            color: "bg-gradient-to-br from-purple-500/20 to-purple-600/20"
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-bright-sun-200/20 to-cerulean-blue-500/20 border border-bright-sun-200/30 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Welcome back, Parent!
                        </h2>
                        <p className="text-gray-300 mt-2">
                            {selectedChild ?
                                `Track ${selectedChild.name}'s journey in ${selectedChild.sport}` :
                                "Add a child to start tracking their progress"
                            }
                        </p>
                    </div>

                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-2xl p-6 backdrop-blur-sm`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 text-sm">{stat.title}</p>
                                <p className="text-white text-2xl font-bold mt-2">{stat.value}</p>
                                <div className="text-gray-400 text-sm mt-2">{stat.change}</div>
                            </div>
                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.action}
                        className={`${action.color} border border-gray-700/50 rounded-xl p-4 hover:border-bright-sun-300/30 transition-all hover:scale-[1.02]`}
                    >
                        <div className="flex items-center space-x-3">
                            {action.icon}
                            <span className="text-white font-medium text-sm">{action.title}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Announcements */}
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">Academy Announcements</h3>
                        <IconPhone className="text-bright-sun-300" size={24} />
                    </div>

                    <div className="space-y-4">
                        {announcements.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No new announcements</p>
                        ) : (
                            announcements.map((ann) => (
                                <div key={ann.id} className="bg-bright-sun-300/5 border border-bright-sun-300/10 rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-bright-sun-300 font-bold">{ann.title}</h4>
                                        <span className="text-gray-500 text-[10px] uppercase font-bold">{new Date(ann.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{ann.description}</p>
                                    {ann.sport !== 'All' && (
                                        <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-gray-700 text-gray-400">
                                            {ann.sport} Dept.
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
                        <IconCalendarEvent className="text-bright-sun-300" size={24} />
                    </div>

                    <div className="space-y-4">
                        {events.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No upcoming events</p>
                        ) : (
                            events.map((event) => (
                                <div key={event.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-bright-sun-300/30 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-white font-semibold mb-2">{event.title}</h4>
                                            <div className="flex items-center text-gray-400 text-sm space-x-4">
                                                <span className="flex items-center">
                                                    <IconCalendarEvent size={16} className="mr-2" />
                                                    {new Date(event.date).toLocaleDateString()}
                                                </span>
                                                {event.time && (
                                                    <span className="flex items-center">
                                                        <IconClock size={16} className="mr-2" />
                                                        {event.time}
                                                    </span>
                                                )}
                                            </div>
                                            {event.location && (
                                                <div className="text-gray-500 text-sm mt-2 flex items-center">
                                                    <IconLocation size={14} className="mr-2" />
                                                    {event.location}
                                                </div>
                                            )}
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${event.sport === 'Karate' ? 'bg-red-500/20 text-red-400' :
                                            event.sport === 'Gymnastics' ? 'bg-purple-500/20 text-purple-400' :
                                                'bg-white/10 text-white'
                                            }`}>
                                            {event.sport}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Progress Modal */}
            {selectedChild && (
                <ChildProgressModal
                    childId={selectedChild.id}
                    childName={selectedChild.name}
                    isOpen={isProgressModalOpen}
                    onClose={() => setIsProgressModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ParentDashboard;