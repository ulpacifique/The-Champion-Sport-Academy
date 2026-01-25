import { IconUsers, IconCalendarEvent, IconTrophy, IconTrendingUp } from '@tabler/icons-react';
import { coachAPI } from '../Services/Api';
import React from 'react';

const CoachDashboard = () => {

    const [statsData, setStatsData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await coachAPI.getDashboardStats();
                setStatsData(response.data);
            } catch (error) {
                console.error("Failed to fetch coach stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Mock Data (Fallback or derived)
    const stats = [
        { label: 'My Athletes', value: statsData?.athleteCount ?? '0', icon: IconUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Upcoming Classes', value: statsData?.upcomingClassesCount ?? '0', icon: IconCalendarEvent, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'Skills Assessed', value: statsData?.skillsAssessedCount ?? '0', icon: IconTrophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        { label: 'Performance', value: statsData?.performance ?? '0%', icon: IconTrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    ];

    const formatTime = (timeStr: string) => {
        if (!timeStr) return 'TBD';
        // Handle "10:00:00" or "10:00"
        const parts = timeStr.split(':');
        if (parts.length < 2) return timeStr;
        const h = parseInt(parts[0], 10);
        const minutes = parts[1];
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    const upcomingClasses = statsData?.upcomingClasses?.map((cls: any) => ({
        id: cls.id,
        name: cls.name,
        time: `${formatTime(cls.startTime)} - ${formatTime(cls.endTime)}`,
        students: cls.currentParticipants || 0,
        location: 'Main Center' // Placeholder as Location isn't in ProgramDTO yet
    })) || [];

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Welcome back, Coach!</h2>
                <p className="text-gray-400">Here's what's happening with your team today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-colors">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Classes */}
                <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Today's Schedule</h3>
                        <button className="text-sm text-bright-sun-400 hover:text-bright-sun-300">View All</button>
                    </div>
                    {upcomingClasses.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingClasses.map((cls: any) => (
                                <div key={cls.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-colors border-l-4 border-bright-sun-500">
                                    <div className="p-3 bg-gray-800 rounded-lg">
                                        <IconCalendarEvent className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold">{cls.name}</h4>
                                        <p className="text-gray-400 text-sm">{cls.time} • {cls.location}</p>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <div className="text-white font-bold">{cls.students}</div>
                                        <div className="text-xs text-gray-500">Students</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-400 text-center py-4">No classes scheduled for today.</div>
                    )}
                </div>

                {/* Recent Activities / Quick Actions */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-700/50 hover:bg-bright-sun-500/20 hover:text-bright-sun-400 transition-all group border border-transparent hover:border-bright-sun-500/30">
                            <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-bright-sun-500 group-hover:text-gray-900 transition-colors">
                                <IconUsers className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                            </div>
                            <span className="font-medium text-gray-300 group-hover:text-bright-sun-400">Take Attendance</span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-700/50 hover:bg-blue-500/20 hover:text-blue-400 transition-all group border border-transparent hover:border-blue-500/30">
                            <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <IconTrophy className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </div>
                            <span className="font-medium text-gray-300 group-hover:text-blue-400">Assess Skills</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachDashboard;
