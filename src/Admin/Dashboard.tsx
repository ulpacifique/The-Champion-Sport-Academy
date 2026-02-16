import {
    IconUsers,
    IconCalendarEvent,
    IconCash,
    IconTrendingUp,
    IconActivity,
    IconArrowUpRight,
    IconArrowDownRight
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { dashboardAPI } from "../Services/Api";

const Dashboard = () => {
    const [statsData, setStatsData] = useState({
        totalAthletes: 0,
        activeCoaches: 0,
        ongoingPrograms: 0,
        monthlyRevenue: 0,
        athleteGrowth: "+0%",
        revenueGrowth: "+0%",
        revenueChart: [],
        recentActivities: [],
        upcomingEvents: []
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await dashboardAPI.getStats();
            console.log("Dashboard stats:", response.data);
            setStatsData(response.data);
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        }
    };

    // Stats Data
    const stats = [
        {
            title: "Total Athletes",
            value: (statsData.totalAthletes ?? 0).toString(),
            change: statsData.athleteGrowth ?? "+0%",
            trend: "up",
            icon: <IconUsers className="text-blue-400" size={24} />,
            color: "from-blue-500/20 to-blue-600/20",
            borderColor: "border-blue-500/30"
        },
        {
            title: "Active Coaches",
            value: (statsData.activeCoaches ?? 0).toString(),
            change: "+0",
            trend: "up",
            icon: <IconUsers className="text-green-400" size={24} />,
            color: "from-green-500/20 to-green-600/20",
            borderColor: "border-green-500/30"
        },
        {
            title: "Ongoing Programs",
            value: (statsData.ongoingPrograms ?? 0).toString(),
            change: "+0",
            trend: "down",
            icon: <IconCalendarEvent className="text-purple-400" size={24} />,
            color: "from-purple-500/20 to-purple-600/20",
            borderColor: "border-purple-500/30"
        },
        {
            title: "Monthly Revenue",
            value: `RWF ${(statsData.monthlyRevenue ?? 0).toLocaleString()}`,
            change: statsData.revenueGrowth ?? "+0%",
            trend: "up",
            icon: <IconCash className="text-yellow-400" size={24} />,
            color: "from-yellow-500/20 to-yellow-600/20",
            borderColor: "border-yellow-500/30"
        },
    ];

    // Recent Activities (from Backend)
    const activities = statsData.recentActivities || [];

    // Upcoming Events (from Backend)
    const upcomingEvents = statsData.upcomingEvents || [];

    return (
        <div className="space-y-8">
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
                                <div className="flex items-center mt-2">
                                    {stat.trend === "up" ? (
                                        <IconArrowUpRight className="text-green-400" size={16} />
                                    ) : (
                                        <IconArrowDownRight className="text-red-400" size={16} />
                                    )}
                                    <span className={`ml-1 text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-gray-400 text-sm ml-2">from last month</span>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">Revenue Overview</h3>
                        <IconTrendingUp className="text-bright-sun-400" size={24} />
                    </div>

                    {/* Dynamic Revenue Chart */}
                    <div className="space-y-4">
                        {(statsData.revenueChart || []).map((data: any, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span className="text-gray-400 w-8">{data.month}</span>
                                <div className="flex-1 mx-4 bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-bright-sun-400 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((data.revenue / 500000) * 100, 100)}%` }} // Simple scaling
                                    ></div>
                                </div>
                                <span className="text-white w-24 text-right">RWF {data.revenue.toLocaleString()}</span>
                            </div>
                        ))}
                        {(!statsData.revenueChart || statsData.revenueChart.length === 0) && (
                            <p className="text-gray-400 text-center py-4">No revenue data available</p>
                        )}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">Recent Activities</h3>
                        <IconActivity className="text-bright-sun-400" size={24} />
                    </div>

                    <div className="space-y-4">
                        {activities.length > 0 ? (
                            activities.map((activity: any) => (
                                <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
                                    <div>
                                        <span className="text-white font-medium text-sm">{activity.description}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">{activity.time}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">No recent activities</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
                    <button className="text-bright-sun-400 hover:text-bright-sun-300 transition-colors">
                        View All →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event: any) => (
                            <div key={event.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-bright-sun-400/30 transition-colors">
                                <h4 className="text-white font-semibold mb-2">{event.title}</h4>
                                <div className="flex items-center text-gray-400 text-sm mb-3">
                                    <IconCalendarEvent size={16} className="mr-2" />
                                    {event.date}
                                </div>
                                {/* <div className="text-bright-sun-400 text-sm">
                                    {event.participants} participants
                                </div> */}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-4">No upcoming events</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;