import { IconCalendar, IconClock, IconMapPin, IconUsers } from '@tabler/icons-react';

const CoachSchedule = () => {
    const schedule = [
        {
            date: 'Today, Jan 20',
            events: [
                { id: 1, title: 'Advanced Swimming', time: '10:00 AM - 11:30 AM', students: 8, location: 'Pool A', type: 'Class' },
                { id: 2, title: 'Beginner Karate', time: '02:00 PM - 03:30 PM', students: 12, location: 'Dojo 1', type: 'Class' }
            ]
        },
        {
            date: 'Tomorrow, Jan 21',
            events: [
                { id: 3, title: 'Staff Meeting', time: '09:00 AM - 10:00 AM', students: 0, location: 'Conference Room', type: 'Meeting' },
                { id: 4, title: 'Swimming Team Practice', time: '04:00 PM - 06:00 PM', students: 15, location: 'Pool Main', type: 'Practice' }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">My Schedule</h2>
                <p className="text-gray-400">View your upcoming classes and events</p>
            </div>

            <div className="grid gap-6">
                {schedule.map((day, idx) => (
                    <div key={idx} className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-bright-sun-400 mb-4 flex items-center gap-2">
                            <IconCalendar size={20} />
                            {day.date}
                        </h3>
                        <div className="space-y-3">
                            {day.events.map((event) => (
                                <div key={event.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors border-l-4 border-blue-500">
                                    <div className="min-w-[150px]">
                                        <div className="flex items-center gap-2 text-white font-semibold">
                                            <IconClock size={16} className="text-gray-400" />
                                            {event.time}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold">{event.title}</h4>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <IconMapPin size={14} />
                                                {event.location}
                                            </span>
                                            {event.students > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <IconUsers size={14} />
                                                    {event.students} Students
                                                </span>
                                            )}
                                            <span className={`px-2 py-0.5 rounded text-xs border ${event.type === 'Class' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                                                    event.type === 'Meeting' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                                        'border-purple-500/30 text-purple-400 bg-purple-500/10'
                                                }`}>
                                                {event.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoachSchedule;
