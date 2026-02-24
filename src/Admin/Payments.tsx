import { useState, useEffect } from "react";
import { paymentAPI } from "../Services/Api";

const Payments = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        childId: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        status: 'PAID',
        paymentMethod: 'MOBILE_MONEY',
        notes: ''
    });

    // Helper for export
    const handleExport = async () => {
        try {
            const response = await paymentAPI.exportPayments();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'payments.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Export failed", error);
        }
    };

    // Helper for import
    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            try {
                await paymentAPI.importPayments(formData);
                fetchPayments(); // Refresh list
                alert("Import successful!");
            } catch (error) {
                console.error("Import failed", error);
                alert("Import failed. Check console.");
            }
        }
    };

    const handleRecordPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await paymentAPI.recordPayment({
                ...formData,
                childId: Number(formData.childId),
                amount: Number(formData.amount)
            });
            setShowModal(false);
            fetchPayments();
            // Reset form
            setFormData({
                childId: '',
                amount: '',
                paymentDate: new Date().toISOString().split('T')[0],
                status: 'PAID',
                paymentMethod: 'MOBILE_MONEY',
                notes: ''
            });
        } catch (error) {
            console.error("Failed to record payment", error);
            alert("Failed to record payment. Check console.");
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await paymentAPI.getAllPayments();
            setPayments(response.data);
        } catch (error) {
            console.error("Failed to fetch payments", error);
        } finally {
            setLoading(false);
        }
    };

    const paymentStats = [
        { title: "Total Revenue", value: "RWF " + payments.reduce((acc, curr) => acc + (curr.status === 'PAID' ? curr.amount : 0), 0).toLocaleString(), change: "+12%", trend: "up" },
        { title: "Pending Payments", value: "RWF " + payments.reduce((acc, curr) => acc + (curr.status === 'PENDING' ? curr.amount : 0), 0).toLocaleString(), change: "-5%", trend: "down" },
        // { title: "Avg. Payment", value: "₣122", change: "+8%", trend: "up" },
        { title: "Success Rate", value: payments.length > 0 ? Math.round((payments.filter((p: any) => p.status === 'PAID').length / payments.length) * 100) + "%" : "0%", change: "+3%", trend: "up" },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Payments Management</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-bright-sun-200 to-bright-sun-300 text-gray-900 font-bold px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                    >
                        Record Payment
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                    >
                        Export Excel
                    </button>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleImport}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button className="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-600 transition-all">
                            Import Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {paymentStats.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-white text-2xl font-bold">{stat.value}</p>
                            {/* <span className={`text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                                {stat.change}
                            </span> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Payments */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Recent Payments</h3>
                    {/* <button className="text-bright-sun-300 hover:text-bright-sun-200">
                        View All →
                    </button> */}
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Loading payments...</div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-800/70">
                                <tr>
                                    <th className="text-left p-4 text-gray-300 font-semibold">Athlete</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold">Program</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold">Amount</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold">Date</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold">Method</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-gray-500">No payments found</td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr key={payment.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                                            <td className="p-4 text-white">{payment.child?.childName || payment.childName || 'Unknown'}</td>
                                            <td className="p-4 text-gray-300">{payment.program?.name || payment.programName || '-'}</td>
                                            <td className="p-4 text-white font-bold">RWF {payment.amount?.toLocaleString()}</td>
                                            <td className="p-4 text-gray-300">{new Date(payment.paymentDate || payment.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs ${payment.status === "PAID"
                                                    ? "bg-green-500/20 text-green-300"
                                                    : payment.status === "PENDING"
                                                        ? "bg-yellow-500/20 text-yellow-300"
                                                        : "bg-red-500/20 text-red-300"
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-300">{payment.paymentMethod}</td>
                                            <td className="p-4">
                                                {/* <button className="text-blue-400 hover:text-blue-300 underline">
                                            Download
                                        </button> */}
                                            </td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Payment Methods Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Payment Methods</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Mobile Money</span>
                                <span className="text-white">45%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Bank Transfer</span>
                                <span className="text-white">30%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Cash</span>
                                <span className="text-white">15%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Card</span>
                                <span className="text-white">10%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                        <button className="w-full text-left p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl hover:border-bright-sun-300/30 transition-colors">
                            <div className="text-white font-medium">Send Payment Reminders</div>
                            <div className="text-gray-400 text-sm mt-1">Send reminders to parents with pending payments</div>
                        </button>
                        <button className="w-full text-left p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl hover:border-bright-sun-300/30 transition-colors">
                            <div className="text-white font-medium">Generate Monthly Report</div>
                            <div className="text-gray-400 text-sm mt-1">Create and download monthly financial report</div>
                        </button>
                        <button className="w-full text-left p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl hover:border-bright-sun-300/30 transition-colors">
                            <div className="text-white font-medium">View Outstanding Dues</div>
                            <div className="text-gray-400 text-sm mt-1">Check all pending payments and follow up</div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Record Payment Modal */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-6">Record New Payment</h3>
                            <form onSubmit={handleRecordPayment} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-1">Child ID</label>
                                    <input
                                        type="number"
                                        value={formData.childId}
                                        onChange={e => setFormData({ ...formData, childId: e.target.value })}
                                        className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-bright-sun-300 outline-none"
                                        required
                                        placeholder="Enter Child ID"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Amount (RWF)</label>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                        className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-bright-sun-300 outline-none"
                                        required
                                        placeholder="e.g. 50000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={formData.paymentDate}
                                        onChange={e => setFormData({ ...formData, paymentDate: e.target.value })}
                                        className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-bright-sun-300 outline-none"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 mb-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-bright-sun-300 outline-none"
                                        >
                                            <option value="PAID">Paid</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="OVERDUE">Overdue</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 mb-1">Method</label>
                                        <select
                                            value={formData.paymentMethod}
                                            onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                            className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-bright-sun-300 outline-none"
                                        >
                                            <option value="MOBILE_MONEY">Mobile Money</option>
                                            <option value="BANK_TRANSFER">Bank Transfer</option>
                                            <option value="CASH">Cash</option>
                                            <option value="CARD">Card</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Notes</label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                        className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-bright-sun-300 outline-none"
                                        rows={3}
                                        placeholder="Optional notes..."
                                    />
                                </div>

                                <div className="flex space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-bright-sun-300 text-gray-900 font-bold py-3 rounded-xl hover:bg-bright-sun-200 transition-colors"
                                    >
                                        Save Record
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Payments;