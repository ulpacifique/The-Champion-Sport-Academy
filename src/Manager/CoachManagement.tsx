// src/Manager/CoachManagement.tsx
import { useState } from "react";
import { 
    IconPlus, 
    IconEdit, 
    IconTrash, 
    IconUserPlus,
    IconCheck,
    IconX,
    IconSearch,
    IconFilter,
    IconCalendarEvent,
    IconChartBar
} from "@tabler/icons-react";

interface CoachManagementProps {
    coaches: any[];
    setCoaches: (coaches: any[]) => void;
}

const CoachManagement = ({ coaches, setCoaches }: CoachManagementProps) => {
    const [isAddingCoach, setIsAddingCoach] = useState(false);
    const [editingCoach, setEditingCoach] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sportFilter, setSportFilter] = useState("all");

    const [formData, setFormData] = useState({
        name: "",
        sport: "Karate",
        experience: "",
        email: "",
        phone: "",
        address: "",
        salary: "",
        qualification: "",
        hireDate: new Date().toISOString().split('T')[0]
    });

    // Filter coaches
    const filteredCoaches = coaches.filter(coach => {
        const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSport = sportFilter === "all" || coach.sport === sportFilter;
        return matchesSearch && matchesSport;
    });

    const handleAddCoach = () => {
        if (!formData.name || !formData.sport || !formData.experience || !formData.salary) {
            alert("Please fill in all required fields");
            return;
        }

        const newCoach = {
            id: coaches.length + 1,
            name: formData.name,
            sport: formData.sport,
            experience: formData.experience,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            salary: parseInt(formData.salary),
            qualification: formData.qualification,
            hireDate: formData.hireDate,
            attendance: { present: 0, total: 0 }
        };

        setCoaches([...coaches, newCoach]);
        setIsAddingCoach(false);
        resetForm();
    };

    const handleUpdateCoach = () => {
        if (!editingCoach) return;

        const updatedCoaches = coaches.map(coach => 
            coach.id === editingCoach.id 
                ? { 
                    ...coach, 
                    ...formData, 
                    salary: parseInt(formData.salary)
                }
                : coach
        );

        setCoaches(updatedCoaches);
        setEditingCoach(null);
        resetForm();
    };

    const handleDeleteCoach = (id: number) => {
        if (window.confirm("Are you sure you want to remove this coach?")) {
            const updatedCoaches = coaches.filter(coach => coach.id !== id);
            setCoaches(updatedCoaches);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            sport: "Karate",
            experience: "",
            email: "",
            phone: "",
            address: "",
            salary: "",
            qualification: "",
            hireDate: new Date().toISOString().split('T')[0]
        });
    };

    const handleEditCoach = (coach: any) => {
        setEditingCoach(coach);
        setFormData({
            name: coach.name,
            sport: coach.sport,
            experience: coach.experience,
            email: coach.email || "",
            phone: coach.phone || "",
            address: coach.address || "",
            salary: coach.salary.toString(),
            qualification: coach.qualification || "",
            hireDate: coach.hireDate
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Coach Management</h2>
                    <p className="text-gray-400">Manage coaches and their details</p>
                </div>
                <button
                    onClick={() => setIsAddingCoach(true)}
                    className="px-6 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                    <IconPlus size={20} />
                    <span>Add Coach</span>
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Search</label>
                        <div className="relative">
                            <IconSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                            />
                        </div>
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
                </div>
            </div>

            {/* Add/Edit Coach Form */}
            {(isAddingCoach || editingCoach) && (
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">
                            {editingCoach ? "Edit Coach Profile" : "Add New Coach"}
                        </h3>
                        <button
                            onClick={() => {
                                setIsAddingCoach(false);
                                setEditingCoach(null);
                                resetForm();
                            }}
                            className="text-gray-400 hover:text-white"
                        >
                            <IconX size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Full Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Coach's full name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Sport *</label>
                            <select
                                value={formData.sport}
                                onChange={(e) => setFormData({...formData, sport: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                            >
                                <option value="Karate">Karate</option>
                                <option value="Gymnastics">Gymnastics</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Experience *</label>
                            <input
                                type="text"
                                value={formData.experience}
                                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="e.g., 5 years"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Monthly Salary (RWF) *</label>
                            <input
                                type="number"
                                value={formData.salary}
                                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Enter salary amount"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="coach@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="+1234567890"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-300 text-sm mb-2">Qualifications</label>
                            <input
                                type="text"
                                value={formData.qualification}
                                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Certifications and qualifications"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Full address"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Hire Date</label>
                            <input
                                type="date"
                                value={formData.hireDate}
                                onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => {
                                setIsAddingCoach(false);
                                setEditingCoach(null);
                                resetForm();
                            }}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={editingCoach ? handleUpdateCoach : handleAddCoach}
                            className="px-6 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                        >
                            <IconCheck size={20} />
                            <span>{editingCoach ? "Update Coach" : "Add Coach"}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Coaches List */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                    Coaches ({filteredCoaches.length})
                </h3>
                
                {filteredCoaches.length === 0 ? (
                    <div className="text-center py-8">
                        <IconUserPlus className="mx-auto text-gray-500" size={48} />
                        <p className="text-gray-400 mt-4">No coaches found</p>
                        <button
                            onClick={() => setIsAddingCoach(true)}
                            className="mt-4 text-bright-sun-400 hover:text-bright-sun-300"
                        >
                            Add your first coach
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCoaches.map((coach) => (
                            <div key={coach.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-bright-sun-400/30 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{coach.name}</h4>
                                        <p className="text-gray-400 text-sm">{coach.sport} Coach</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditCoach(coach)}
                                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        >
                                            <IconEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCoach(coach.id)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <IconTrash size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Experience:</span>
                                        <span className="text-white font-medium">{coach.experience}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Monthly Salary:</span>
                                        <span className="text-white font-medium">RWF {coach.salary.toLocaleString()}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Attendance:</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-white font-medium">
                                                {coach.attendance.present}/{coach.attendance.total} days
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                coach.attendance.total > 0 && (coach.attendance.present / coach.attendance.total) >= 0.9 
                                                    ? 'bg-green-500/20 text-green-400' 
                                                    : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                                {coach.attendance.total > 0 ? Math.round((coach.attendance.present / coach.attendance.total) * 100) : 0}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Contact:</span>
                                        <span className="text-white text-sm">{coach.phone || 'N/A'}</span>
                                    </div>

                                    <div className="pt-3 border-t border-gray-700/50">
                                        <p className="text-gray-400 text-sm">
                                            Hired: {coach.hireDate}
                                        </p>
                                        {coach.qualification && (
                                            <p className="text-gray-400 text-sm mt-1">
                                                {coach.qualification}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex space-x-2 mt-4">
                                    <button className="flex-1 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">
                                        View Attendance
                                    </button>
                                    <button className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                                        Message
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Attendance Summary */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <IconCalendarEvent className="text-bright-sun-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">Monthly Attendance Overview</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700/50">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Coach</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Sport</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Present</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Days</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Attendance Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coaches.map((coach) => {
                                const attendanceRate = coach.attendance.total > 0 
                                    ? Math.round((coach.attendance.present / coach.attendance.total) * 100)
                                    : 0;
                                
                                return (
                                    <tr key={coach.id} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                                        <td className="py-3 px-4 text-white font-medium">{coach.name}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                coach.sport === "Karate" 
                                                    ? 'bg-blue-500/20 text-blue-400' 
                                                    : 'bg-purple-500/20 text-purple-400'
                                            }`}>
                                                {coach.sport}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-white">{coach.attendance.present}</td>
                                        <td className="py-3 px-4 text-white">{coach.attendance.total}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full ${
                                                            attendanceRate >= 90 ? 'bg-green-500' :
                                                            attendanceRate >= 80 ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                        }`}
                                                        style={{ width: `${attendanceRate}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`text-sm ${
                                                    attendanceRate >= 90 ? 'text-green-400' :
                                                    attendanceRate >= 80 ? 'text-yellow-400' :
                                                    'text-red-400'
                                                }`}>
                                                    {attendanceRate}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-400 text-sm">
                                            {coach.name} attended {coach.attendance.present} days this month
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

export default CoachManagement;