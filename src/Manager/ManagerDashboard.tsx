// src/Manager/ManagerDashboard.tsx
import { useState } from "react";
import {
    IconUsers,
    IconUserCheck,
    IconCash,
    IconTrendingUp,
    IconCalendarEvent,
    IconChartBar,
    IconClipboardCheck,
    IconArrowUpRight,
    IconArrowDownRight
} from "@tabler/icons-react";
import { useEffect } from "react";
import { managerAPI } from "../Services/Api";

// Define TypeScript interfaces
interface CoachAttendance {
  id?: number;
  name: string;
  sport: string;
  rate: number;
  present: number;
  total: number;
}

interface DashboardStats {
  totalChildren: number;
  activeCoaches: number;
  pendingRegistrations: number;
  totalRevenue: number;
  attendanceRate: number;
  coachAttendance: CoachAttendance[];
}

interface RecentActivity {
  id: number;
  action: string;
  user: string;
  time: string;
}

interface UpcomingTask {
  id: number;
  task: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
}

interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

const ManagerDashboard = () => {
    const [timeRange, setTimeRange] = useState("month");
    const [statsData, setStatsData] = useState<DashboardStats>({
        totalChildren: 0,
        activeCoaches: 0,
        pendingRegistrations: 0,
        totalRevenue: 0,
        attendanceRate: 0,
        coachAttendance: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await managerAPI.getDashboardStats();
                // Ensure coachAttendance exists in response, default to empty array if not
                setStatsData({
                    ...response.data,
                    coachAttendance: response.data.coachAttendance || []
                });
            } catch (error) {
                console.error("Failed to fetch manager stats:", error);
                // For development/testing, use mock data when API fails
                setStatsData({
                    totalChildren: 45,
                    activeCoaches: 8,
                    pendingRegistrations: 3,
                    totalRevenue: 1250000,
                    attendanceRate: 92,
                    coachAttendance: [
                        { id: 1, name: "Coach Michael", sport: "Football", rate: 95, present: 19, total: 20 },
                        { id: 2, name: "Coach Sarah", sport: "Basketball", rate: 88, present: 22, total: 25 },
                        { id: 3, name: "Coach David", sport: "Swimming", rate: 92, present: 23, total: 25 },
                        { id: 4, name: "Coach Lisa", sport: "Tennis", rate: 78, present: 18, total: 23 }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats: StatItem[] = [
        {
            title: "Total Children",
            value: statsData.totalChildren.toLocaleString(),
            change: "+3",
            trend: "up",
            icon: <IconUsers className="text-blue-400" size={24} />,
            color: "from-blue-500/20 to-blue-600/20",
            borderColor: "border-blue-500/30"
        },
        {
            title: "Active Coaches",
            value: statsData.activeCoaches.toString(),
            change: "+1",
            trend: "up",
            icon: <IconUserCheck className="text-green-400" size={24} />,
            color: "from-green-500/20 to-green-600/20",
            borderColor: "border-green-500/30"
        },
        {
            title: "New Registrations",
            value: statsData.pendingRegistrations.toString(),
            change: "+2",
            trend: "up",
            icon: <IconUsers className="text-purple-400" size={24} />,
            color: "from-purple-500/20 to-purple-600/20",
            borderColor: "border-purple-500/30"
        },
        {
            title: "Monthly Revenue",
            value: `RWF ${statsData.totalRevenue.toLocaleString()}`,
            change: "+15%",
            trend: "up",
            icon: <IconCash className="text-yellow-400" size={24} />,
            color: "from-yellow-500/20 to-yellow-600/20",
            borderColor: "border-yellow-500/30"
        },
    ];

    const recentActivities: RecentActivity[] = [
        { id: 1, action: "New child registered by parent", user: "Emma Wilson", time: "2 hours ago" },
        { id: 2, action: "Coach attendance marked", user: "Coach Michael", time: "4 hours ago" },
        { id: 3, action: "Salary processed", user: "Coach Sarah", time: "1 day ago" },
        { id: 4, action: "Monthly report generated", user: "System", time: "2 days ago" },
        { id: 5, action: "Parent message received", user: "Alice Doe", time: "3 days ago" },
    ];

    const upcomingTasks: UpcomingTask[] = [
        { id: 1, task: "Process pending registrations", priority: "high", due: "Today" },
        { id: 2, task: "Review coach attendance", priority: "medium", due: "Tomorrow" },
        { id: 3, task: "Prepare monthly salary report", priority: "high", due: "Jan 25" },
        { id: 4, task: "Parent-teacher meetings", priority: "medium", due: "Jan 30" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Manager Dashboard</h2>
                    <p className="text-gray-400">Overview of academy operations and management</p>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index: number) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activities */}
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">Recent Activities</h3>
                        <IconClipboardCheck className="text-bright-sun-400" size={24} />
                    </div>

                    <div className="space-y-4">
                        {recentActivities.map((activity: RecentActivity) => (
                            <div key={activity.id} className="flex items-start justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
                                <div>
                                    <div className="text-white">{activity.action}</div>
                                    <div className="text-gray-400 text-sm mt-1">{activity.user}</div>
                                </div>
                                <span className="text-gray-500 text-sm whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">Upcoming Tasks</h3>
                        <IconCalendarEvent className="text-bright-sun-400" size={24} />
                    </div>

                    <div className="space-y-4">
                        {upcomingTasks.map((task: UpcomingTask) => (
                            <div key={task.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-bright-sun-400/30 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">{task.task}</h4>
                                        <div className="flex items-center space-x-3">
                                            <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {task.priority.toUpperCase()}
                                            </span>
                                            <span className="text-gray-400 text-sm">Due: {task.due}</span>
                                        </div>
                                    </div>
                                    <button className="text-bright-sun-400 hover:text-bright-sun-300 text-sm font-medium">
                                        Mark Complete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Coach Attendance Overview */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Coach Attendance This Month</h3>
                    <IconChartBar className="text-bright-sun-400" size={24} />
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-sun-400 mx-auto"></div>
                        <p className="text-gray-400 mt-4">Loading coach attendance...</p>
                    </div>
                ) : statsData.coachAttendance.length > 0 ? (
                    <div className="space-y-4">
                        {statsData.coachAttendance.map((coach: CoachAttendance, index: number) => (
                            <div key={coach.id || index} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <div className="text-white font-bold">{coach.name}</div>
                                        <div className="text-gray-400 text-sm">{coach.sport} Coach</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${coach.rate >= 90 ? 'text-green-400' : coach.rate >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {coach.rate}%
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {coach.present}/{coach.total} days
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance breakdown */}
                                <div className="text-sm text-gray-400 mb-2">
                                    <span className="text-white font-medium">Attendance: </span>
                                    {coach.name} attended {coach.present} out of {coach.total} days this month
                                </div>

                                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${coach.rate >= 90 ? 'bg-green-500' : coach.rate >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                        style={{ width: `${coach.rate}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No coach attendance data available
                    </div>
                )}
            </div>

            {/* New Registrations */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">New Registrations (Pending Review)</h3>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                        {statsData.pendingRegistrations} new
                    </span>
                </div>

                {statsData.pendingRegistrations === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No pending registrations
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {statsData.pendingRegistrations} pending registrations (List view coming soon)
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400 transition-all hover:scale-[1.02]">
                    <div className="text-white font-medium">Register New Child</div>
                    <div className="text-gray-400 text-sm mt-1">Manual registration</div>
                </button>
                <button className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4 hover:border-green-400 transition-all hover:scale-[1.02]">
                    <div className="text-white font-medium">Mark Attendance</div>
                    <div className="text-gray-400 text-sm mt-1">Children & Coaches</div>
                </button>
                <button className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 hover:border-purple-400 transition-all hover:scale-[1.02]">
                    <div className="text-white font-medium">Send Broadcast</div>
                    <div className="text-gray-400 text-sm mt-1">Message parents/coaches</div>
                </button>
                <button className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 hover:border-yellow-400 transition-all hover:scale-[1.02]">
                    <div className="text-white font-medium">Generate Report</div>
                    <div className="text-gray-400 text-sm mt-1">Monthly summary</div>
                </button>
            </div>
        </div>
    );
};

export default ManagerDashboard;