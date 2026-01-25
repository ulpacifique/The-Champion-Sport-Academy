import { useState } from "react";
import { 
    IconCash,
    IconCheck,
    IconX,
    IconEdit,
    IconDownload,
    IconFilter,
    IconCalendarEvent,
    IconTrendingUp,
    IconTrendingDown
} from "@tabler/icons-react";

interface SalaryManagementProps {
    coaches: any[];
    setCoaches: (coaches: any[]) => void;
}

const SalaryManagement = ({ coaches, setCoaches }: SalaryManagementProps) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [editingSalary, setEditingSalary] = useState<number | null>(null);
    const [salaryAmount, setSalaryAmount] = useState("");
    const [bonusAmount, setBonusAmount] = useState("");
    const [deductionAmount, setDeductionAmount] = useState("");

    // Calculate salary data
    const calculateSalaryData = (coach: any) => {
        const baseSalary = coach.salary;
        const attendanceRate = coach.attendance.total > 0 
            ? coach.attendance.present / coach.attendance.total 
            : 0;
        
        let bonus = 0;
        let deductions = 0;
        let netSalary = baseSalary;

        // Bonus for good attendance (90%+)
        if (attendanceRate >= 0.9) {
            bonus = baseSalary * 0.1; // 10% bonus
            netSalary += bonus;
        }

        // Deduction for poor attendance (< 80%)
        if (attendanceRate < 0.8) {
            deductions = baseSalary * 0.05; // 5% deduction
            netSalary -= deductions;
        }

        // Deduction for very poor attendance (< 70%)
        if (attendanceRate < 0.7) {
            deductions += baseSalary * 0.05; // Additional 5% deduction
            netSalary -= baseSalary * 0.05;
        }

        return {
            baseSalary,
            bonus,
            deductions,
            netSalary,
            attendanceRate: Math.round(attendanceRate * 100)
        };
    };

    const handleUpdateSalary = (coachId: number) => {
        if (!salaryAmount || isNaN(parseInt(salaryAmount))) {
            alert("Please enter a valid salary amount");
            return;
        }

        const updatedCoaches = coaches.map(coach => 
            coach.id === coachId 
                ? { ...coach, salary: parseInt(salaryAmount) }
                : coach
        );

        setCoaches(updatedCoaches);
        setEditingSalary(null);
        setSalaryAmount("");
    };

    const handleProcessPayment = (coachId: number) => {
        const coach = coaches.find(c => c.id === coachId);
        if (coach) {
            const salaryData = calculateSalaryData(coach);
            
            if (window.confirm(`Process payment of RWF ${salaryData.netSalary.toLocaleString()} to ${coach.name}?`)) {
                // In real app, this would call an API
                console.log(`Payment processed for ${coach.name}: RWF ${salaryData.netSalary}`);
                alert(`Payment of RWF ${salaryData.netSalary.toLocaleString()} processed for ${coach.name}`);
            }
        }
    };

    const handleAddBonus = (coachId: number) => {
        if (!bonusAmount || isNaN(parseInt(bonusAmount))) {
            alert("Please enter a valid bonus amount");
            return;
        }

        const bonus = parseInt(bonusAmount);
        // In real app, this would update the coach's record
        console.log(`Added bonus of RWF ${bonus} to coach ${coachId}`);
        alert(`Bonus of RWF ${bonus} added`);
        setBonusAmount("");
    };

    const handleAddDeduction = (coachId: number) => {
        if (!deductionAmount || isNaN(parseInt(deductionAmount))) {
            alert("Please enter a valid deduction amount");
            return;
        }

        const deduction = parseInt(deductionAmount);
        // In real app, this would update the coach's record
        console.log(`Added deduction of RWF ${deduction} to coach ${coachId}`);
        alert(`Deduction of RWF ${deduction} added`);
        setDeductionAmount("");
    };

    const handleExportPayroll = () => {
        // Implement export logic
        console.log("Exporting payroll data");
        alert("Payroll data exported successfully!");
    };

    const totalMonthlySalary = coaches.reduce((sum, coach) => {
        const salaryData = calculateSalaryData(coach);
        return sum + salaryData.netSalary;
    }, 0);

    const totalBonuses = coaches.reduce((sum, coach) => {
        const salaryData = calculateSalaryData(coach);
        return sum + salaryData.bonus;
    }, 0);

    const totalDeductions = coaches.reduce((sum, coach) => {
        const salaryData = calculateSalaryData(coach);
        return sum + salaryData.deductions;
    }, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Salary Management</h2>
                    <p className="text-gray-400">Manage coach salaries, bonuses, and deductions</p>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                    />
                    <button
                        onClick={handleExportPayroll}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                        <IconDownload size={20} />
                        <span>Export Payroll</span>
                    </button>
                </div>
            </div>

            {/* Salary Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <IconCash className="text-blue-400" size={24} />
                        <div>
                            <div className="text-white font-bold">Total Monthly Salary</div>
                            <div className="text-gray-300 text-sm">For {selectedMonth}</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">RWF {totalMonthlySalary.toLocaleString()}</div>
                    <div className="text-blue-400 text-sm mt-2">{coaches.length} coaches</div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <IconTrendingUp className="text-green-400" size={24} />
                        <div>
                            <div className="text-white font-bold">Total Bonuses</div>
                            <div className="text-gray-300 text-sm">Attendance & Performance</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">RWF {totalBonuses.toLocaleString()}</div>
                    <div className="text-green-400 text-sm mt-2">Based on attendance</div>
                </div>

                <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <IconTrendingDown className="text-red-400" size={24} />
                        <div>
                            <div className="text-white font-bold">Total Deductions</div>
                            <div className="text-gray-300 text-sm">Attendance penalties</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">RWF {totalDeductions.toLocaleString()}</div>
                    <div className="text-red-400 text-sm mt-2">For poor attendance</div>
                </div>
            </div>

            {/* Coach Salary Details */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Coach Salary Details</h3>
                    <div className="text-gray-400">Month: {selectedMonth}</div>
                </div>

                <div className="space-y-6">
                    {coaches.map((coach) => {
                        const salaryData = calculateSalaryData(coach);
                        
                        return (
                            <div key={coach.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{coach.name}</h4>
                                        <div className="text-gray-400 text-sm">{coach.sport} Coach</div>
                                        <div className="text-gray-500 text-sm mt-1">
                                            Experience: {coach.experience} • Attendance: {coach.attendance.present}/{coach.attendance.total} days ({salaryData.attendanceRate}%)
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        {editingSalary === coach.id ? (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="number"
                                                    value={salaryAmount}
                                                    onChange={(e) => setSalaryAmount(e.target.value)}
                                                    className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white w-32"
                                                    placeholder="New salary"
                                                />
                                                <button
                                                    onClick={() => handleUpdateSalary(coach.id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                >
                                                    <IconCheck size={20} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingSalary(null);
                                                        setSalaryAmount("");
                                                    }}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                >
                                                    <IconX size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setEditingSalary(coach.id);
                                                        setSalaryAmount(coach.salary.toString());
                                                    }}
                                                    className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center space-x-2"
                                                >
                                                    <IconEdit size={18} />
                                                    <span>Edit Salary</span>
                                                </button>
                                                <button
                                                    onClick={() => handleProcessPayment(coach.id)}
                                                    className="px-6 py-2 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all"
                                                >
                                                    Process Payment
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Salary Breakdown */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-700/30 rounded-lg p-4">
                                        <div className="text-gray-400 text-sm">Base Salary</div>
                                        <div className="text-white font-bold text-xl">RWF {salaryData.baseSalary.toLocaleString()}</div>
                                    </div>
                                    
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                        <div className="text-green-400 text-sm">Bonus</div>
                                        <div className="text-green-400 font-bold text-xl">+ RWF {salaryData.bonus.toLocaleString()}</div>
                                        <div className="text-green-400/70 text-xs mt-1">
                                            {salaryData.attendanceRate >= 90 ? "For excellent attendance (90%+)" : "No bonus"}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                        <div className="text-red-400 text-sm">Deductions</div>
                                        <div className="text-red-400 font-bold text-xl">- RWF {salaryData.deductions.toLocaleString()}</div>
                                        <div className="text-red-400/70 text-xs mt-1">
                                            {salaryData.attendanceRate < 80 ? "For poor attendance (<80%)" : "No deductions"}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-bright-sun-400/20 to-bright-sun-500/20 border border-bright-sun-400/30 rounded-lg p-4">
                                        <div className="text-bright-sun-400 text-sm">Net Salary</div>
                                        <div className="text-bright-sun-400 font-bold text-xl">RWF {salaryData.netSalary.toLocaleString()}</div>
                                        <div className="text-bright-sun-400/70 text-xs mt-1">
                                            To be paid
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex space-x-2">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={bonusAmount}
                                                onChange={(e) => setBonusAmount(e.target.value)}
                                                placeholder="Bonus amount"
                                                className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 w-full md:w-48"
                                            />
                                            <span className="absolute left-3 top-2.5 text-gray-400">RWF</span>
                                        </div>
                                        <button
                                            onClick={() => handleAddBonus(coach.id)}
                                            className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                                        >
                                            Add Bonus
                                        </button>
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={deductionAmount}
                                                onChange={(e) => setDeductionAmount(e.target.value)}
                                                placeholder="Deduction amount"
                                                className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 w-full md:w-48"
                                            />
                                            <span className="absolute left-3 top-2.5 text-gray-400">RWF</span>
                                        </div>
                                        <button
                                            onClick={() => handleAddDeduction(coach.id)}
                                            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                                        >
                                            Add Deduction
                                        </button>
                                    </div>
                                </div>

                                {/* Attendance Impact */}
                                <div className="mt-6 pt-4 border-t border-gray-700/50">
                                    <div className="text-white font-medium mb-2">Attendance Impact on Salary</div>
                                    <div className="text-gray-400 text-sm">
                                        Example: {coach.name} attended {coach.attendance.present} out of {coach.attendance.total} days ({salaryData.attendanceRate}%)
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {salaryData.attendanceRate >= 90 ? (
                                            "Earned 10% bonus for excellent attendance"
                                        ) : salaryData.attendanceRate < 80 ? (
                                            salaryData.attendanceRate < 70 ? (
                                                "10% salary deduction for poor attendance (<70%)"
                                            ) : (
                                                "5% salary deduction for poor attendance (<80%)"
                                            )
                                        ) : (
                                            "No bonus or deduction applied"
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Salary Rules */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Salary Rules & Policies</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-green-400 font-bold mb-2">Bonus Policy</div>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li className="flex items-center">
                                <IconCheck className="text-green-400 mr-2" size={16} />
                                ≥90% attendance: 10% bonus
                            </li>
                            <li className="flex items-center">
                                <IconCheck className="text-green-400 mr-2" size={16} />
                                ≥95% attendance: 15% bonus
                            </li>
                            <li className="flex items-center">
                                <IconCheck className="text-green-400 mr-2" size={16} />
                                Performance bonus: Up to 5%
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-red-400 font-bold mb-2">Deduction Policy</div>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li className="flex items-center">
                                <IconX className="text-red-400 mr-2" size={16} />
                                &lt;80% attendance: 5% deduction
                            </li>
                            <li className="flex items-center">
                                <IconX className="text-red-400 mr-2" size={16} />
                                &lt;70% attendance: 10% deduction
                            </li>
                            <li className="flex items-center">
                                <IconX className="text-red-400 mr-2" size={16} />
                                &lt;60% attendance: 15% deduction
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                        <div className="text-blue-400 font-bold mb-2">Payment Schedule</div>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li className="flex items-center">
                                <IconCalendarEvent className="text-blue-400 mr-2" size={16} />
                                Monthly payment: 1st of each month
                            </li>
                            <li className="flex items-center">
                                <IconCalendarEvent className="text-blue-400 mr-2" size={16} />
                                Payment method: Bank transfer
                            </li>
                            <li className="flex items-center">
                                <IconCalendarEvent className="text-blue-400 mr-2" size={16} />
                                Processing: 2 business days
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Example Calculation */}
                <div className="mt-6 bg-gradient-to-r from-bright-sun-400/10 to-cerulean-blue-500/10 border border-bright-sun-400/20 rounded-xl p-4">
                    <div className="text-white font-bold mb-2">Example: Coach Attendance Impact</div>
                    <div className="text-gray-300 text-sm">
                        "Exam Dushime Sharif attended 4 weeks this month" - This means 20 working days attended out of 20 (100% attendance)
                    </div>
                    <div className="text-gray-300 text-sm mt-2">
                        <span className="font-medium">Calculation:</span> Base salary RWF 300,000 + 10% bonus (RWF 30,000) = <span className="text-green-400">RWF 330,000 net salary</span>
                    </div>
                    <div className="text-gray-300 text-sm mt-2">
                        <span className="font-medium">For comparison:</span> A coach with 75% attendance (15/20 days) would receive: Base salary RWF 300,000 - 5% deduction (RWF 15,000) = <span className="text-red-400">RWF 285,000 net salary</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryManagement;