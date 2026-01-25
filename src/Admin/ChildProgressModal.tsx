import React, { useState, useEffect } from 'react';
import { progressAPI } from '../Services/Api';

interface ChildProgressModalProps {
    childId: number;
    childName: string;
    isOpen: boolean;
    onClose: () => void;
}

interface ProgressRecord {
    id?: number;
    childId: number;
    sportName: string;
    skillName: string;
    percentage: number;
    notes?: string;
    lastUpdated?: string;
}

const DEFAULT_GYMNASTICS_SKILLS = ['Cartwheel', 'Roundoff', 'Backhandspring', 'Handstand', 'Forward Roll'];
const DEFAULT_KARATE_SKILLS = ['White Belt', 'Yellow Belt', 'Orange Belt', 'Green Belt', 'Blue Belt'];

const ChildProgressModal: React.FC<ChildProgressModalProps> = ({ childId, childName, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<string>('Gymnastics');
    const [progressData, setProgressData] = useState<ProgressRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSportName, setNewSportName] = useState('');
    const [isAddingSport, setIsAddingSport] = useState(false);

    // Dynamic list of sports derived from defaults + data
    const [availableSports, setAvailableSports] = useState<string[]>(['Gymnastics', 'Karate']);

    useEffect(() => {
        if (isOpen && childId) {
            fetchProgress();
        }
    }, [isOpen, childId]);

    const fetchProgress = async () => {
        setLoading(true);
        try {
            const response = await progressAPI.getProgressByChild(childId);
            const data = response.data;
            setProgressData(data);

            // Extract unique sports from data and add to available sports if not already there
            const dataSports = Array.from(new Set(data.map((p: any) => p.sportName))) as string[];
            setAvailableSports(prev => {
                const combined = Array.from(new Set([...prev, ...dataSports]));
                return combined.length > 0 ? combined : prev;
            });
        } catch (error) {
            console.error("Failed to fetch progress", error);
        } finally {
            setLoading(false);
        }
    };

    const getSkillProgress = (skill: string) => {
        return progressData.find(p => p.sportName === activeTab && p.skillName === skill) || {
            childId,
            sportName: activeTab,
            skillName: skill,
            percentage: 0,
            notes: ''
        };
    };

    const handleUpdate = async (skill: string, percentage: number, notes?: string) => {
        const current = getSkillProgress(skill);
        const updated = { ...current, percentage, notes };

        // Optimistic update
        const otherRecords = progressData.filter(p => !(p.sportName === activeTab && p.skillName === skill));
        setProgressData([...otherRecords, updated]);

        try {
            await progressAPI.updateProgress(updated);
        } catch (error) {
            console.error("Failed to update progress", error);
            fetchProgress();
        }
    };

    const handleAddSkill = () => {
        if (!newSkillName.trim()) return;

        // Check if skill already exists in this sport
        const exists = progressData.some(p => p.sportName === activeTab && p.skillName.toLowerCase() === newSkillName.trim().toLowerCase());

        if (!exists) {
            const newRecord = {
                childId,
                sportName: activeTab,
                skillName: newSkillName.trim(),
                percentage: 0,
                notes: ''
            };
            handleUpdate(newRecord.skillName, 0, '');
        }

        setNewSkillName('');
    };

    const handleAddSport = () => {
        if (!newSportName.trim()) return;
        const name = newSportName.trim();
        if (!availableSports.includes(name)) {
            setAvailableSports(prev => [...prev, name]);
        }
        setActiveTab(name);
        setNewSportName('');
        setIsAddingSport(false);
    };

    if (!isOpen) return null;

    // Combine defaults with whatever is in the data for the current sport
    const getSkillsForActiveTab = () => {
        const defaults = activeTab === 'Gymnastics' ? DEFAULT_GYMNASTICS_SKILLS :
            activeTab === 'Karate' ? DEFAULT_KARATE_SKILLS : [];

        const inData = progressData
            .filter(p => p.sportName === activeTab)
            .map(p => p.skillName);

        return Array.from(new Set([...defaults, ...inData]));
    };

    const currentSkills = getSkillsForActiveTab();

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-cerulean-blue-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-cerulean-blue-800">

                {/* Header */}
                <div className="flex-shrink-0 p-6 bg-cerulean-blue-950 border-b border-cerulean-blue-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Progress Tracking</h2>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-cerulean-blue-300">Student:</span>
                            <span className="text-white font-semibold">{childName}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex-shrink-0 flex border-b border-cerulean-blue-800 bg-cerulean-blue-950/50 overflow-x-auto overflow-y-hidden">
                    {availableSports.map(sport => (
                        <button
                            key={sport}
                            onClick={() => setActiveTab(sport)}
                            className={`px-6 py-5 font-semibold text-sm uppercase tracking-wider transition-all whitespace-nowrap min-w-[120px] ${activeTab === sport
                                ? 'bg-cerulean-blue-800 text-white border-b-2 border-bright-sun-400'
                                : 'text-cerulean-blue-300 hover:text-white hover:bg-cerulean-blue-800/50'
                                }`}
                        >
                            {sport}
                        </button>
                    ))}
                    <button
                        onClick={() => setIsAddingSport(true)}
                        className="px-6 py-5 text-bright-sun-400 font-bold hover:bg-cerulean-blue-800/50 transition-all border-l border-cerulean-blue-800 whitespace-nowrap"
                    >
                        + Add Sport
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {isAddingSport && (
                        <div className="bg-bright-sun-400/10 border border-bright-sun-400/20 rounded-xl p-5 mb-4 flex items-center space-x-3 shadow-inner">
                            <input
                                type="text"
                                placeholder="Enter Sport Name (e.g., Football)"
                                value={newSportName}
                                onChange={(e) => setNewSportName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddSport()}
                                autoFocus
                                className="flex-1 bg-cerulean-blue-950 border border-cerulean-blue-700/50 rounded-lg p-2.5 text-white focus:outline-none focus:border-bright-sun-400 placeholder:text-gray-500"
                            />
                            <button
                                onClick={handleAddSport}
                                className="bg-bright-sun-400 text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setIsAddingSport(false)}
                                className="text-gray-300 hover:text-white px-3 py-2 font-medium text-sm transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-bright-sun-400"></div>
                            <p className="text-cerulean-blue-300 text-sm">Loading skills assessment...</p>
                        </div>
                    ) : (
                        <>
                            {currentSkills.length === 0 && (
                                <div className="text-center py-8 text-gray-500 italic">
                                    No skills listed for this sport. Add one below!
                                </div>
                            )}

                            {currentSkills.map((skill) => {
                                const record = getSkillProgress(skill);
                                return (
                                    <div key={skill} className="bg-cerulean-blue-800/40 rounded-xl p-5 border border-cerulean-blue-700/30 group hover:border-bright-sun-400/30 transition-all">
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="font-bold text-lg text-white group-hover:text-bright-sun-400 transition-colors">{skill}</label>
                                            <div className="bg-cerulean-blue-950/50 px-3 py-1 rounded-full border border-cerulean-blue-700/50">
                                                <span className={`font-mono font-bold ${record.percentage === 100 ? 'text-green-400' :
                                                    record.percentage > 50 ? 'text-bright-sun-400' :
                                                        'text-gray-400'
                                                    }`}>{record.percentage}%</span>
                                            </div>
                                        </div>

                                        <div className="relative pt-1">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={record.percentage}
                                                onChange={(e) => handleUpdate(skill, parseInt(e.target.value), record.notes)}
                                                className="w-full h-2.5 bg-cerulean-blue-950 rounded-lg appearance-none cursor-pointer accent-bright-sun-500 hover:accent-bright-sun-400"
                                            />
                                            <div className="flex justify-between mt-2 text-[10px] uppercase tracking-tighter text-cerulean-blue-400 font-bold">
                                                <span>Beginner</span>
                                                <span className="opacity-50">Intermediate</span>
                                                <span>Mastered</span>
                                            </div>
                                        </div>

                                        <div className="mt-5 relative">
                                            <div className="absolute -top-3 left-3 bg-cerulean-blue-800 px-2 text-xs text-bright-sun-400 uppercase font-bold tracking-widest border border-cerulean-blue-700/50 rounded-sm">
                                                Coach Notes & Feedback
                                            </div>
                                            <textarea
                                                placeholder="Enter feedback or performance notes..."
                                                value={record.notes || ''}
                                                onChange={(e) => handleUpdate(skill, record.percentage, e.target.value)}
                                                className="w-full bg-cerulean-blue-950/50 border border-cerulean-blue-700/50 rounded-xl p-4 pt-5 text-sm text-white focus:outline-none focus:border-bright-sun-400 focus:bg-cerulean-blue-950 min-h-[80px] transition-all resize-none placeholder:text-gray-600"
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Add New Skill Input */}
                            <div className="mt-8 border-t border-cerulean-blue-800 pt-8">
                                <h4 className="text-white font-bold mb-4 flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-bright-sun-400 text-gray-900 flex items-center justify-center mr-3 text-lg">+</span>
                                    Add New Skill to {activeTab}
                                </h4>
                                <div className="flex space-x-3">
                                    <div className="flex-1 relative">
                                        <input
                                            list="skill-suggestions"
                                            type="text"
                                            placeholder="Type skill name (e.g., Backhandspring)"
                                            value={newSkillName}
                                            onChange={(e) => setNewSkillName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                                            className="w-full bg-cerulean-blue-950 border border-cerulean-blue-700/50 rounded-xl p-3 text-white focus:outline-none focus:border-bright-sun-400 transition-all placeholder:text-gray-600"
                                        />
                                        <datalist id="skill-suggestions">
                                            {activeTab === 'Gymnastics' && DEFAULT_GYMNASTICS_SKILLS.map(s => <option key={s} value={s} />)}
                                            {activeTab === 'Karate' && DEFAULT_KARATE_SKILLS.map(s => <option key={s} value={s} />)}
                                            <option value="Flexibility" />
                                            <option value="Balance" />
                                            <option value="Endurance" />
                                            <option value="Technique" />
                                        </datalist>
                                    </div>
                                    <button
                                        onClick={handleAddSkill}
                                        className="bg-cerulean-blue-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-cerulean-blue-700 active:scale-95 transition-all border border-cerulean-blue-600 shadow-lg"
                                    >
                                        Add Skill
                                    </button>
                                </div>
                                <p className="text-xs text-cerulean-blue-400 mt-2 ml-1">
                                    Adding a skill will immediately create a new 0% progress record.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 p-4 bg-cerulean-blue-950 border-t border-cerulean-blue-800 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center space-x-2 text-green-400 text-sm font-bold animate-pulse">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                        <span>AUTOSAVE ACTIVE</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 active:scale-95 transition-all shadow-md"
                    >
                        Finish & Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ChildProgressModal;
