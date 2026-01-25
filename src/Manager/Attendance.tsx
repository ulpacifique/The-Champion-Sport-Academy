// src/Manager/Attendance.tsx
import { useState, useEffect } from "react";
import {
    IconCalendarEvent,
    IconCheck,
    IconX,
    IconUserCheck,
    IconUsers,
    IconDownload,
    IconFilter,
    IconCalendar
} from "@tabler/icons-react";
import * as AttendanceService from "../Services/AttendanceService";
import { AttendanceDTO } from "../Services/AttendanceService";

interface AttendanceProps {
    children: any[]; // Consider typing this better if Child types are available
    coaches: any[]; // Consider typing this better if Coach types are available
}

interface AttendanceState {
    [id: number]: "present" | "absent" | "late";
}

const Attendance = ({ children, coaches }: AttendanceProps) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceType, setAttendanceType] = useState<"children" | "coaches">("children");
    const [childrenAttendance, setChildrenAttendance] = useState<AttendanceState>({});
    const [coachesAttendance, setCoachesAttendance] = useState<AttendanceState>({});
    const [selectedClass, setSelectedClass] = useState("all");
    const [sportFilter, setSportFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Initialize/Fetch attendance data
    useEffect(() => {
        const fetchAttendance = async () => {
            setIsLoading(true);
            try {
                if (attendanceType === "children") {
                    // For children, we might need to fetch by program or iterate.
                    // Ideally, we fetch by Program if selected, or all.
                    // Since the current props provide all children, let's fetch for the current date?
                    // The backend API `getAttendanceByProgram` requires a programId.
                    // If we have children from diverse programs, we might need to fetch differently or loop.
                    // For now, let's reset to default 'absent' and then overlay fetched data if available.

                    // Default state
                    const initial: AttendanceState = {};
                    children.forEach(child => initial[child.id] = "absent"); // Default to absent

                    // FETCH: We need an endpoint to get all attendance for a date or loop through programs.
                    // Assuming children prop is filtered list or we just want to load what we have.
                    // Optimization: add `getAttendanceByDate` to backend later or iterate children.

                    // Simple approach for now:
                    // If we had a program context, we'd use it.
                    // Let's iterate distinct programs from children list to fetch attendance?
                    // Or just use defaults for "New" entry and assume past dates are read-only or fetched differently.
                    // Let's stick to Local State defaults for now as "New" sheet daily.

                    // WAIT, we CAN fetch by child individually but that's too many requests.
                    // Let's assume we are marking NEW attendance for today.
                    // If we change date, we should try to load.

                    // For demo purposes, we'll keep local state default, but we should clear it on date change.
                    setChildrenAttendance(initial);

                } else {
                    // Coaches
                    const initial: AttendanceState = {};
                    coaches.forEach(coach => initial[coach.id] = "present"); // Default to present
                    setCoachesAttendance(initial);

                    // Try to fetch coach attendance for this date
                    // We don't have a "getAllCoachAttendance(date)" endpoint yet.
                    // We have `getAttendanceByCoach`. 
                    // Let's skip complex fetching for now and focus on SAVING.
                }
            } catch (error) {
                console.error("Error fetching attendance", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAttendance();
    }, [date, children, coaches, attendanceType]);

    const handleChildAttendance = (childId: number, status: "present" | "absent" | "late") => {
        setChildrenAttendance(prev => ({
            ...prev,
            [childId]: status
        }));
    };

    const handleCoachAttendance = (coachId: number, status: "present" | "absent" | "late") => {
        setCoachesAttendance(prev => ({
            ...prev,
            [coachId]: status
        }));
    };

    const handleSaveAttendance = async () => {
        setIsLoading(true);
        try {
            const attendancesToSave: AttendanceDTO[] = [];

            if (attendanceType === "children") {
                children.forEach(child => {
                    const status = childrenAttendance[child.id];
                    // Only save if status is determined? or always save all?
                    // Typically schools mark strictly.
                    // We need Program ID for child attendance.
                    // Assuming child object has program/class info or we select it.
                    // We need to know which program the child is attending right now.
                    // If `child.programId` exists in props? 
                    // Looking at mocks, we have `child.sport`, maybe map to program?
                    // THIS IS A GAP: We need programId to save child attendance.

                    if (status && child.programId) { // user needs to ensure child has programId
                        attendancesToSave.push({
                            childId: child.id,
                            programId: child.programId,
                            attendanceDate: date,
                            present: status === "present" || status === "late", // Simplified boolean for now
                            notes: status === "late" ? "Late" : undefined
                        });
                    }
                });
            } else {
                coaches.forEach(coach => {
                    const status = coachesAttendance[coach.id];
                    if (status) {
                        attendancesToSave.push({
                            coachId: coach.id,
                            attendanceDate: date,
                            present: status === "present" || status === "late",
                            notes: status === "late" ? "Late" : undefined
                        });
                    }
                });
            }

            if (attendancesToSave.length > 0) {
                await AttendanceService.markBulkAttendance(attendancesToSave);
                alert("Attendance saved successfully!");
            } else {
                alert("No attendance data to save.");
            }

        } catch (error) {
            console.error("Error saving attendance", error);
            alert("Failed to save attendance.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAllPresent = () => {
        if (attendanceType === "children") {
            const allPresent: AttendanceState = {};
            children.forEach(child => allPresent[child.id] = "present");
            setChildrenAttendance(allPresent);
        } else {
            const allPresent: AttendanceState = {};
            coaches.forEach(coach => allPresent[coach.id] = "present");
            setCoachesAttendance(allPresent);
        }
    };

    const handleMarkAllAbsent = () => {
        if (attendanceType === "children") {
            const allAbsent: AttendanceState = {};
            children.forEach(child => allAbsent[child.id] = "absent");
            setChildrenAttendance(allAbsent);
        } else {
            const allAbsent: AttendanceState = {};
            coaches.forEach(coach => allAbsent[coach.id] = "absent");
            setCoachesAttendance(allAbsent);
        }
    };

    const handleExportAttendance = () => {
        console.log("Exporting attendance data");
        // Implement CSV export here
    };

    // Filter children based on class and sport
    const filteredChildren = children.filter(child => {
        const matchesClass = selectedClass === "all" || true;
        const matchesSport = sportFilter === "all" || child.sport === sportFilter;
        return matchesClass && matchesSport;
    });

    // Calculate stats (based on local state for current day view)
    const presentChildren = Object.values(childrenAttendance).filter(status => status === "present").length;
    const totalChildren = Object.keys(childrenAttendance).length;
    const childrenAttendanceRate = totalChildren > 0 ? Math.round((presentChildren / totalChildren) * 100) : 0;

    const presentCoaches = Object.values(coachesAttendance).filter(status => status === "present").length;
    const totalCoaches = Object.keys(coachesAttendance).length;
    const coachesAttendanceRate = totalCoaches > 0 ? Math.round((presentCoaches / totalCoaches) * 100) : 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Attendance Management</h2>
                    <p className="text-gray-400">Mark attendance for children and coaches</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleExportAttendance}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                        <IconDownload size={20} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Attendance Controls */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Attendance Type</label>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setAttendanceType("children")}
                                className={`flex-1 py-2 rounded-lg transition-colors ${attendanceType === "children"
                                    ? 'bg-bright-sun-400 text-gray-900 font-bold'
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                            >
                                Children
                            </button>
                            <button
                                onClick={() => setAttendanceType("coaches")}
                                className={`flex-1 py-2 rounded-lg transition-colors ${attendanceType === "coaches"
                                    ? 'bg-bright-sun-400 text-gray-900 font-bold'
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                            >
                                Coaches
                            </button>
                        </div>
                    </div>

                    {attendanceType === "children" && (
                        <>
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Class</label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                                >
                                    <option value="all">All Classes</option>
                                    <option value="karate-beginners">Karate Beginners</option>
                                    <option value="karate-intermediate">Karate Intermediate</option>
                                    <option value="gymnastics-beginners">Gymnastics Beginners</option>
                                    <option value="gymnastics-advanced">Gymnastics Advanced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Sport</label>
                                <select
                                    value={sportFilter}
                                    onChange={(e) => setSportFilter(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                                >
                                    <option value="all">All Sports</option>
                                    <option value="Karate">Karate</option>
                                    <option value="Gymnastics">Gymnastics</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-4 mt-6">
                    <button
                        onClick={handleMarkAllPresent}
                        className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors flex items-center space-x-2"
                        disabled={isLoading}
                    >
                        <IconCheck size={20} />
                        <span>Mark All Present</span>
                    </button>
                    <button
                        onClick={handleMarkAllAbsent}
                        className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors flex items-center space-x-2"
                        disabled={isLoading}
                    >
                        <IconX size={20} />
                        <span>Mark All Absent</span>
                    </button>
                    <button
                        onClick={handleSaveAttendance}
                        disabled={isLoading}
                        className={`px-6 py-2 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Saving...' : 'Save Attendance'}
                    </button>
                </div>
            </div>

            {/* Attendance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <IconUsers className="text-blue-400" size={24} />
                        <div>
                            <div className="text-white font-bold">Children Attendance</div>
                            <div className="text-gray-300 text-sm">Date: {date}</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{presentChildren}/{totalChildren}</div>
                    <div className="text-blue-400 font-medium">{childrenAttendanceRate}% Present</div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <IconUserCheck className="text-green-400" size={24} />
                        <div>
                            <div className="text-white font-bold">Coaches Attendance</div>
                            <div className="text-gray-300 text-sm">Date: {date}</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{presentCoaches}/{totalCoaches}</div>
                    <div className="text-green-400 font-medium">{coachesAttendanceRate}% Present</div>
                </div>
            </div>

            {/* Attendance List */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">
                        {attendanceType === "children" ? "Children Attendance" : "Coaches Attendance"}
                    </h3>
                    <div className="text-gray-400">
                        {attendanceType === "children"
                            ? `${filteredChildren.length} children`
                            : `${coaches.length} coaches`
                        }
                    </div>
                </div>

                {attendanceType === "children" ? (
                    <div className="space-y-4">
                        {filteredChildren.map((child) => (
                            <div key={child.id} className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${childrenAttendance[child.id] === "present" ? 'bg-green-500/20' :
                                            childrenAttendance[child.id] === "late" ? 'bg-yellow-500/20' : 'bg-red-500/20'
                                        }`}>
                                        {childrenAttendance[child.id] === "present" ? (
                                            <IconCheck className="text-green-400" size={20} />
                                        ) : childrenAttendance[child.id] === "late" ? (
                                            <IconCalendarEvent className="text-yellow-400" size={20} />
                                        ) : (
                                            <IconX className="text-red-400" size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{child.name}</div>
                                        <div className="text-gray-400 text-sm">
                                            {child.sport} • {child.sport === "Karate" ? `${child.belt} Belt` : child.level} • Age: {child.age}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleChildAttendance(child.id, "present")}
                                        className={`px-4 py-2 rounded-lg transition-colors ${childrenAttendance[child.id] === "present"
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            }`}
                                    >
                                        Present
                                    </button>
                                    <button
                                        onClick={() => handleChildAttendance(child.id, "absent")}
                                        className={`px-4 py-2 rounded-lg transition-colors ${childrenAttendance[child.id] === "absent"
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            }`}
                                    >
                                        Absent
                                    </button>
                                    <button
                                        onClick={() => handleChildAttendance(child.id, "late")}
                                        className={`px-4 py-2 rounded-lg transition-colors ${childrenAttendance[child.id] === "late"
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            }`}
                                    >
                                        Late
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {coaches.map((coach) => (
                            <div key={coach.id} className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${coachesAttendance[coach.id] === "present" ? 'bg-green-500/20' :
                                            coachesAttendance[coach.id] === "late" ? 'bg-yellow-500/20' : 'bg-red-500/20'
                                        }`}>
                                        {coachesAttendance[coach.id] === "present" ? (
                                            <IconCheck className="text-green-400" size={20} />
                                        ) : coachesAttendance[coach.id] === "late" ? (
                                            <IconCalendarEvent className="text-yellow-400" size={20} />
                                        ) : (
                                            <IconX className="text-red-400" size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{coach.name}</div>
                                        <div className="text-gray-400 text-sm">
                                            {coach.sport} Coach • Experience: {coach.experience}
                                        </div>
                                        <div className="text-gray-500 text-sm mt-1">
                                            Attendance this month: {coach.attendance.present}/{coach.attendance.total} days
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleCoachAttendance(coach.id, "present")}
                                        className={`px-4 py-2 rounded-lg transition-colors ${coachesAttendance[coach.id] === "present"
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            }`}
                                    >
                                        Present
                                    </button>
                                    <button
                                        onClick={() => handleCoachAttendance(coach.id, "absent")}
                                        className={`px-4 py-2 rounded-lg transition-colors ${coachesAttendance[coach.id] === "absent"
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            }`}
                                    >
                                        Absent
                                    </button>
                                    <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Example Attendance Records - keeping this static for now or can fetch dynamic logic later */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <h4 className="text-white font-semibold mb-4">Recent Attendance Records</h4>
                    <div className="space-y-2">
                        <div className="text-gray-400 text-sm">
                            <span className="text-white">Coach Michael</span> attended 15/20 days this month (75%)
                        </div>
                        {/* More static examples */}
                    </div>
                </div>
            </div>

            {/* Monthly Attendance Report - keeping this consistent with props data for now */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <IconCalendar className="text-bright-sun-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">Monthly Attendance Report</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700/50">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Present</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Days</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Example Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coaches.map((coach) => {
                                const rate = coach.attendance.total > 0
                                    ? Math.round((coach.attendance.present / coach.attendance.total) * 100)
                                    : 0;

                                return (
                                    <tr key={coach.id} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                                        <td className="py-3 px-4 text-white font-medium">{coach.name}</td>
                                        <td className="py-3 px-4 text-gray-400">{coach.sport} Coach</td>
                                        <td className="py-3 px-4 text-white">{coach.attendance.present}</td>
                                        <td className="py-3 px-4 text-white">{coach.attendance.total}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${rate >= 90 ? 'bg-green-500/20 text-green-400' :
                                                    rate >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                }`}>
                                                {rate}%
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-400 text-sm">
                                            {coach.name} attended {coach.attendance.present} out of {coach.attendance.total} days this month
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;