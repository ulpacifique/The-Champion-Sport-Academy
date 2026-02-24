import { IconUsers, IconCalendarEvent, IconTrophy, IconTrendingUp, IconArrowRight } from '@tabler/icons-react';
import { coachAPI } from '../Services/Api';
import React from 'react';
import { Link } from 'react-router-dom';

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

    const stats = [
        { label: 'My Athletes', value: statsData?.athleteCount ?? '0', icon: IconUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Classes Today', value: statsData?.upcomingClassesCount ?? '0', icon: IconCalendarEvent, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'Skills Assessed', value: statsData?.skillsAssessedCount ?? '0', icon: IconTrophy, color: 'text-bright-sun-200', bg: 'bg-bright-sun-200/10' },
        { label: 'Avg Performance', value: statsData?.performance ?? '0%', icon: IconTrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    ];

    const formatTime = (timeStr: string) => {
        if (!timeStr) return 'TBD';
        const parts = timeStr.split(':');
        if (parts.length < 2) return timeStr;
        const h = parseInt(parts[0], 10);
        const minutes = parts[1];
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    const upcomingClasses = statsData?.upcomingClasses || [];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bright-sun-300"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-bright-sun-300/30 transition-all hover:scale-[1.02] shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-medium tracking-tight uppercase">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-4 rounded-2xl ${stat.bg} border border-gray-700/30`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Classes */}
                <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white">Today's Schedule</h3>
                            <p className="text-gray-400 text-sm mt-1">Your assigned classes for today</p>
                        </div>
                        <Link to="/coach/schedule" className="group flex items-center gap-2 text-sm font-semibold text-bright-sun-300 hover:text-bright-sun-200 transition-colors">
                            Full Schedule <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {upcomingClasses.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingClasses.map((cls: any) => (
                                <div key={cls.id} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-all border border-gray-700/20 group">
                                    <div className="p-4 bg-gray-800 rounded-xl border border-gray-700/50 group-hover:border-bright-sun-300/30 transition-colors">
                                        <IconCalendarEvent className="w-6 h-6 text-bright-sun-300" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold text-lg">{cls.name}</h4>
                                        <p className="text-gray-400 text-sm flex items-center gap-2 mt-0.5">
                                            <span className="text-bright-sun-300/80 font-medium">
                                                {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                            </span>
                                            • Main Center
                                        </p>
                                    </div>
                                    <div className="text-right hidden sm:block bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/30">
                                        <div className="text-white font-black text-xl leading-tight">{cls.currentParticipants}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Students</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-900/20 rounded-2xl border border-dashed border-gray-700">
                            <IconCalendarEvent size={48} className="text-gray-600 mb-3" />
                            <p className="font-medium text-lg text-gray-500">No classes scheduled for today</p>
                            <p className="text-sm text-gray-600">Take some time to prepare for your next sessions!</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-white mb-8">Quick Actions</h3>
                    <div className="space-y-4">
                        <Link to="/coach/athletes" className="w-full flex items-center gap-4 p-5 rounded-2xl bg-gray-700/30 hover:bg-bright-sun-300/10 transition-all group border border-gray-700/20 hover:border-bright-sun-300/30">
                            <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-bright-sun-300 group-hover:text-gray-900 transition-all shadow-sm">
                                <IconUsers className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
                            </div>
                            <span className="font-bold text-gray-300 group-hover:text-bright-sun-300 text-lg">Take Attendance</span>
                        </Link>
                        <Link to="/coach/athletes" className="w-full flex items-center gap-4 p-5 rounded-2xl bg-gray-700/30 hover:bg-purple-500/10 transition-all group border border-gray-700/20 hover:border-purple-500/30">
                            <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-all shadow-sm">
                                <IconTrophy className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            </div>
                            <span className="font-bold text-gray-300 group-hover:text-purple-400 text-lg">Assess Skills</span>
                        </Link>
                    </div>

                    <div className="mt-8 p-6 bg-bright-sun-300/5 rounded-2xl border border-bright-sun-300/20">
                        <h4 className="text-bright-sun-300 font-bold text-sm uppercase tracking-wider mb-2">Coach Pro-Tip</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Consistent skill assessment helps students stay motivated and gives parents clear visibility into their progress.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachDashboard;
