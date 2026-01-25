import React, { useState, useEffect } from 'react';
import { programAPI } from '../Services/Api';
import AddProgramModal from './AddProgramModal';

interface Program {
    id: number;
    name: string;
    sportName: string;
    ageGroup: string;
    coachName: string;
    currentParticipants: number;
    maxParticipants: number;
    status: string;
    monthlyFee: number;
}

const Programs = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await programAPI.getAllPrograms();
            setPrograms(response.data);
        } catch (error) {
            console.error("Failed to fetch programs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProgram = async (data: any) => {
        try {
            await programAPI.createProgram(data);
            fetchPrograms();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Failed to create program", error);
        }
    };

    // Quick Stats
    const activePrograms = programs.filter(p => p.status === 'ACTIVE').length;
    const totalParticipants = programs.reduce((sum, p) => sum + (p.currentParticipants || 0), 0);
    const maxCapacity = programs.reduce((sum, p) => sum + (p.maxParticipants || 0), 0);
    // Mock revenue calculation per month
    const monthlyRevenue = programs.reduce((sum, p) => sum + ((p.currentParticipants || 0) * (p.monthlyFee || 0)), 0);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Programs Management</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                    >
                        Create Program
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Program Status</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Active Programs</span>
                            <span className="text-white font-bold">{activePrograms}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Total Programs</span>
                            <span className="text-white font-bold">{programs.length}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Participants Overview</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Total Participants</span>
                            <span className="text-white font-bold">{totalParticipants}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Max Capacity</span>
                            <span className="text-white font-bold">{maxCapacity}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Est. Revenue</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Monthly Revenue</span>
                            <span className="text-white font-bold">${monthlyRevenue}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="text-gray-400">Loading specific programs...</div>
                ) : programs.length === 0 ? (
                    <div className="text-gray-400">No programs found. Create one to get started!</div>
                ) : (
                    programs.map((program) => (
                        <div key={program.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 hover:border-bright-sun-400/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{program.name}</h3>
                                    <p className="text-gray-400 text-sm mt-1">{program.sportName}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs ${program.status === "ACTIVE"
                                        ? "bg-green-500/20 text-green-300"
                                        : "bg-blue-500/20 text-blue-300"
                                    }`}>
                                    {program.status}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Age Group:</span>
                                    <span className="text-white">{program.ageGroup}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Coach:</span>
                                    <span className="text-white">{program.coachName || 'Unassigned'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Participants:</span>
                                    <span className="text-white font-bold">{program.currentParticipants}/{program.maxParticipants}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700/50">
                                <div className="flex justify-between">
                                    <button className="text-bright-sun-400 hover:text-bright-sun-300 px-4 py-2 border border-bright-sun-400/30 rounded-lg hover:border-bright-sun-400/50">
                                        Edit
                                    </button>
                                    <button className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <AddProgramModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleCreateProgram}
            />
        </div>
    );
};

export default Programs;