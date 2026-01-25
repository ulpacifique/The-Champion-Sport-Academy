import React, { useState } from 'react';
import { IconX, IconUser, IconTrophy, IconCalendar, IconClock, IconCurrencyDollar } from '@tabler/icons-react';

interface AddProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}

const AddProgramModal: React.FC<AddProgramModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sportName: '', // For now, we use input or dropdown if sports API is available
        coachId: '',
        ageGroup: '', // e.g., "8-16 years"
        skillLevel: 'Beginner',
        maxParticipants: 40,
        monthlyFee: '',
        startDate: '',
        days: [], // multiselect
        startTime: '',
        endTime: ''
    });

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                monthlyFee: parseFloat(formData.monthlyFee) || 0,
                maxParticipants: parseInt(formData.maxParticipants as any) || 40,
                scheduleDays: "Mon,Wed,Fri" // simplified for MVP
            });
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Create New Program</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <IconX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">Program Name</label>
                            <div className="relative">
                                <IconTrophy className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    placeholder="e.g. Elite Soccer Academy"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Sport</label>
                            <input
                                type="text"
                                name="sportName"
                                value={formData.sportName}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                placeholder="Soccer"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Age Group</label>
                            <input
                                type="text"
                                name="ageGroup"
                                value={formData.ageGroup}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                placeholder="8-16 years"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Start Date</label>
                            <div className="relative">
                                <IconCalendar className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Monthly Fee</label>
                            <div className="relative">
                                <IconCurrencyDollar className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="number"
                                    name="monthlyFee"
                                    value={formData.monthlyFee}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none h-24 resize-none"
                                placeholder="Program details..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-600 text-gray-900 font-bold px-8 py-2.5 rounded-xl hover:shadow-lg hover:shadow-bright-sun-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Program'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProgramModal;
