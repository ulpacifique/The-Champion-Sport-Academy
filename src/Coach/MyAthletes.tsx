import { useState } from 'react';
import { IconSearch, IconFilter, IconChartBar } from '@tabler/icons-react';
import ChildProgressModal from '../Admin/ChildProgressModal';

const MyAthletes = () => {
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [selectedAthlete, setSelectedAthlete] = useState<any>(null);

    // Mock Data
    const athletes = [
        { id: 1, name: 'Alice Smith', age: 8, program: 'Beginner Swimming', parent: 'John Smith', status: 'Active' },
        { id: 2, name: 'Bob Jones', age: 10, program: 'Intermediate Karate', parent: 'Sarah Jones', status: 'Active' },
        { id: 3, name: 'Charlie Brown', age: 7, program: 'Beginner Swimming', parent: 'Mike Brown', status: 'Inactive' },
        { id: 4, name: 'Daisy Miller', age: 9, program: 'Advanced Karate', parent: 'Emma Miller', status: 'Active' },
    ];

    const handleOpenProgress = (athlete: any) => {
        // Adapt athlete to Child type expected by Modal if needed
        setSelectedAthlete({
            ...athlete,
            firstName: athlete.name.split(' ')[0],
            lastName: athlete.name.split(' ')[1]
        });
        setIsProgressModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">My Athletes</h2>
                    <p className="text-gray-400">Manage your students and track their progress</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <IconSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search athletes..."
                            className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-bright-sun-500 w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                        <IconFilter size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-700/50 text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Program</th>
                                <th className="px-6 py-4">Age</th>
                                <th className="px-6 py-4">Parent</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {athletes.map((athlete) => (
                                <tr key={athlete.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{athlete.name}</div>
                                    </td>
                                    <td className="px-6 py-4">{athlete.program}</td>
                                    <td className="px-6 py-4">{athlete.age}</td>
                                    <td className="px-6 py-4">{athlete.parent}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${athlete.status === 'Active'
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            {athlete.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleOpenProgress(athlete)}
                                            className="text-bright-sun-400 hover:text-bright-sun-300 flex items-center gap-1 justify-end ml-auto"
                                        >
                                            <IconChartBar size={18} />
                                            <span>Progress</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ChildProgressModal
                isOpen={isProgressModalOpen}
                onClose={() => setIsProgressModalOpen(false)}
                childId={selectedAthlete?.id}
                childName={selectedAthlete?.name}
            />
        </div>
    );
};

export default MyAthletes;
