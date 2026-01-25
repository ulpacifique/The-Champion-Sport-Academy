import React, { useState, useEffect } from 'react';
import { coachAPI } from '../Services/Api';
import AddCoachModal from './AddCoachModal';
import { notifications } from '@mantine/notifications';

interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    email: string; // Used as part of ID display
    sports: string[];
    yearsOfExperience: number;
    athleteCount: number;
    active: boolean;
    specialization?: string;
}

const Coaches = () => {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchCoaches();
    }, []);

    const fetchCoaches = async () => {
        try {
            const response = await coachAPI.getAllCoaches();
            setCoaches(response.data);
        } catch (error) {
            console.error("Failed to fetch coaches", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCoach = async (coachData: any) => {
        try {
            await coachAPI.createCoach(coachData);
            notifications.show({
                title: 'Success',
                message: 'Coach added successfully',
                color: 'green',
            });
            setIsAddModalOpen(false);
            fetchCoaches(); // Refresh list
        } catch (error: any) {
            console.error("Failed to create coach", error);
            const errorMessage = error.response?.data?.message || error.response?.data || "Failed to create coach";
            notifications.show({
                title: 'Error',
                message: typeof errorMessage === 'string' ? errorMessage : 'Check your inputs and try again',
                color: 'red',
            });
        }
    };

    // Calculate stats
    const totalCoaches = coaches.length;
    const activeCoaches = coaches.filter(c => c.active).length;
    const avgExperience = totalCoaches > 0
        ? (coaches.reduce((sum, c) => sum + (c.yearsOfExperience || 0), 0) / totalCoaches).toFixed(1)
        : "0";
    // Placeholder total athletes count if not available from backend yet
    const totalAthletes = coaches.reduce((sum, c) => sum + (c.athleteCount || 0), 0);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Coaches Management</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                    Add New Coach
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm">Total Coaches</p>
                    <p className="text-white text-2xl font-bold mt-2">{totalCoaches}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm">Active Coaches</p>
                    <p className="text-white text-2xl font-bold mt-2">{activeCoaches}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm">Avg Experience</p>
                    <p className="text-white text-2xl font-bold mt-2">{avgExperience} years</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm">Total Athletes</p>
                    <p className="text-white text-2xl font-bold mt-2">{totalAthletes}</p>
                </div>
            </div>

            {/* Coaches Table */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/70">
                            <tr>
                                <th className="text-left p-4 text-gray-300 font-semibold">Coach Name</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Sport</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Experience</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Athletes</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-gray-400">Loading coaches...</td>
                                </tr>
                            ) : coaches.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-gray-400">No coaches found</td>
                                </tr>
                            ) : (
                                coaches.map((coach) => (
                                    <tr key={coach.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-300 font-bold">
                                                        {coach.firstName ? coach.firstName[0] : 'C'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{coach.firstName} {coach.lastName}</div>
                                                    <div className="text-gray-400 text-sm">ID: {coach.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {coach.sports && coach.sports.length > 0 ? (
                                                    coach.sports.map((sport, idx) => (
                                                        <span key={idx} className="text-white text-xs bg-gray-700 px-2 py-0.5 rounded">
                                                            {sport}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 italic">None</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-300">{coach.yearsOfExperience} years</td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <span className="text-white font-medium">{coach.athleteCount}</span>
                                                <span className="text-gray-400 text-sm ml-1">athletes</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${coach.active
                                                ? "bg-green-500/20 text-green-300"
                                                : "bg-red-500/20 text-red-300"
                                                }`}>
                                                {coach.active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-400 hover:text-blue-300 px-3 py-1 bg-blue-500/10 rounded">View</button>
                                                <button className="text-bright-sun-400 hover:text-bright-sun-300 px-3 py-1 bg-bright-sun-400/10 rounded">Edit</button>
                                                <button className="text-red-400 hover:text-red-300 px-3 py-1 bg-red-500/10 rounded">Remove</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddCoachModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddCoach}
            />
        </div>
    );
};

export default Coaches;