// src/Parent/ProgressTracking.tsx
import { useState, useEffect } from "react";
import {
    IconChartLine,
    IconCalendarStats,
    IconTarget,
    IconTrendingUp,
    IconDownload,
    IconFilter
} from "@tabler/icons-react";
import parentAPI from "../Services/ParentApi";

interface ProgressTrackingProps {
    selectedChild: any;
    children: any[];
    setSelectedChild: (child: any) => void;
}

const ProgressTracking = ({ selectedChild, children, setSelectedChild }: ProgressTrackingProps) => {
    const [timeRange, setTimeRange] = useState("month");
    const [activeSport, setActiveSport] = useState<string>("");
    const [skills, setSkills] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedChild?.id) {
            fetchProgress();
        }
    }, [selectedChild]);

    const fetchProgress = async () => {
        setIsLoading(true);
        try {
            const response = await parentAPI.getChildProgress(selectedChild.id);
            const data = response.data;

            // Map the backend structure
            const mappedSkills = data.map((item: any) => ({
                name: item.skillName,
                sport: item.sportName,
                progress: item.percentage,
                notes: item.notes,
                lastUpdated: item.lastUpdated,
                updatedBy: item.updatedBy,
            }));

            setSkills(mappedSkills);

            // Set initial active sport if not set
            if (mappedSkills.length > 0 && !activeSport) {
                setActiveSport(mappedSkills[0].sport);
            } else if (!activeSport && selectedChild?.sport) {
                setActiveSport(selectedChild.sport);
            }
        } catch (error) {
            console.error("Failed to fetch progress", error);
        } finally {
            setIsLoading(false);
        }
    };

    const sports = Array.from(new Set(skills.map(s => s.sport)));
    const filteredSkills = skills.filter(s => s.sport === activeSport || !activeSport);

    const calculateOverallProgress = () => {
        const skillsToAverage = activeSport ? filteredSkills : skills;
        if (skillsToAverage.length === 0) return selectedChild?.progress || 0;
        const total = skillsToAverage.reduce((acc, skill) => acc + skill.progress, 0);
        return Math.round(total / skillsToAverage.length);
    };

    const overallProgress = calculateOverallProgress();

    // Placeholder for history
    const progressHistory = [
        { month: "Jan", progress: 40 },
        { month: "Feb", progress: 50 },
        { month: "Mar", progress: 55 },
        { month: "Apr", progress: 60 },
        { month: "May", progress: 65 },
        { month: "Jun", progress: 70 },
    ];

    const milestones = [
        { title: "First Class", date: "Jan 15, 2024", description: "Started training" },
        { title: "Registration Active", date: selectedChild?.createdAt ? new Date(selectedChild.createdAt).toLocaleDateString() : "Feb 1, 2024", description: "Child registration was approved" },
    ];

    const handleExportReport = () => {
        window.print();
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Progress Tracking</h2>
                    <p className="text-gray-400">
                        {selectedChild
                            ? `Tracking ${selectedChild.childName || selectedChild.name}'s journey`
                            : "Select a child to view progress"
                        }
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Sport Filter */}
                    {sports.length > 1 && (
                        <div className="flex bg-gray-700/30 p-1 rounded-lg border border-gray-600/50">
                            {sports.map(sport => (
                                <button
                                    key={sport}
                                    onClick={() => setActiveSport(sport)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${activeSport === sport
                                        ? 'bg-bright-sun-400 text-gray-900'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {sport}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Child Selector */}
                    {children.length > 1 && (
                        <select
                            value={selectedChild?.id || ""}
                            onChange={(e) => {
                                const child = children.find(c => c.id === parseInt(e.target.value));
                                setSelectedChild(child);
                            }}
                            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400 text-sm"
                        >
                            {children.map(child => (
                                <option key={child.id} value={child.id}>
                                    {child.childName || child.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Export Button */}
                    <button
                        onClick={handleExportReport}
                        className="px-4 py-2 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2 text-sm"
                    >
                        <IconDownload size={18} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {selectedChild ? (
                <>
                    {/* Overall Progress Card */}
                    <div className="bg-gradient-to-r from-bright-sun-400/10 to-cerulean-blue-500/10 border border-bright-sun-400/20 rounded-2xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    Overall {activeSport || selectedChild.sport} Progress
                                </h3>
                                <p className="text-gray-300 mt-2">
                                    {selectedChild.childName || selectedChild.name} is making steady progress in our programs.
                                </p>
                                <div className="flex items-center space-x-4 mt-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">{overallProgress}%</div>
                                        <div className="text-gray-400 text-sm">Competency</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-400">
                                            {overallProgress > 75 ? "Excellent" : overallProgress > 40 ? "Good" : "Developing"}
                                        </div>
                                        <div className="text-gray-400 text-sm">Standing</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-xl border border-white/10">
                                <IconTrendingUp className="text-green-400" size={40} />
                                <div>
                                    <div className="text-white font-bold">Growing Strong</div>
                                    <div className="text-gray-300 text-xs">Based on {activeSport} assessments</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Skills Progress */}
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-white">Skills Breakdown</h3>
                                <IconTarget className="text-bright-sun-400" size={24} />
                            </div>

                            <div className="space-y-6">
                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bright-sun-400"></div>
                                    </div>
                                ) : filteredSkills.length > 0 ? (
                                    filteredSkills.map((skill, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white font-medium">{skill.name}</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-white font-bold">{skill.progress}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-bright-sun-400 to-bright-sun-500"
                                                    style={{ width: `${skill.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-center py-4 italic">No specific skill records found for {activeSport || "this program"}.</p>
                                )}
                            </div>
                        </div>

                        {/* Growth trends */}
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-white">Growth Trends</h3>
                                <IconChartLine className="text-bright-sun-400" size={24} />
                            </div>

                            <div className="h-64 flex items-end justify-between space-x-2 px-2">
                                {progressHistory.map((item, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full bg-gradient-to-t from-bright-sun-400/40 to-bright-sun-500 rounded-t-lg transition-all hover:brightness-125 group relative"
                                            style={{ height: `${item.progress * 0.6}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold border border-gray-700 shadow-xl">
                                                {item.progress}%
                                            </div>
                                        </div>
                                        <div className="text-gray-400 text-[10px] mt-2 font-medium">{item.month}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Coach's Notes */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-white">Coach's Feedback</h3>
                            <IconTarget className="text-cerulean-blue-400" size={24} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredSkills.filter(s => s.notes).length > 0 ? (
                                filteredSkills.filter(s => s.notes).map((skill, idx) => (
                                    <div key={idx} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-bright-sun-400/30 transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="text-bright-sun-400 font-bold text-sm uppercase tracking-wider">{skill.name}</div>
                                            <div className="text-gray-500 text-[10px] font-mono">
                                                {skill.lastUpdated ? new Date(skill.lastUpdated).toLocaleDateString() : 'Recent'}
                                            </div>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            "{skill.notes}"
                                        </p>
                                        <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between">
                                            <div className="flex items-center space-x-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-bright-sun-400"></div>
                                                <span className="text-gray-400 text-xs italic">Evaluated by {skill.updatedBy || 'Head Coach'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center bg-gray-800/20 border border-dashed border-gray-700 rounded-2xl">
                                    <p className="text-gray-500 italic">No feedback entries recorded for {activeSport || "this sport"} yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Milestones */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-white">Academy Milestones</h3>
                            <IconCalendarStats className="text-bright-sun-400" size={24} />
                        </div>

                        <div className="relative">
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-bright-sun-400/20 border-l border-dashed border-gray-700"></div>

                            <div className="space-y-6">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="relative pl-16">
                                        <div className="absolute left-6 w-4 h-4 bg-bright-sun-400 rounded-full border-4 border-gray-800 z-10 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800/80 transition-all cursor-default">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-white font-bold">{milestone.title}</h4>
                                                    <p className="text-gray-400 text-sm mt-1">{milestone.description}</p>
                                                </div>
                                                <div className="bg-bright-sun-400/10 px-2 py-1 rounded text-bright-sun-400 text-[10px] font-bold border border-bright-sun-400/20 shadow-inner">
                                                    {milestone.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <IconChartLine className="mx-auto text-gray-500" size={64} />
                    <p className="text-gray-400 mt-4 text-lg">Select a child to view progress tracking</p>
                    <p className="text-gray-500 mt-2">Track their growth and achievements in real-time</p>
                </div>
            )}
        </div>
    );
};

export default ProgressTracking;