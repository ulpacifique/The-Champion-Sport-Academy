import React, { useState } from 'react';
import { IconX, IconUser, IconMail, IconPhone, IconAward, IconBallFootball } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface AddCoachModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}

const AddCoachModal: React.FC<AddCoachModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        qualifications: '',
        yearsOfExperience: '',
        specialization: '',
        sports: [] as string[]
    });

    const [sportInput, setSportInput] = useState('');

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSport = () => {
        if (sportInput && !formData.sports.includes(sportInput)) {
            setFormData(prev => ({
                ...prev,
                sports: [...prev.sports, sportInput]
            }));
            setSportInput('');
        }
    };

    const removeSport = (sport: string) => {
        setFormData(prev => ({
            ...prev,
            sports: prev.sports.filter(s => s !== sport)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalSports = [...formData.sports];
        if (sportInput.trim() && !finalSports.includes(sportInput.trim())) {
            finalSports.push(sportInput.trim());
        }

        if (finalSports.length === 0) {
            notifications.show({
                title: 'Validation Error',
                message: 'Please add at least one sport',
                color: 'red'
            });
            return;
        }

        try {
            await onSubmit({
                ...formData,
                sports: finalSports,
                yearsOfExperience: parseInt(formData.yearsOfExperience) || 0
            });
        } catch (err) {
            // Error handled by parent
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Add New Coach</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <IconX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">First Name</label>
                            <div className="relative">
                                <IconUser className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                            <div className="relative">
                                <IconUser className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Email</label>
                            <div className="relative">
                                <IconMail className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    placeholder="coach@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                            <div className="relative">
                                <IconPhone className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    placeholder="+250..."
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                placeholder="******"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Experience (Years)</label>
                            <input
                                type="number"
                                name="yearsOfExperience"
                                value={formData.yearsOfExperience}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">Sports</label>
                            <div className="flex gap-2 mb-2">
                                <div className="relative flex-1">
                                    <IconBallFootball className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        value={sportInput}
                                        onChange={(e) => setSportInput(e.target.value)}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                        placeholder="Add a sport (e.g. Soccer)"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddSport}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-xl transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.sports.map((sport, idx) => (
                                    <span key={idx} className="bg-bright-sun-500/20 text-bright-sun-300 px-3 py-1 rounded-full text-sm flex items-center">
                                        {sport}
                                        <button
                                            type="button"
                                            onClick={() => removeSport(sport)}
                                            className="ml-2 hover:text-white"
                                        >
                                            <IconX size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">Specialization</label>
                            <textarea
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none h-24 resize-none"
                                placeholder="Description of specialization..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">Qualifications</label>
                            <div className="relative">
                                <IconAward className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    name="qualifications"
                                    value={formData.qualifications}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-bright-sun-500/50 focus:border-bright-sun-500 outline-none"
                                    placeholder="Certifications, Degrees, etc."
                                />
                            </div>
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
                            className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-600 text-gray-900 font-bold px-8 py-2.5 rounded-xl hover:shadow-lg hover:shadow-bright-sun-500/20 transition-all transform hover:-translate-y-0.5"
                        >
                            Save Coach
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoachModal;
