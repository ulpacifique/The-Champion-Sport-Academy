import React, { useState, useEffect } from 'react';
import { childAPI } from '../Services/Api';
import ChildProgressModal from './ChildProgressModal';

interface Child {
    id: number;
    childName: string;
    childId: string;
    age: number;
    gender: string;
    registrationStatus: string;
    parentName: string;
}

const Athletes = () => {
    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const response = await childAPI.getAllChildren();
            setChildren(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch children", error);
            setLoading(false);
        }
    };

    const handleOpenProgress = (child: Child) => {
        setSelectedChild(child);
        setIsProgressModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Student Management</h2>
                {/* <button className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                    Register New Student
                </button> */}
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/70">
                            <tr>
                                <th className="text-left p-4 text-gray-300 font-semibold">ID</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Name</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Age/Gender</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Parent</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-gray-400">Loading students...</td>
                                </tr>
                            ) : children.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-gray-400">No students found</td>
                                </tr>
                            ) : (
                                children.map((child) => (
                                    <tr key={child.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                                        <td className="p-4 text-gray-400">{child.childId}</td>
                                        <td className="p-4 text-white font-medium">{child.childName}</td>
                                        <td className="p-4 text-gray-300">{child.age} / {child.gender}</td>
                                        <td className="p-4 text-gray-300">{child.parentName}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${child.registrationStatus === "ACTIVE"
                                                    ? "bg-green-500/20 text-green-300"
                                                    : child.registrationStatus === "PENDING"
                                                        ? "bg-yellow-500/20 text-yellow-300"
                                                        : "bg-red-500/20 text-red-300"
                                                }`}>
                                                {child.registrationStatus}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleOpenProgress(child)}
                                                className="bg-cerulean-blue-600 hover:bg-cerulean-blue-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors mr-2"
                                            >
                                                Progress
                                            </button>
                                            {/* <button className="text-blue-400 hover:text-blue-300 text-sm mr-2">Edit</button> */}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedChild && (
                <ChildProgressModal
                    childId={selectedChild.id}
                    childName={selectedChild.childName}
                    isOpen={isProgressModalOpen}
                    onClose={() => setIsProgressModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Athletes;