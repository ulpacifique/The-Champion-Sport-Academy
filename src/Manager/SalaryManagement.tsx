import { useState, useEffect, useCallback } from "react";
import {
    IconCash,
    IconX,
    IconDownload,
    IconCalendarEvent,
    IconCreditCard,
    IconPlus,
    IconHistory
} from "@tabler/icons-react";
import managerAPI from "../Services/ManagerApi";

interface SalaryManagementProps {
    coaches: any[];
}

const SalaryManagement = ({ coaches }: SalaryManagementProps) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [salaryHistory, setSalaryHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Record Salary state
    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
    const [salaryRecord, setSalaryRecord] = useState({
        coachId: "",
        month: new Date().toISOString().slice(0, 7),
        amount: "",
        method: "Bank Transfer",
        notes: ""
    });

    const fetchSalaryHistory = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await managerAPI.getSalaryData(selectedMonth);
            setSalaryHistory(res.data);
        } catch (error) {
            console.error("Error fetching salary history:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedMonth]);

    useEffect(() => {
        fetchSalaryHistory();
    }, [fetchSalaryHistory]);

    const handleRecordSalary = async () => {
        if (!salaryRecord.coachId || !salaryRecord.amount) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            await managerAPI.recordSalary({
                coachId: salaryRecord.coachId,
                amount: salaryRecord.amount,
                salaryMonth: salaryRecord.month,
                paymentMethod: salaryRecord.method,
                notes: salaryRecord.notes
            });

            alert("Salary recorded successfully!");
            setIsRecordModalOpen(false);
            setSalaryRecord({
                coachId: "",
                month: new Date().toISOString().slice(0, 7),
                amount: "",
                method: "Bank Transfer",
                notes: ""
            });
            fetchSalaryHistory();
        } catch (error) {
            console.error("Error recording salary:", error);
            alert("Failed to record salary");
        }
    };

    const handleExportExcel = async () => {
        try {
            const response = await managerAPI.exportSalaries(selectedMonth);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `salaries_${selectedMonth}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Export error:", error);
            alert("Failed to export excel");
        }
    };

    const totalPaid = salaryHistory.reduce((sum, s) => sum + Number(s.amount), 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Salary Management</h2>
                    <p className="text-gray-400">Record and track coach monthly salaries</p>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-300"
                    />
                    <button
                        onClick={() => setIsRecordModalOpen(true)}
                        className="px-4 py-2 bg-bright-sun-300 text-gray-900 rounded-lg hover:bg-bright-sun-200 transition-colors flex items-center space-x-2 font-bold"
                    >
                        <IconPlus size={20} />
                        <span>Record Salary</span>
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                        <IconDownload size={20} />
                        <span>Export Excel</span>
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-bright-sun-300/20 to-bright-sun-300/20 border border-bright-sun-300/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <IconCash className="text-bright-sun-300" size={24} />
                        <div>
                            <div className="text-white font-bold">Total Paid This Month</div>
                            <div className="text-gray-300 text-sm">{selectedMonth}</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">RWF {totalPaid.toLocaleString()}</div>
                    <div className="text-bright-sun-300 text-sm mt-2">{salaryHistory.length} payments recorded</div>
                </div>

                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <IconCalendarEvent className="text-blue-400" size={24} />
                        <div>
                            <div className="text-white font-bold">Active Coaches</div>
                            <div className="text-gray-300 text-sm">Target for payroll</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{coaches.length}</div>
                    <div className="text-blue-400 text-sm mt-2">All registered coaches</div>
                </div>
            </div>

            {/* Salary History Table */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                        <IconHistory className="mr-2 text-gray-400" />
                        Salary Payment History
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700/30 text-gray-400 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">Coach</th>
                                <th className="px-6 py-4 font-medium">Month</th>
                                <th className="px-6 py-4 font-medium">Amount Paid</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Method</th>
                                <th className="px-6 py-4 font-medium">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Loading history...</td>
                                </tr>
                            ) : salaryHistory.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">No salary records found for this month.</td>
                                </tr>
                            ) : (
                                salaryHistory.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-700/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium">{s.coachName}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{s.salaryMonth}</td>
                                        <td className="px-6 py-4 text-green-400 font-bold">RWF {Number(s.amount).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(s.paymentDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs">
                                                {s.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">{s.notes || "-"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Record Salary Modal */}
            {isRecordModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <IconCreditCard className="mr-2 text-bright-sun-300" />
                                Record Coach Salary
                            </h3>
                            <button onClick={() => setIsRecordModalOpen(false)} className="text-gray-400 hover:text-white">
                                <IconX size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Select Coach</label>
                                <select
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-bright-sun-300"
                                    value={salaryRecord.coachId}
                                    onChange={(e) => {
                                        const coachId = e.target.value;
                                        const coach = coaches.find(c => c.id.toString() === coachId);
                                        const defaultAmount = coach ? coach.salary || "" : "";
                                        setSalaryRecord({ ...salaryRecord, coachId, amount: defaultAmount.toString() });
                                    }}
                                >
                                    <option value="">Select a coach</option>
                                    {coaches.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} ({c.sport})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Month</label>
                                    <input
                                        type="month"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-bright-sun-300"
                                        value={salaryRecord.month}
                                        onChange={(e) => setSalaryRecord({ ...salaryRecord, month: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Amount (RWF)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-bright-sun-300"
                                        value={salaryRecord.amount}
                                        onChange={(e) => setSalaryRecord({ ...salaryRecord, amount: e.target.value })}
                                        placeholder="Enter amount"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Payment Method</label>
                                <select
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-bright-sun-300"
                                    value={salaryRecord.method}
                                    onChange={(e) => setSalaryRecord({ ...salaryRecord, method: e.target.value })}
                                >
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Mobile Money">Mobile Money</option>
                                    <option value="Check">Check</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Notes (Optional)</label>
                                <textarea
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-bright-sun-300 h-20 resize-none"
                                    value={salaryRecord.notes}
                                    onChange={(e) => setSalaryRecord({ ...salaryRecord, notes: e.target.value })}
                                    placeholder="Add payment details, transaction ID, etc."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setIsRecordModalOpen(false)}
                                    className="flex-1 py-3 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRecordSalary}
                                    className="flex-1 py-3 bg-bright-sun-300 text-gray-900 font-bold rounded-xl hover:bg-bright-sun-200 transition-colors shadow-lg shadow-bright-sun-200/20"
                                >
                                    Confirm Salary
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalaryManagement;