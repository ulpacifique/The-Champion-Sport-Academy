import { useState, useEffect } from 'react';
import { IconSearch, IconFilter, IconChartBar, IconLoader2 } from '@tabler/icons-react';
import ChildProgressModal from '../Admin/ChildProgressModal';
import { coachAPI } from '../Services/Api';

const MyAthletes = () => {
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [selectedAthlete, setSelectedAthlete] = useState<any>(null);
    const [athletes, setAthletes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchAthletes();
    }, []);

    const fetchAthletes = async () => {
        try {
            setLoading(true);
            const response = await coachAPI.getMyAthletes();
            setAthletes(response.data);
        } catch (error) {
            console.error("Failed to fetch athletes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenProgress = (athlete: any) => {
        setSelectedAthlete(athlete);
        setIsProgressModalOpen(true);
    };

    const filteredAthletes = athletes.filter(athlete => {
        const fullName = `${athlete.firstName || ''} ${athlete.lastName || ''}`.toLowerCase();
        const childName = (athlete.childName || '').toLowerCase();
        const programName = (athlete.programName || '').toLowerCase();
        const search = searchQuery.toLowerCase();

        return fullName.includes(search) ||
            childName.includes(search) ||
            programName.includes(search);
    });

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-bright-sun-500 w-full sm:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                        <IconLoader2 className="animate-spin mb-2" size={32} />
                        <p>Loading athletes...</p>
                    </div>
                ) : (
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
                                {filteredAthletes.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No athletes found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAthletes.map((athlete) => (
                                        <tr key={athlete.id} className="hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white">{athlete.firstName} {athlete.lastName}</div>
                                            </td>
                                            <td className="px-6 py-4">{athlete.programName}</td>
                                            <td className="px-6 py-4">{athlete.age}</td>
                                            <td className="px-6 py-4">{athlete.parentName}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${athlete.active !== false
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    }`}>
                                                    {athlete.active !== false ? 'Active' : 'Inactive'}
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ChildProgressModal
                isOpen={isProgressModalOpen}
                onClose={() => setIsProgressModalOpen(false)}
                childId={selectedAthlete?.id}
                childName={`${selectedAthlete?.firstName} ${selectedAthlete?.lastName}`}
            />
        </div>
    );
};

export default MyAthletes;
